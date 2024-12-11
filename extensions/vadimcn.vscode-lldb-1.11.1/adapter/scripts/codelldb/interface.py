import __main__
import sys
import os
import lldb
import logging
import traceback
import ctypes
import json
from ctypes import (CFUNCTYPE, POINTER, py_object, sizeof, byref, memmove, cast,
                    c_bool, c_char, c_char_p, c_int, c_int64, c_double, c_size_t, c_void_p)
from .value import Value
from .event import Event

log = logging.getLogger('codelldb')

try:
    from typing import Tuple
except Exception:
    pass

# ============================================================================================

# 8 bytes


class SBError(ctypes.Structure):
    _fields_ = [('_opaque', c_int64)]
    swig_type = lldb.SBError

# 16 bytes


class SBDebugger(ctypes.Structure):
    _fields_ = [('_opaque', c_int64 * 2)]
    swig_type = lldb.SBDebugger


class SBExecutionContext(ctypes.Structure):
    _fields_ = [('_opaque', c_int64 * 2)]
    swig_type = lldb.SBExecutionContext


class SBValue(ctypes.Structure):
    _fields_ = [('_opaque', c_int64 * 2)]
    swig_type = lldb.SBValue


class SBModule(ctypes.Structure):
    _fields_ = [('_opaque', c_int64 * 2)]
    swig_type = lldb.SBModule

# Convert one of the above raw SB objects (https://lldb.llvm.org/design/sbapi.html) into a SWIG wrapper.
# We rely on the fact that SB objects consist of a single shared_ptr, which can be moved around freely.
# There are 3 memory regions in play:
#  [1:SWIG wrapper PyObject] -> [2:Memory allocated for SB object (which is just a pointer)] -> [3:The actual LLDB-internal object]


def into_swig_wrapper(cobject, ty, owned=True):
    # Create an empty wrapper, which will be in an "invalid" state ([2] is null, [3] does not exist).
    swig_object = ty.swig_type()
    addr = int(swig_object.this)
    memmove(addr, byref(cobject), sizeof(ty))  # Replace [2] with a valid pointer.
    swig_object.this.own(owned)
    return swig_object

# The reverse of into_swig_wrapper.


def from_swig_wrapper(swig_object, ty):
    # We'll be moving this value out, make sure swig_object's destructor does not try to deallocate it.
    swig_object.this.disown()
    addr = int(swig_object.this)
    cobject = ty()
    memmove(byref(cobject), addr, sizeof(ty))
    return cobject

# Generates a FFI type compatible with Rust #[repr(C, i32)] enum


def RustEnum(enum_name, *variants):  # type: (str, Tuple[str,type]) -> type
    class V(ctypes.Union):
        _fields_ = variants

    class Enum(ctypes.Structure):
        _fields_ = [('discr', c_int),
                    ('var', V)]
        discr = 0

        def __str__(self):
            name = variants[self.discr][0]
            return '{0}({1})'.format(name, getattr(self.var, name))

    for discr, (name, ty) in enumerate(variants):
        def constructor(value, discr=discr, name=name):
            e = Enum(discr)
            e.discr = discr
            setattr(e.var, name, value)
            return e
        setattr(Enum, name, constructor)
    Enum.__name__ = enum_name
    return Enum


def PyResult(name, T):  # type: (str, type) -> type
    return RustEnum(name, ('Invalid', c_char), ('Ok', T), ('Err', SBError))


ValueResult = PyResult('ValueResult', SBValue)
BoolResult = PyResult('BoolResult', c_bool)
PyObjectResult = PyResult('PyObjectResult', py_object)

# ============================================================================================

# Incoming messages from the DAP client
on_did_receive_message = Event()


def send_message(debugger_id, message_body):
    '''Send '_pythonMessage' event to the DAP client'''
    fire_event(debugger_id, dict(type='SendDapEvent', event='_pythonMessage', body=message_body))


def fire_event(debugger_id, event_body: object):
    log.error('interface has not been initialized yet')


