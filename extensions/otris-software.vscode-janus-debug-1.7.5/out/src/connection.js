"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugConnection = void 0;
const events_1 = require("events");
const node_file_log_1 = require("node-file-log");
const context_1 = require("./context");
const transport_1 = require("./transport");
const log = node_file_log_1.Logger.create('DebugConnection');
/**
 * Represents a connection to a target.
 *
 * @fires DebugConnection.newContext
 * @fires DebugConnection.contextPaused
 * @fires DebugConnection.error
 */
class DebugConnection extends events_1.EventEmitter {
    constructor(socket) {
        super();
        this.handleResponse = (response) => {
            // log.info(`handle response: ${JSON.stringify(response)}`);
            if (response.content.hasOwnProperty('id')) {
                const uuid = response.content.id;
                if (this.responseHandlers.has(uuid)) {
                    // log.debug(`found a response handler for response id "${uuid}"`);
                    // Meant to be handled by a particular response handler function that was given when sending the
                    // request
                    const handler = this.responseHandlers.get(uuid);
                    if (handler === undefined) {
                        throw new Error(`No response handler for ${uuid}`);
                    }
                    try {
                        handler(response);
                    }
                    finally {
                        this.responseHandlers.delete(uuid);
                    }
                    return;
                }
            }
            if (response.type === "info" && response.subtype && response.subtype === "paused") {
                // log.info(`got 'paused' from remote (${response.contextId})`);
                this.emit('contextPaused', response.contextId);
            }
            // No response handler; let the context coordinator decide on how to handle the response
            this.coordinator.handleResponse(response);
        };
        this.responseHandlers = new Map();
        this.coordinator = new context_1.ContextCoordinator(this);
        this.transport = new transport_1.DebugProtocolTransport(socket);
        this.transport.on('response', this.handleResponse);
        this.transport.on('error', (reason) => {
            this.emit('error', reason);
        });
    }
    disconnect() {
        return this.transport.disconnect();
    }
    /**
     * Send given request to the target.
     * @param {Command} request - The request that is send to the target.
     * @param {Function} responseHandler - An optional handler function that is called as soon as a response arrives.
     */
    sendRequest(request, responseHandler) {
        return new Promise((resolve, reject) => {
            // If we have to wait for a response and handle it, make sure that we resolve after the handler function
            // has finished
            if (responseHandler) {
                if (request.id === undefined) {
                    // Somebody gave us a responseHandler, but the command does not contain a request id (and the
                    // server does not accept one for this command, probably, namely for 'exit', 'next', 'stop')
                    log.warn(`sendRequest: responseHandler given but request has no ID: disregard`);
                }
                else {
                    this.registerResponseHandler(request.id, (response) => {
                        responseHandler(response).then(value => {
                            resolve(value);
                        }).catch(reason => {
                            reject(reason);
                        });
                    });
                }
            }
            const message = request.toString();
            // log.debug(`sendRequest: ${message.trim()}\\n`);
            this.transport.sendMessage(message);
            // If we don't have to wait for a response, resolve immediately
            if (!responseHandler) {
                resolve("");
            }
        });
    }
    registerResponseHandler(requestId, handler) {
        // log.debug(`registerResponseHandler: adding handler function for request: "${requestId}"`);
        this.responseHandlers.set(requestId, handler);
    }
}
exports.DebugConnection = DebugConnection;
//# sourceMappingURL=connection.js.map