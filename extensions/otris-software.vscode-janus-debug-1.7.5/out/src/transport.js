"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugProtocolTransport = void 0;
const events_1 = require("events");
const node_file_log_1 = require("node-file-log");
const protocol_1 = require("./protocol");
const INITIAL_BUFFER_SIZE = 4 * 1024;
const SEPARATOR = 10; // decimal ASCII value for '\n'
const log = node_file_log_1.Logger.create('DebugProtocolTransport');
class DebugProtocolTransport extends events_1.EventEmitter {
    constructor(socket) {
        super();
        this.socket = socket;
        this.buffer = Buffer.alloc(INITIAL_BUFFER_SIZE);
        this.bufferedLength = 0;
        this.socket.on('data', (chunk) => {
            // log.debug(`received data on the socket: "${chunk}"`);
            this.scanParseAndEmit(chunk);
        });
        this.socket.on('error', () => {
            log.error(`received an error on the socket, maybe you connected on the wrong TCP port?`);
        });
    }
    sendMessage(msg) {
        // log.debug(`write on the socket`);
        const buf = Buffer.from(msg, 'utf-8');
        this.socket.write(buf);
    }
    disconnect() {
        // log.debug(`somebody wants us to disconnect from the socket`);
        return new Promise((resolve, reject) => {
            this.socket.on('close', () => resolve());
            this.socket.end();
        });
    }
    scanParseAndEmit(chunk) {
        const sepIdx = chunk.indexOf(SEPARATOR);
        if ((this.bufferedLength === 0) && (sepIdx === (chunk.length - 1))) {
            let response;
            const str = chunk.toString('utf-8');
            try {
                response = (0, protocol_1.parseResponse)(str);
            }
            catch (e) {
                log.info(`parsing response "${str}" failed; hanging up`);
                this.disconnect();
                this.emit('error', `Could not understand the server's response. Did you connect on the right port?`);
                return;
            }
            this.emit('response', response);
            return;
        }
        if (sepIdx === -1) {
            // No separator
            this.appendToBuffer(chunk);
            return;
        }
        this.appendToBuffer(chunk.slice(0, sepIdx + 1));
        // Buffer contains a complete response. Parse and emit
        let response;
        const str = this.buffer.toString('utf-8', 0, this.bufferedLength);
        try {
            response = (0, protocol_1.parseResponse)(str);
        }
        catch (e) {
            log.info(`parsing response "${str}" failed; hanging up`);
            this.disconnect();
            this.emit('error', `Could not understand the server's response. Did you connect on the right port?`);
            return;
        }
        this.emit('response', response);
        this.buffer.fill(0);
        this.bufferedLength = 0;
        if ((sepIdx + 1) < chunk.length) {
            // Continue with remainder
            this.scanParseAndEmit(chunk.slice(sepIdx + 1));
        }
    }
    appendToBuffer(chunk) {
        const spaceLeft = this.buffer.length - this.bufferedLength;
        if (spaceLeft < chunk.length) {
            const newCapacity = Math.max(this.bufferedLength + chunk.length, 1.5 * this.buffer.length);
            const newBuffer = Buffer.alloc(newCapacity);
            this.buffer.copy(newBuffer);
            this.buffer = newBuffer;
        }
        chunk.copy(this.buffer, this.bufferedLength);
        this.bufferedLength += chunk.length;
    }
}
exports.DebugProtocolTransport = DebugProtocolTransport;
//# sourceMappingURL=transport.js.map