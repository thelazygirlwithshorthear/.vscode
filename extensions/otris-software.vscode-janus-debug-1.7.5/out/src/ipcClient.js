"use strict";
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
exports.DebugAdapterIPC = void 0;
const ipc = require("node-ipc");
const node_file_log_1 = require("node-file-log");
const vscode_debugadapter_1 = require("vscode-debugadapter");
ipc.config.appspace = 'vscode-janus-debug.';
ipc.config.id = 'debug_adapter';
ipc.config.retry = 1500;
const log = node_file_log_1.Logger.create('DebugAdapterIPC');
/**
 * Acts as the client in our communication.
 *
 * @export
 * @class DebugAdapter
 */
class DebugAdapterIPC {
    constructor() {
        this.serverSock = 'sock';
    }
    connect(processId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.serverSock = 'sock' + processId.toString();
            log.debug(`connect to VS Code extension (${this.serverSock})`);
            yield this.promiseTimeout(new Promise((resolve) => {
                ipc.connectTo(this.serverSock, () => {
                    ipc.of[this.serverSock].on('connect', () => {
                        log.debug(`connected to VS Code extension`);
                        resolve();
                    });
                    ipc.of[this.serverSock].on('disconnect', () => {
                        log.debug(`disconnected from VS Code extension`);
                    });
                    ipc.of[this.serverSock].on('contextChosen', this.contextChosenDefault);
                    ipc.of[this.serverSock].on('urisFound', this.urisFoundDefault);
                    ipc.of[this.serverSock].on('type = "information"', this.displayMessageDefault);
                    ipc.of[this.serverSock].on('correctSourceFileProvided', this.askForCorrectSourceFileDefault);
                    ipc.of[this.serverSock].on('answerLaunchContexts', this.launchContextsDefault);
                    ipc.of[this.serverSock].on('scriptFinished', this.debugScriptDefault);
                });
            }), 6000, new Error('Request timed out'));
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            ipc.disconnect(this.serverSock);
        });
    }
    showContextQuickPick(contextList) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.ipcRequest('showContextQuickPick', 'contextChosen', this.contextChosenDefault, (2 * 60 * 1000), contextList);
        });
    }
    launchContexts(fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.ipcRequest('launchContexts', 'answerLaunchContexts', this.launchContextsDefault, (2 * 60 * 1000), fileName);
        });
    }
    findURIsInWorkspace(sourcePattern) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.ipcRequest('findURIsInWorkspace', 'urisFound', this.urisFoundDefault, (5 * 60 * 1000), sourcePattern);
            const map = new Map(result);
            return map;
        });
    }
    askForCorrectSourceFile(fileName, filePaths, serverFileSourceCode) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.ipcRequest('askForCorrectSourceFile', 'correctSourceFileProvided', this.askForCorrectSourceFileDefault, (5 * 60 * 1000), fileName, filePaths, serverFileSourceCode);
        });
    }
    displayMessage(message, type = "information", source = "") {
        return __awaiter(this, void 0, void 0, function* () {
            ipc.of[this.serverSock].emit('displayMessage', { message, source, type });
        });
    }
    debugScript(scriptName, session) {
        return __awaiter(this, void 0, void 0, function* () {
            // do not await
            log.info(`debug script ${scriptName}`);
            this.ipcRequest('debugScript', 'scriptFinished', this.debugScriptDefault, (2 * 60 * 1000), scriptName).then((value) => {
                log.info(`script ${scriptName} finished`);
                session.sendEvent(new vscode_debugadapter_1.TerminatedEvent());
            });
        });
    }
    /**
     * You can provide an additional script "documents-to-json" as a portal script on the server
     * to convert documents specific objects to JSON so that the debugger can show more detailed information
     * about the properties and members of the variables in the variable panel.
     */
    checkForAdditionalDebugJSONHelpers() {
        return __awaiter(this, void 0, void 0, function* () {
            log.info(`checkForAdditionalDebugJSONHelpers`);
            yield this.ipcRequest('checkForAdditionalDebugJSONHelpers', 'checkForAdditionalDebugJSONHelpersResponse', this.checkForAdditionalDebugJSONHelpersDefault, (2 * 60 * 1000));
        });
    }
    ipcRequest(requestEvent, responseEvent, responseDefault, requestTimeout, ...requestParameter) {
        return __awaiter(this, void 0, void 0, function* () {
            log.debug(requestEvent);
            // replace default response handler temporarily
            let tmpHandler;
            ipc.of[this.serverSock].off(responseEvent, responseDefault);
            const reqWithTimeout = this.promiseTimeout(new Promise(resolve => {
                ipc.of[this.serverSock].on(responseEvent, tmpHandler = (result) => {
                    resolve(result);
                });
            }), requestTimeout, new Error('Request timed out'));
            // call the request and finally reset default response handler
            let returnValue;
            ipc.of[this.serverSock].emit(requestEvent, requestParameter);
            try {
                returnValue = yield reqWithTimeout;
            }
            finally {
                ipc.of[this.serverSock].off(responseEvent, tmpHandler);
                ipc.of[this.serverSock].on(responseEvent, responseDefault);
            }
            return returnValue;
        });
    }
    contextChosenDefault(data) {
        log.warn(`got 'contextChosen' message from VS Code extension but we haven't asked!`);
    }
    launchContextsDefault(data) {
        log.warn(`got 'answerLaunchContexts' message from VS Code extension but we haven't asked!`);
    }
    urisFoundDefault(data) {
        log.warn(`got 'urisFound' message from VS Code extension but we haven't asked!`);
    }
    askForCorrectSourceFileDefault(data) {
        log.warn(`got 'correctSourceFileProvided' message from VS Code extension but we haven't asked!`);
    }
    displayMessageDefault(data) {
        log.warn(`got 'displayMessage' message from VS Code extension but we haven't asked!`);
    }
    debugScriptDefault(data) {
        log.warn(`got 'debugScript' message from VS Code extension but we haven't asked!`);
    }
    checkForAdditionalDebugJSONHelpersDefault(data) {
        log.warn(`got 'checkForAdditionalDebugJSONHelpersResponse' message from VS Code extension but we haven't asked!`);
    }
    promiseTimeout(promise, milliseconds, error) {
        return new Promise((resolve, reject) => {
            let hasCompleted = false;
            if (milliseconds < 0) {
                throw new TypeError("Milliseconds should be positive: " + milliseconds);
            }
            const timer = setTimeout(() => {
                if (!hasCompleted) {
                    hasCompleted = true;
                    reject(error);
                }
            }, milliseconds);
            (() => __awaiter(this, void 0, void 0, function* () {
                try {
                    const result = yield promise;
                    if (!hasCompleted) {
                        hasCompleted = true;
                        resolve(result);
                    }
                }
                catch (error) {
                    if (!hasCompleted) {
                        hasCompleted = true;
                        reject(error);
                    }
                }
                finally {
                    clearTimeout(timer);
                }
            }))();
        });
    }
}
exports.DebugAdapterIPC = DebugAdapterIPC;
//# sourceMappingURL=ipcClient.js.map