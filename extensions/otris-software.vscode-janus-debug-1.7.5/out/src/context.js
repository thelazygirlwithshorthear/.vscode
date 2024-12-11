'use strict';
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
exports.ContextCoordinator = exports.Context = void 0;
const assert = require("assert");
const node_file_log_1 = require("node-file-log");
const protocol_1 = require("./protocol");
const contextLog = node_file_log_1.Logger.create('Context');
class Context {
    constructor(connection, id, name, stopped) {
        this.connection = connection;
        this.id = id;
        this.name = name;
        this.stopped = stopped;
    }
    isStopped() {
        return this.stopped ? this.stopped : false;
    }
    pause() {
        contextLog.debug(`request 'pause' for context ${this.id}`);
        const req = new protocol_1.Command('pause', this.id);
        return this.connection.sendRequest(req, (res) => {
            return new Promise((resolve, reject) => {
                if (res.type === 'error') {
                    if (res.content.code === protocol_1.ErrorCode.IS_PAUSED) {
                        contextLog.warn(`context ${this.id} is already paused`);
                        resolve();
                        return;
                    }
                    reject(new Error(res.content.message));
                    return;
                }
                resolve();
            });
        });
    }
    continue() {
        // contextLog.debug(`request 'continue' for context ${this.id}`);
        const cmd = new protocol_1.Command('continue', this.id);
        return this.connection.sendRequest(cmd);
    }
    getStacktrace() {
        // contextLog.debug(`request 'get_stacktrace' for context ${this.id}`);
        const req = new protocol_1.Command('get_stacktrace', this.id);
        return this.connection.sendRequest(req, (res) => {
            return new Promise((resolve, reject) => {
                if (res.type === 'error') {
                    reject(new Error(res.content.message));
                }
                else {
                    const stacktrace = [];
                    assert.ok(res.content.stacktrace);
                    resolve(res.content.stacktrace);
                }
            });
        });
    }
    /**
     * Returns all variables in the top-most frame of this context.
     */
    getVariables() {
        // contextLog.debug(`request 'get_variables' for context ${this.id}`);
        const req = protocol_1.Command.getVariables(this.id, {
            depth: 0,
            options: {
                "evaluation-depth": 1,
                "show-hierarchy": true,
            },
        });
        return this.connection.sendRequest(req, (res) => {
            return new Promise((resolve, reject) => {
                if (res.type === 'error') {
                    reject(new Error(res.content.message));
                }
                else {
                    const variables = [];
                    // This should be named 'frames' because it really holds all frames and for each frame
                    // an array of variables
                    assert.equal(res.content.variables.length, 1);
                    res.content.variables.forEach((element) => {
                        // Each element got a stackElement which describes the frame and a list of
                        // variables.
                        element.variables.forEach((variable) => {
                            variables.push(variable);
                        });
                    });
                    resolve(variables);
                }
            });
        });
    }
    next() {
        // contextLog.debug(`request 'next' for context ${this.id}`);
        return this.connection.sendRequest(new protocol_1.Command('next', this.id));
    }
    stepIn() {
        // contextLog.debug(`request 'stepIn' for context ${this.id}`);
        return this.connection.sendRequest(new protocol_1.Command('step', this.id));
    }
    stepOut() {
        // contextLog.debug(`request 'stepOut' for context ${this.id}`);
        return this.connection.sendRequest(new protocol_1.Command('step_out', this.id));
    }
    /**
     * Evaluate arbitrary JS inside the current frame.
     *
     * Example:
     *      const expr = "(function(){return JSON.stringify({answer: 42});})();";
     *      const result = await context.evaluate2(expr);
     *
     * @param expression A JS expression
     * @returns The result of the expression as string
     */
    evaluate2(expression) {
        const req = protocol_1.Command.evaluate(this.id, {
            path: expression,
            options: {
                "show-hierarchy": true,
                "evaluation-depth": 1,
            },
        });
        return this.connection.sendRequest(req, (res) => {
            return new Promise((resolve, reject) => {
                if (res.type === 'error') {
                    return reject(new Error(res.content.message));
                }
                else {
                    assert.equal(res.subtype, 'evaluated');
                    resolve(res.content.result);
                }
            });
        });
    }
    evaluate(expression) {
        // contextLog.debug(`request 'evaluate' for context ${this.id}`);
        // For now this solution is okay, in future it would be better if the debugger is smart enough to decide how the
        // value of the "thing" to evaluate should be represented.
        const evaluateReplaceFunction = (key, value) => {
            if (typeof value === "function") {
                return "function " + value.toString().match(/(\([^\)]*\))/)[1] + "{ ... }";
            }
            else {
                return value;
            }
        };
        const req = protocol_1.Command.evaluate(this.id, {
            path: `JSON.stringify(${expression}, ${evaluateReplaceFunction.toString()})`,
            options: {
                "show-hierarchy": true,
                "evaluation-depth": 1,
            },
        });
        return this.connection.sendRequest(req, (res) => {
            return new Promise((resolve, reject) => {
                if (res.type === 'error') {
                    reject(new Error(res.content.message));
                }
                else {
                    assert.equal(res.subtype, 'evaluated');
                    let variableType;
                    if (res.content.result.startsWith("function")) {
                        variableType = "function";
                    }
                    else {
                        const _variable = JSON.parse(res.content.result);
                        variableType = (Array.isArray(_variable)) ? "array" : typeof _variable;
                    }
                    const variable = {
                        name: "",
                        value: res.content.result,
                        type: variableType,
                    };
                    resolve(variable);
                }
            });
        });
    }
    setVariable(variableName, variableValue) {
        if (typeof variableValue === "string") {
            variableValue = `"${variableValue}"`;
        }
        const cmd = protocol_1.Command.evaluate(this.id, {
            path: `${variableName}=${variableValue}`,
            options: {
                "show-hierarchy": false,
                "evaluation-depth": 0,
            },
        });
        return this.connection.sendRequest(cmd);
    }
    handleResponse(response) {
        // contextLog.debug(`handleResponse ${JSON.stringify(response)} for context ${this.id}`);
        if (response.type === "info" && response.subtype && response.subtype === "paused") {
            contextLog.debug(`${this.id} -> paused`);
            this.stopped = true;
        }
        return Promise.resolve();
    }
}
exports.Context = Context;
const coordinatorLog = node_file_log_1.Logger.create('ContextCoordinator');
/**
 * Coordinates requests and responses for all available contexts.
 *
 * Responsibilities:
 * - Keep track of all available contexts of the target.
 * - Dispatch incoming responses to their corresponding context.
 */
