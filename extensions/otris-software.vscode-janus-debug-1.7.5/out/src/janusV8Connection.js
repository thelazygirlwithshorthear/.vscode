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
exports.JanusV8Connection = void 0;
const vscode = require("vscode");
const launchConfigurations_1 = require("./launchConfigurations");
const timers_1 = require("timers");
const http = require("http");
class JanusV8Connection {
    constructor() {
        /**
         * The index of the janus v8 configuration in the configurations
         * of launch.json
         */
        this.index = -1;
        this.address = "";
        this.port = "";
        this.getConfiguration();
    }
    getConfiguration() {
        if (!vscode.workspace.workspaceFolders)
            throw new Error("Workspace folder missing");
        const launch = launchConfigurations_1.launchConfigurations.getFromVSCode();
        const configs = launch.configurations;
        if (!configs || !(configs instanceof Array) || configs.length === 0)
            throw new Error("Error in getting launch.json");
        var index = -1;
        var configuration;
        var count = 0;
        configs.forEach((c, i) => {
            if (c.type === "node") {
                if (count === 0) {
                    index = i;
                    configuration = c;
                }
                count++;
            }
        });
        if (index < 0)
            throw new Error(`Configuration of type 'node' missing in launch.json`);
        if (count > 1) {
            configs.some((c, i) => {
                if (c.type === "node" && c.name) {
                    var ln = c.name.toLocaleLowerCase();
                    if (ln.indexOf("janus v8") >= 0 || ln.indexOf("janus-v8") >= 0 || ln.indexOf("documents6") >= 0 || ln.indexOf("documents 6") >= 0) {
                        index = i;
                        configuration = c;
                        return true;
                    }
                }
            });
        }
        this.address = configuration.address;
        this.port = configuration.port;
        this.index = index;
    }
    wsAddressToLaunchConfig() {
        return new Promise((resolve, reject) => {
            if (!vscode.workspace.workspaceFolders)
                return reject("Workspace folder missing");
            if (this.index < 0)
                return reject("Invalid configuration index");
            var httpOptions = {
                host: this.address,
                port: this.port,
                path: "/json/list",
                timeout: 4000
            };
            // request.on("Timeout") does not work for some ports
            const timer = (0, timers_1.setTimeout)(() => reject(`Timeout (check port: "${httpOptions.port}")`), 5000);
            const request = http.get(httpOptions, response => {
                (0, timers_1.clearTimeout)(timer);
                var data = "";
                response.on("data", chunk => { data += chunk; });
                response.on("end", () => __awaiter(this, void 0, void 0, function* () {
                    try {
                        var titles = [];
                        var urls = [];
                        var parsedData = JSON.parse(data);
                        if (parsedData instanceof Array) {
                            parsedData.forEach(val => {
                                titles.push(val.title);
                                urls.push(val.webSocketDebuggerUrl);
                            });
                        }
                        if (titles.length == 0)
                            return reject(new Error("No running scripts found"));
                        const title = yield vscode.window.showQuickPick(titles);
                        var pickedIndex = title ? titles.indexOf(title) : -1;
                        if (pickedIndex >= 0)
                            launchConfigurations_1.launchConfigurations.updateAtIndex(this.index, "websocketAddress", urls[pickedIndex]);
                        resolve();
                    }
                    catch (err) {
                        reject(err);
                    }
                }));
                response.on("error", err => reject(err));
            });
            request.on("error", err => {
                (0, timers_1.clearTimeout)(timer);
                reject(err);
            });
        });
    }
}
exports.JanusV8Connection = JanusV8Connection;
//# sourceMappingURL=janusV8Connection.js.map