def initialize(init_callback_addr, callback_context, send_message_addr, log_level):
    '''One-time initialization of Rust-Python interface'''
    global fire_event
    logging.getLogger().setLevel(log_level)

    interrupt = ctypes.pythonapi.PyErr_SetInterrupt
    pointers = [
        session_init,
        session_deinit,
        interrupt,
        drop_pyobject,
        handle_message,
        compile_code,
        evaluate_as_sbvalue,
        evaluate_as_bool
    ]
    ptr_arr = (c_void_p * len(pointers))(*[cast(p, c_void_p) for p in pointers])
    init_callback = CFUNCTYPE(None, c_void_p, POINTER(c_void_p), c_size_t)(init_callback_addr)
    init_callback(callback_context, ptr_arr, len(pointers))

    fire_event_raw = CFUNCTYPE(None, c_void_p, c_int, c_char_p)(send_message_addr)

    def _fire_event(debugger_id, event_body):
        return fire_event_raw(callback_context, debugger_id, str_to_bytes(json.dumps(event_body)))
     # Override the global dummy function
    fire_event = _fire_event


session_stdouts = {}


@CFUNCTYPE(c_bool, c_int, c_size_t)
def session_init(session_id, console_fd):
    '''Called once to initialize a new debug session'''
    if sys.platform.startswith('win32'):
        import msvcrt
        console_fd = msvcrt.open_osfhandle(console_fd, 0)  # pyright: ignore
    session_stdouts[session_id] = os.fdopen(console_fd, 'w', 1, 'utf-8')  # line-buffered
    return True


@CFUNCTYPE(c_bool, c_int)
def session_deinit(session_id):
    '''Called once to deinitialize a debug session'''
    del session_stdouts[session_id]
    return True


@CFUNCTYPE(c_bool, POINTER(PyObjectResult), POINTER(c_char), c_size_t, POINTER(c_char), c_size_t)
def compile_code(result, expr_ptr, expr_len, filename_ptr, filename_len):
    try:
        expr = ctypes.string_at(expr_ptr, expr_len)
        filename = ctypes.string_at(filename_ptr, filename_len)
        try:
            pycode = compile(expr, filename, 'eval')
        except SyntaxError:
            pycode = compile(expr, filename, 'exec')
        incref(pycode)
        result[0] = PyObjectResult.Ok(pycode)
    except Exception as err:
        error = lldb.SBError()
        error.SetErrorString(traceback.format_exc())
        error = from_swig_wrapper(error, SBError)
        result[0] = PyObjectResult.Err(error)
    return True


@CFUNCTYPE(c_bool, POINTER(ValueResult), py_object, SBExecutionContext, c_int)
def evaluate_as_sbvalue(result, pycode, exec_context, eval_context):
    '''Evaluate code in the context specified by SBExecutionContext, and return a SBValue result'''
    try:
        exec_context = into_swig_wrapper(exec_context, SBExecutionContext)
        value = evaluate_in_context(pycode, exec_context, eval_context)
        value = to_sbvalue(value, exec_context.target)
        result[0] = ValueResult.Ok(from_swig_wrapper(value, SBValue))
    except Exception as err:
        error = lldb.SBError()
        error.SetErrorString(traceback.format_exc())
        error = from_swig_wrapper(error, SBError)
        result[0] = ValueResult.Err(error)
    return True


@CFUNCTYPE(c_bool, POINTER(BoolResult), py_object, SBExecutionContext, c_int)
def evaluate_as_bool(result, pycode, exec_context, eval_context):
    '''Evaluate code in the context specified by SBExecutionContext, and return a boolean result'''
    try:
        exec_context = into_swig_wrapper(exec_context, SBExecutionContext)
        value = bool(evaluate_in_context(pycode, exec_context, eval_context))
        result[0] = BoolResult.Ok(value)
    except Exception as err:
        error = lldb.SBError()
        error.SetErrorString(traceback.format_exc())
        error = from_swig_wrapper(error, SBError)
        result[0] = BoolResult.Err(error)
    return True


@CFUNCTYPE(c_bool, POINTER(c_char), c_size_t, SBExecutionContext)
def handle_message(body_ptr, body_len, context):
    '''Handle a message intended for Python code'''
    try:
        body_json = ctypes.string_at(body_ptr, body_len)
        context = into_swig_wrapper(context, SBExecutionContext)
        body = json.loads(body_json)
        on_did_receive_message.emit(body)
    except Exception as err:
        log.exception('handle_message failed')
    return True


@CFUNCTYPE(c_bool, py_object)
def drop_pyobject(obj):
    decref(obj)
    return True


incref = ctypes.pythonapi.Py_IncRef
incref.argtypes = [ctypes.py_object]

decref = ctypes.pythonapi.Py_DecRef
decref.argtypes = [ctypes.py_object]

dummy_sberror = lldb.SBError()


