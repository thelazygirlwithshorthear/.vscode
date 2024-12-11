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
exports.launchConfigurations = exports.initialConfigurations = void 0;
const vscode = require("vscode");
const path = require("path");
const fs = require("fs-extra");
const stripJsonComments = require("strip-json-comments");
exports.initialConfigurations = [
    {
        name: 'Launch Script on Server',
        request: 'launch',
        type: 'janus',
        script: '${file}',
        username: '',
        password: '${command:extension.vscode-janus-debug.askForPassword}',
        principal: '',
        host: 'localhost',
        applicationPort: 11000,
        debuggerPort: 8089,
        tls: false,
        currentConfiguration: true,
        stopOnEntry: true,
        log: {
            fileName: '${workspaceRoot}/vscode-janus-debug-launch.log',
            logLevel: {
                default: 'Debug',
            },
        },
        timeout: 6000,
        localSources: {
            include: '**/*.js',
            exclude: '**/node_modules/**'
        }
    },
    {
        name: 'Attach to Server',
        request: 'attach',
        type: 'janus',
        host: 'localhost',
        debuggerPort: 8089,
        log: {
            fileName: '${workspaceRoot}/vscode-janus-debug-attach.log',
            logLevel: {
                default: 'Debug',
            },
        },
        timeout: 6000,
        localSources: {
            include: '**/*.js',
            exclude: '**/node_modules/**'
        }
    },
];
class Config {
    get(section, defaultValue) {
        // tslint:disable-next-line:no-string-literal
        return this.has(section) ? this[section] : defaultValue;
    }
    has(section) {
        return this.hasOwnProperty(section);
    }
    update(section, value) {
        return __awaiter(this, void 0, void 0, function* () {
            // Not implemented... and makes no sense to implement
            return Promise.reject(new Error('Not implemented'));
        });
    }
    inspect(section) {
        throw new Error('Not implemented');
    }
}
class launchConfigurations {
    static getInitial() {
        return exports.initialConfigurations;
    }
    static exists() {
        if (vscode.workspace && vscode.workspace.workspaceFolders)
            return fs.existsSync(path.join(vscode.workspace.workspaceFolders[0].uri.fsPath, '.vscode', 'launch.json'));
        return false;
    }
    /**
     * Reads and returns the launch.json file's configurations.
     *
     * This function does essentially the same as
     *
     *     let configs = vscode.workspace.getConfiguration('launch');
     *
     * but is guaranteed to read the configuration from disk the moment it is called.
     * vscode.workspace.getConfiguration function seems instead to return the
     * currently loaded or active configuration which is not necessarily the most
     * current one.
     */
    static getFromDisk() {
        return new Promise((resolve, reject) => {
            if (!vscode.workspace.workspaceFolders) {
                // No folder open; resolve with an empty configuration
                return resolve(new Config());
            }
            const filePath = path.resolve(vscode.workspace.workspaceFolders[0].uri.fsPath, '.vscode/launch.json');
            fs.readFile(filePath, { encoding: 'utf-8', flag: 'r' }, (err, data) => {
                if (err) {
                    // Silently ignore error and resolve with an empty configuration
                    return resolve(new Config());
                }
                const obj = JSON.parse(stripJsonComments(data));
                const config = this.extend(new Config(), obj);
                resolve(config);
            });
        });
    }
    static getFromVSCode() {
        if (!vscode.workspace.workspaceFolders)
            throw new Error("Workspace folder missing");
        return vscode.workspace.getConfiguration('launch', vscode.workspace.workspaceFolders[0].uri);
    }
    static updateAtIndex(index, name, value) {
        if (!vscode.workspace.workspaceFolders)
            throw new Error("Workspace folder missing");
        if (index < 0)
            throw new Error("Invalid index");
        const launch = vscode.workspace.getConfiguration('launch', vscode.workspace.workspaceFolders[0].uri);
        const configs = launch.configurations;
        if (!configs || !(configs instanceof Array) || configs.length === 0)
            throw new Error("Error getting launch.json");
        configs[index][name] = value;
        launch.update("configurations", configs);
    }
    /**
     * Extends an object with another object's properties.
     *
     * Merges the properties of two objects together into the first object.
     *
     * @param target The object that will receive source's properties.
     * @param source An object carrying additional properties.
     */
    static extend(target, source) {
        const s = source;
        const t = target;
        Object.keys(s).forEach(key => t[key] = s[key]);
        return t;
    }
}
exports.launchConfigurations = launchConfigurations;
//# sourceMappingURL=launchConfigurations.js.map