class ContextCoordinator {
    constructor(connection) {
        this.connection = connection;
        this.contextById = new Map();
    }
    getAllAvailableContexts() {
        return __awaiter(this, void 0, void 0, function* () {
            // coordinatorLog.debug(`getAllAvailableContexts`);
            // After connecting the remote debugger, it responses with a context list
            // that doesn't contain an id. But when we send the 'get_available_contexts'
            // request, the response contains an id. Anyway, for now we do not check the
            // id but simply take the next response that contains a context list. But this
            // is very likely a correct answer.
            // TODO: insert id check
            yield this.connection.sendRequest(new protocol_1.Command('get_available_contexts'), (res) => this.handleResponse(res));
            const contexts = Array.from(this.contextById.values());
            const contextNames = contexts.map(context => context.stopped ? ` '${context.name}' (${context.id}) paused` : ` '${context.name}' (${context.id})`);
            coordinatorLog.debug(`contexts on server: ${contextNames}`);
            return contexts;
        });
    }
    getContext(id) {
        const context = this.contextById.get(id);
        if (context === undefined) {
            const contents = Array.from(this.contextById.values());
            const contextIds = contents.map(someContext => someContext.id);
            coordinatorLog.warn(`unknown context ${id} requested, available: ${JSON.stringify(contextIds)}`);
            throw new Error(`No such context ${id}`);
        }
        return context;
    }
    handleResponse(response) {
        // coordinatorLog.debug(`handleResponse`);
        return new Promise((resolve, reject) => {
            if (response.contextId === undefined) {
                // Not meant for a particular context
                if (response.type === 'info' && response.subtype === 'contexts_list') {
                    // coordinatorLog.debug('updating list of available contexts');
                    if (!response.content.hasOwnProperty('id')) {
                        // no id and subtype 'contexts_list' so this means, that this is the
                        // first response that we get after we connected the remote debugger
                        // simply log an information message
                        coordinatorLog.info(`connected to remote debugger`);
                    }
                    assert.ok(response.content.hasOwnProperty('contexts'));
                    // Add new contexts
                    response.content.contexts.forEach((element) => {
                        const context = this.contextById.get(element.contextId);
                        if (context === undefined) {
                            // coordinatorLog.debug(`creating new context with id: ${element.contextId}`);
                            const newContext = new Context(this.connection, element.contextId, element.contextName, element.paused);
                            this.contextById.set(element.contextId, newContext);
                            // Notify the frontend that we have a new context in the target
                            this.connection.emit('newContext', newContext.id, newContext.name, newContext.isStopped());
                        }
                        else {
                            context.stopped = element.paused;
                        }
                    });
                    // Delete the contexts that no longer exist
                    const dead = [];
                    this.contextById.forEach(context => {
                        if (!response.content.contexts.find((element) => element.contextId === context.id)) {
                            coordinatorLog.debug(`context ${context.id} no longer exists`);
                            dead.push(context.id);
                        }
                    });
                    dead.forEach(id => this.contextById.delete(id));
                }
            }
            else {
                // Dispatch to the corresponding context
                const context = this.contextById.get(response.contextId);
                if (context === undefined) {
                    reject(new Error(`response for unknown context`));
                    return;
                }
                context.handleResponse(response);
            }
            resolve();
        });
    }
}
exports.ContextCoordinator = ContextCoordinator;
//# sourceMappingURL=context.js.map