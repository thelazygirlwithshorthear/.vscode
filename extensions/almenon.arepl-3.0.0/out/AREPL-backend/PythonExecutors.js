"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PythonExecutors = void 0;
const python_shell_1 = require("python-shell");
const PythonExecutor_1 = require("./PythonExecutor");
__exportStar(require("./PythonExecutor"), exports);
/**
 * Starts multiple python executors for running user code.
 * Will manage them for you, so you can treat this class
 * as a single executor.
 */
class PythonExecutors {
    constructor(options = {}) {
        this.options = options;
        this.currentExecutorIndex = 0;
        /**
         * delays execution of function by ms milliseconds, resetting clock every time it is called
         * Useful for real-time execution so execCode doesn't get called too often
         * thanks to https://stackoverflow.com/a/1909508/6629672
         */
        this.debounce = (function () {
            let timer = 0;
            return function (callback, ms, ...args) {
                clearTimeout(timer);
                timer = setTimeout(callback, ms, args);
            };
        })();
    }
    start(numExecutors = 3) {
        // we default to three executors, as it should be enough so that there is always
        // one available to accept incoming code
        if (this.executors.length != 0)
            throw Error('already started!');
        for (let i = 0; i++; i < numExecutors) {
            const pyExecutor = new PythonExecutor_1.PythonExecutor(this.options);
            pyExecutor.start(() => { });
            pyExecutor.evaluatorName = i.toString();
            pyExecutor.onResult = result => {
                // Other executor may send a result right before it dies
                // So we use this function to only capture result from active executor
                if (i == this.currentExecutorIndex)
                    this.onResult(result);
            };
            pyExecutor.onPrint = print => {
                if (i == this.currentExecutorIndex)
                    this.onPrint(print);
            };
            pyExecutor.onStderr = stderr => {
                if (i == this.currentExecutorIndex)
                    this.onStderr(stderr);
            };
            pyExecutor.pyshell.on('error', this.onError);
            pyExecutor.pyshell.childProcess.on('exit', exitCode => {
                if (exitCode != 0)
                    this.onAbnormalExit(exitCode);
            });
            this.executors.push(pyExecutor);
        }
    }
    /**
     * Sends code to the current executor.
     * If current executor is busy, nothing happens
     */
    execCodeCurrent(code) {
        this.executors[this.currentExecutorIndex].execCode(code);
    }
    /**
     * sends code to a free executor to be executed
     * Side-effect: restarts dirty executors
     */
    execCode(code) {
        let freeExecutor = this.executors.find(executor => executor.state == PythonExecutor_1.PythonState.FreshFree);
        // old code is now irrelevant, if we are still waiting to send old code
        // we should stop waiting
        clearInterval(this.waitForFreeExecutor);
        // executors running old code are now irrelevant, restart them
        this.executors.filter(executor => executor.state == PythonExecutor_1.PythonState.Executing || PythonExecutor_1.PythonState.DirtyFree)
            .forEach(executor => executor.restart());
        if (!freeExecutor) {
            this.waitForFreeExecutor = setInterval(() => {
                freeExecutor = this.executors.find(executor => executor.state == PythonExecutor_1.PythonState.FreshFree);
                if (freeExecutor) {
                    freeExecutor.execCode(code);
                    this.currentExecutorIndex = parseInt(freeExecutor.evaluatorName);
                    clearInterval(this.waitForFreeExecutor);
                }
            }, 60);
        }
        else {
            freeExecutor.execCode(code);
            this.currentExecutorIndex = parseInt(freeExecutor.evaluatorName);
        }
    }
    stop(kill_immediately = false) {
        this.executors.forEach(executor => executor.stop(kill_immediately));
        this.executors = [];
    }
    /**
     * checks syntax without executing code
     * @param {string} code
     * @returns {Promise} rejects w/ stderr if syntax failure
     */
    checkSyntax(code) {
        return __awaiter(this, void 0, void 0, function* () {
            return python_shell_1.PythonShell.checkSyntax(code);
        });
    }
    /**
     * Overwrite this with your own handler.
     * is called when active executor fails or completes
     */
    onResult(foo) { }
    /**
     * Overwrite this with your own handler.
     * Is called when active executor prints
     * @param {string} foo
     */
    onPrint(foo) { }
    /**
     * Overwrite this with your own handler.
     * Is called when active executor logs stderr
     * @param {string} foo
     */
    onStderr(foo) { }
    /**
     * Overwrite this with your own handler.
     * Is called when there is a Node.JS error event with the python process
     *  The 'error' event is emitted whenever:
            The process could not be spawned, or
            The process could not be killed, or
            Sending a message to the child process failed.
     */
    onError(err) { }
    onAbnormalExit(exitCode) { }
}
exports.PythonExecutors = PythonExecutors;
//# sourceMappingURL=PythonExecutors.js.map