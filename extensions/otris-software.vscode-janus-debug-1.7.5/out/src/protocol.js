"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = exports.parseResponse = exports.variableValueToString = exports.ErrorCode = void 0;
const assert = require("assert");
const node_file_log_1 = require("node-file-log");
const uuid = require("uuid");
const log = node_file_log_1.Logger.create('protocol.ts');
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["UNKNOWN_COMMAND"] = 1] = "UNKNOWN_COMMAND";
    ErrorCode[ErrorCode["NO_COMMAND_NAME"] = 2] = "NO_COMMAND_NAME";
    ErrorCode[ErrorCode["NOT_A_COMMAND_PACKAGE"] = 3] = "NOT_A_COMMAND_PACKAGE";
    ErrorCode[ErrorCode["NOT_PAUSED"] = 4] = "NOT_PAUSED";
    ErrorCode[ErrorCode["BAD_ARGS"] = 5] = "BAD_ARGS";
    ErrorCode[ErrorCode["SCRIPT_NOT_FOUND"] = 6] = "SCRIPT_NOT_FOUND";
    ErrorCode[ErrorCode["CANNOT_SET_BREAKPOINT"] = 8] = "CANNOT_SET_BREAKPOINT";
    ErrorCode[ErrorCode["IS_PAUSED"] = 9] = "IS_PAUSED";
    ErrorCode[ErrorCode["UNEXPECTED_EXC"] = 10] = "UNEXPECTED_EXC";
    ErrorCode[ErrorCode["EVALUATION_FAILED"] = 11] = "EVALUATION_FAILED";
    ErrorCode[ErrorCode["PC_NOT_AVAILABLE"] = 12] = "PC_NOT_AVAILABLE";
    ErrorCode[ErrorCode["NO_ACTIVE_FRAME"] = 13] = "NO_ACTIVE_FRAME";
})(ErrorCode = exports.ErrorCode || (exports.ErrorCode = {}));
function variableValueToString(value) {
    if (typeof value === 'string') {
        if (value === '___jsrdbg_undefined___') {
            return 'undefined';
        }
    }
    else {
        // Functions
        if (value.hasOwnProperty('___jsrdbg_function_desc___')) {
            assert.ok(value.___jsrdbg_function_desc___.hasOwnProperty('parameterNames'));
            const parameterNames = value.___jsrdbg_function_desc___.parameterNames;
            const parameters = parameterNames.join(', ');
            return `function (${parameters}) { … }`;
        }
        // Arrays
        if (value.hasOwnProperty('length')) {
            const length = value.length;
            return `Array[${length}] []`;
        }
    }
    return value.toString();
}
exports.variableValueToString = variableValueToString;
function parseResponse(responseString) {
    // log.debug(`parsing response string: "${responseString}"`);
    let contextId;
    let indexStart = 0;
    // Try parse the context ID off the response
    const match = responseString.match(/^([0-9]+)\/{/);
    if (match) {
        contextId = Number.parseInt(match[1]);
        assert.ok(!Number.isNaN(contextId), 'could not parse context id');
        indexStart = match[0].length - 1;
    }
    let obj;
    try {
        obj = JSON.parse(responseString.substring(indexStart));
    }
    catch (e) {
        log.error(e instanceof Error ? e.message : "unknown error type");
        throw e;
    }
    const response = {
        content: {},
        type: obj.type,
    };
    delete obj.type;
    if (contextId !== undefined) {
        response.contextId = contextId;
    }
    if (obj.subtype) {
        response.subtype = obj.subtype;
        delete obj.subtype;
    }
    response.content = obj;
    return response;
}
exports.parseResponse = parseResponse;
class Command {
    static setBreakpoint(url, lineNumber, pending, contextId) {
        const cmd = new Command('set_breakpoint', contextId);
        cmd.payload.breakpoint = {
            line: lineNumber,
            pending: pending === undefined ? true : pending,
            url,
        };
        return cmd;
    }
    static getSource(url, contextId) {
        let cmd;
        if (contextId !== undefined) {
            cmd = new Command('get_source', contextId);
        }
        else {
            cmd = new Command('get_source');
        }
        cmd.payload.url = url;
        return cmd;
    }
    static getVariables(contextId, query) {
        const cmd = new Command('get_variables', contextId);
        cmd.payload.query = query;
        return cmd;
    }
    static evaluate(contextId, evaluate) {
        const cmd = new Command('evaluate', contextId);
        cmd.payload.path = evaluate.path;
        cmd.payload.options = evaluate.options;
        return cmd;
    }
    get name() { return this.payload.name; }
    get type() { return this.payload.type; }
    get id() { return this.payload.id; }
    constructor(name, contextId) {
        this.payload = {
            name,
            type: 'command',
        };
        this.contextId = contextId;
        // Only commands that expect a response need an id. For example, 'exit' does not entail a
        // response from the server so we do not need to generate a UUID v4 for this command.
        let needsId = true;
        const exceptions = [
            () => name === 'exit',
            () => name === 'continue' && contextId === undefined,
            () => name === 'next',
            () => name === 'stop',
        ];
        for (const exception of exceptions) {
            if (exception()) {
                needsId = false;
                break;
            }
        }
        if (needsId) {
            this.payload.id = uuid.v4();
        }
    }
    toString() {
        if (this.name === 'get_available_contexts') {
            return `get_available_contexts/${this.payload.id}\n`;
        }
        else if (this.name === 'exit') {
            return 'exit\n';
        }
        else if (this.name === 'server_version') {
            return `server_version/${this.id}\n`;
        }
        else if ((this.name === 'continue') && !this.contextId) {
            return '{"type":"command","name":"continue"}\n';
        }
        else if (this.contextId) {
            return `${this.contextId}/${JSON.stringify(this.payload)}\n`;
        }
        else {
            return `${JSON.stringify(this.payload)}\n`;
        }
    }
}
exports.Command = Command;
//# sourceMappingURL=protocol.js.map