def update_adapter_settings(settings_json, internal_dict):
    settings = json.loads(settings_json)
    adapter_settings = internal_dict.setdefault('adapter_settings', {})
    for key, value in settings.items():
        if value is not None:
            adapter_settings[key] = value


def to_sbvalue(value, target):
    '''Convert a native Python object into a SBValue.'''
    value = Value.unwrap(value)

    if isinstance(value, lldb.SBValue):
        return value
    elif value is None:
        ty = target.GetBasicType(lldb.eBasicTypeVoid)
        return target.CreateValueFromData('result', lldb.SBData(), ty)
    elif isinstance(value, bool):
        value = c_int(value)
        asbytes = memoryview(value).tobytes()  # type: ignore
        data = lldb.SBData()
        data.SetData(dummy_sberror, asbytes, target.GetByteOrder(), target.GetAddressByteSize())  # borrows from asbytes
        ty = target.GetBasicType(lldb.eBasicTypeBool)
        return target.CreateValueFromData('result', data, ty)
    elif isinstance(value, int):
        value = c_int64(value)
        asbytes = memoryview(value).tobytes()  # type: ignore
        data = lldb.SBData()
        data.SetData(dummy_sberror, asbytes, target.GetByteOrder(), target.GetAddressByteSize())  # borrows from asbytes
        ty = target.GetBasicType(lldb.eBasicTypeLongLong)
        return target.CreateValueFromData('result', data, ty)
    elif isinstance(value, float):
        value = c_double(value)
        asbytes = memoryview(value).tobytes()  # type: ignore
        data = lldb.SBData()
        data.SetData(dummy_sberror, asbytes, target.GetByteOrder(), target.GetAddressByteSize())  # borrows from asbytes
        ty = target.GetBasicType(lldb.eBasicTypeDouble)
        return target.CreateValueFromData('result', data, ty)
    else:  # Fall back to string representation
        value = str(value)
        data = lldb.SBData.CreateDataFromCString(target.GetByteOrder(), target.GetAddressByteSize(), value)
        sbtype_arr = target.GetBasicType(lldb.eBasicTypeChar).GetArrayType(data.GetByteSize())
        return target.CreateValueFromData('result', data, sbtype_arr)


def str_to_bytes(s):
    return s.encode('utf8') if s != None else None


def bytes_to_str(b):
    return b.decode('utf8') if b != None else None


def evaluate_in_context(code, exec_context, eval_context):
    debugger = exec_context.GetTarget().GetDebugger()
    prev_stdout = sys.stdout
    sess_stdout = session_stdouts.get(debugger.GetID())
    if sess_stdout:
        sys.stdout = sess_stdout
    try:
        if eval_context == 2:  # EvalContext::SimpleExpression
            frame = exec_context.GetFrame()
            eval_globals = {}
            eval_globals['__eval'] = lambda expr: nat_eval(frame, expr)
            return eval(code, eval_globals, {})
        else:
            lldb.frame = exec_context.GetFrame()
            lldb.thread = exec_context.GetThread()
            lldb.process = exec_context.GetProcess()
            lldb.target = exec_context.GetTarget()
            lldb.debugger = debugger
            if eval_context == 1:  # EvalContext::PythonExpression
                frame = exec_context.GetFrame()
                eval_globals = get_instance_dict(lldb.debugger)
                eval_globals['__eval'] = lambda expr: nat_eval(frame, expr)
                return eval(code, eval_globals)
            else:  # EvalContext::Statement
                eval_globals = get_instance_dict(lldb.debugger)
                return eval(code, eval_globals)
    finally:
        sys.stdout = prev_stdout
        lldb.frame = None
        lldb.process = None
        lldb.thread = None
        lldb.target = None
        lldb.debugger = None


def nat_eval(sbframe, expr):
    val = sbframe.FindVariable(expr)
    if not val.IsValid():
        for val_type in [lldb.eValueTypeVariableGlobal,
                         lldb.eValueTypeVariableStatic,
                         lldb.eValueTypeRegister,
                         lldb.eValueTypeConstResult]:
            val = sbframe.FindValue(expr, val_type)
            if val.IsValid():
                break
    if not val.IsValid():
        val = sbframe.GetValueForVariablePath(expr)
    if not val.IsValid():
        val = sbframe.EvaluateExpression(expr)
        err = val.GetError()
        if err.Fail():
            raise Exception(err.GetCString())
    return Value(val)


def get_instance_dict(debugger):
    return getattr(__main__, debugger.GetInstanceName() + '_dict')