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
exports.disconnectServerConsole = exports.reconnectServerConsole = exports.ServerConsole = void 0;
const node_sds_1 = require("@otris/node-sds");
const fs_extra_1 = require("fs-extra");
const launchConfigurations_1 = require("./launchConfigurations");
class ServerConsole {
    constructor(out) {
        this.out = out;
        this.config = undefined;
        this.conn = undefined;
        this.lastSeen = 0;
        this.taskIsRunning = 0;
    }
    get currentConfiguration() { return this.config; }
    get outputChannel() { return this.out; }
    dispose() { this.out.dispose(); }
    hide() { this.out.hide(); }
    isConnected() { return this.conn !== undefined; }
    connect(config) {
        return __awaiter(this, void 0, void 0, function* () {
            const trustedCas = config.trustedCaPaths ? config.trustedCaPaths.map(caPath => (0, fs_extra_1.readFileSync)(caPath, "utf8")) : undefined;
            this.config = config;
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                if (this.conn !== undefined)
                    return resolve();
                this.out.show();
                try {
                    this.conn = new node_sds_1.SDSConnection();
                    node_sds_1.SDSConnection.TIMEOUT = config.timeout || 6000;
                    if (this.conn === undefined)
                        return resolve();
                    yield this.conn.connect('server-console', config.hostname, config.port, config.tls, config.startTls, trustedCas);
                    yield this.conn.PDClass.changeUser(config.username, config.password);
                    yield this.conn.PDClass.changePrincipal(config.principal);
                    this.lastSeen = -1;
                    let logMessages = yield this.conn.ServerGui.getLogMessages(this.lastSeen);
                    this.printLogMessages(logMessages.messages.slice(1));
                    this.lastSeen = logMessages.lastSeen;
                }
                catch (err) {
                    this.out.appendLine(`Cannot connect to ${config.port}:${config.hostname}: ${err instanceof Error ? err.message : err}`);
                    if (this.conn && this.conn.isConnected)
                        yield this.conn.disconnect();
                    this.conn = undefined;
                    return resolve();
                }
                const timer = setInterval(() => __awaiter(this, void 0, void 0, function* () { this.repeatedHandleLogMessages(timer); }), config.refreshRate || 3000);
                resolve();
            }));
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                if (!this.conn)
                    resolve();
                else {
                    if (this.conn.isConnected)
                        yield this.conn.disconnect();
                    this.conn = undefined;
                    resolve();
                }
            }));
        });
    }
    repeatedHandleLogMessages(timer) {
        return __awaiter(this, void 0, void 0, function* () {
            // handle taskIsRunning
            // because in some cases getLogMessages() doesn't return
            // (e.g. when it's called during a disconnection)
            if (this.taskIsRunning > 0) {
                if (this.taskIsRunning > 20) {
                    this.out.appendLine(`Something went wrong, connection is closed...`);
                    yield this.disconnect();
                    clearInterval(timer);
                }
                else
                    this.taskIsRunning++;
                return;
            }
            this.taskIsRunning = 1;
            try {
                if (!this.conn)
                    return;
                const logMessages = yield this.conn.ServerGui.getLogMessages(this.lastSeen);
                this.printLogMessages(logMessages.messages.slice(1));
                this.lastSeen = logMessages.lastSeen;
            }
            catch (err) {
                // after disconnect() this.conn is undefined
                if (this.conn)
                    this.out.appendLine(`Cannot get log messages: ${err instanceof Error ? err.message : err}`);
                yield this.disconnect();
                clearInterval(timer);
            }
            this.taskIsRunning = 0;
        });
    }
    printLogMessages(messages) {
        for (const message of messages)
            this.printLogLine(message);
    }
    printLogLine(message) {
        if (message.endsWith('\n'))
            this.out.append(`→ ${message}`);
        else
            this.out.appendLine(`→ ${message}`);
    }
}
exports.ServerConsole = ServerConsole;
/**
 * Connect or re-connect server console.
 *
 * Get launch.json configuration and see if we can connect to a remote
 * server already. Watch for changes in launch.json file.
 */
function reconnectServerConsole(console) {
    return __awaiter(this, void 0, void 0, function* () {
        let username;
        let password;
        let principal;
        let hostname;
        let port;
        let timeout;
        let tls = false;
        try {
            yield console.disconnect();
            const launchJson = yield launchConfigurations_1.launchConfigurations.getFromDisk(); // vscode.workspace.getConfiguration('launch');
            const configs = launchJson.get('configurations', []);
            for (const config of configs) {
                if (config.hasOwnProperty('type') && config.type === 'janus') {
                    username = config.username;
                    password = config.password;
                    principal = config.principal;
                    hostname = config.host;
                    port = config.applicationPort;
                    timeout = config.timeout;
                    tls = config.tls;
                    break;
                }
            }
        }
        catch (error) {
            // Swallow
        }
        if (username && password !== undefined && principal && hostname && port)
            console.connect({ username, password, principal, hostname, port, timeout, tls });
    });
}
exports.reconnectServerConsole = reconnectServerConsole;
function disconnectServerConsole(console) {
    console.disconnect().then(() => {
        console.outputChannel.appendLine(`Disconnected from server`);
    });
}
exports.disconnectServerConsole = disconnectServerConsole;
//# sourceMappingURL=serverConsole.js.map