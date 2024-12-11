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
exports.loadLoginInformation = exports.loadLoginInformationOnCreate = exports.ensureLoginInformation = void 0;
const nodeDoc = require("node-documents-scripting");
const path = require("path");
const vscode = require("vscode");
const launchConfigurations_1 = require("./launchConfigurations");
// tslint:disable-next-line:no-var-requires
const stripJsonComments = require('strip-json-comments');
// tslint:disable-next-line:no-var-requires
const fs = require('fs-extra');
let launchJsonCreatedByExtension = false;
function askForPassword(connection) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const password = yield vscode.window.showInputBox({
                prompt: 'Please enter the password',
                value: '',
                password: true,
                ignoreFocusOut: true,
            });
            // Note: empty passwords are fine
            if (password === undefined)
                return reject(new Error('input password cancelled'));
            connection.password = nodeDoc.getJanusPassword(password);
            resolve();
        }));
    });
}
function askForLoginInformation(connection) {
    return __awaiter(this, void 0, void 0, function* () {
        const SERVER = 'localhost';
        const PORT = 11000;
        const PRINCIPAL = 'relations';
        const USERNAME = 'admin';
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const server = yield vscode.window.showInputBox({
                prompt: 'Please enter the hostname',
                value: SERVER,
                ignoreFocusOut: true,
            });
            if (!server) {
                return reject(new Error('input login data cancelled'));
            }
            const port = yield vscode.window.showInputBox({
                prompt: 'Please enter the port',
                value: connection.port ? connection.port.toString() : PORT.toString(),
                ignoreFocusOut: true,
            });
            if (!port) {
                return reject(new Error('input login data cancelled'));
            }
            const useTls = yield vscode.window.showQuickPick(["No", "Yes"], {
                placeHolder: "Use TLS to connect to the server?",
                ignoreFocusOut: true,
            });
            const principal = yield vscode.window.showInputBox({
                prompt: 'Please enter the principal',
                value: connection.principal ? connection.principal : PRINCIPAL,
                ignoreFocusOut: true,
            });
            if (!principal) {
                return reject(new Error('input login data cancelled'));
            }
            const username = yield vscode.window.showInputBox({
                prompt: 'Please enter the username (username.principal)',
                value: connection.username ? connection.username : USERNAME,
                ignoreFocusOut: true,
            });
            if (!username) {
                return reject(new Error('input login data cancelled'));
            }
            connection.server = server;
            connection.port = Number(port);
            connection.tls = useTls === "Yes";
            connection.principal = principal;
            connection.username = username;
            const password = yield vscode.window.showInputBox({
                prompt: 'Please enter the password',
                value: '',
                password: true,
                ignoreFocusOut: true,
            });
            // Note: empty passwords are fine
            if (password === undefined) {
                return reject(new Error('input login data cancelled'));
            }
            connection.password = nodeDoc.getJanusPassword(password);
            const savePw = yield vscode.window.showQuickPick(["Yes", "No"], { placeHolder: "Save password to launch.json?" });
            if ("Yes" === savePw) {
                connection.askForPassword = false;
                resolve(password);
            }
            else {
                // set to true so the string to ask for password
                // is written to launch.json
                connection.askForPassword = true;
                resolve(undefined);
            }
        }));
    });
}
function createLaunchJson(loginInfo, plainPassword) {
    if (!vscode.workspace || !vscode.workspace.workspaceFolders)
        throw new Error('workspace folder missing');
    const rootPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
    let pw = '${command:extension.vscode-janus-debug.askForPassword}';
    if (!loginInfo.askForPassword && typeof (plainPassword) === 'string')
        pw = plainPassword;
    const newConfig = {
        host: loginInfo.server,
        applicationPort: loginInfo.port,
        tls: loginInfo.tls,
        principal: loginInfo.principal,
        username: loginInfo.username,
        password: pw,
        currentConfiguration: true
    };
    const initConf = launchConfigurations_1.launchConfigurations.getInitial();
    initConf.forEach((config) => {
        Object.keys(newConfig).forEach(key => {
            if (config[key] !== undefined) {
                config[key] = newConfig[key];
            }
        });
    });
    const confString = JSON.stringify(initConf, null, '\t').split('\n').map(line => '\t' + line).join('\n').trim();
    const launchJsonString = [
        '{',
        '\t"configurations": ' + confString,
        '}',
    ].join('\n');
    try {
        fs.ensureDirSync(path.join(rootPath, '.vscode'));
        // only create launch.json if it doesn't exist
        fs.writeFileSync(path.join(rootPath, '.vscode', 'launch.json'), launchJsonString, { flag: "wx" });
        launchJsonCreatedByExtension = true;
    }
    catch (err) {
        throw err;
    }
}
/**
 * Check, if user must be asked for required login information (server-ip, server-port, principal and username).
 *
 * @param serverInfo If launch.json exists, this parameter already contains all required login information
 * because they're set by launchJsonWatcher.
 */
function ensureLoginInformation(serverInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let askForAllInfoRequired = true;
            if (vscode.workspace.workspaceFolders) {
                const wsNo = 0;
                const wsPath = vscode.workspace.workspaceFolders[wsNo].uri.fsPath;
                const launchJsonExists = fs.existsSync(path.join(wsPath, '.vscode', 'launch.json'));
                if (!launchJsonExists) {
                    // call this function here because launchJsonWatcher is not
                    // called in every case when launch.json is deleted
                    serverInfo.resetLoginData();
                }
                askForAllInfoRequired = !launchJsonExists;
            }
            const askForPasswordRequired = serverInfo.password === undefined;
            if (askForAllInfoRequired) {
                let plainPassword;
                // ask user for login information...
                try {
                    plainPassword = yield askForLoginInformation(serverInfo);
                }
                catch (err) {
                    return reject(err);
                }
                // ...and write login information to launch.json
                try {
                    createLaunchJson(serverInfo, plainPassword);
                }
                catch (err) {
                    // couldn't create launch.json, probably because it already exists
                    vscode.window.showWarningMessage(err instanceof Error ? err.message : err);
                }
            }
            else if (askForPasswordRequired) {
                try {
                    yield askForPassword(serverInfo);
                }
                catch (err) {
                    return reject(err);
                }
            }
            // if (!serverInfo.checkLoginData() || (undefined === serverInfo.password)) {
            //     return reject('getting login information or password failed');
            // }
            if (!serverInfo.principal) {
                return reject("principal missing in launch.json");
            }
            resolve();
        }));
    });
}
exports.ensureLoginInformation = ensureLoginInformation;
/**
 * This function is called by the launch.json-watcher when launch.json is created.
 */
function loadLoginInformationOnCreate(login, configFile) {
    if (launchJsonCreatedByExtension)
        // When launch.json is created in ensureLoginInformation() (and password is not saved in launch.json),
        // the login information should not be loaded. Because this would overwrite the password which is
        // kept in internal variable (nodeDoc.ConnectionInformation.password)
        launchJsonCreatedByExtension = false;
    else
        loadLoginInformation(login, configFile);
}
exports.loadLoginInformationOnCreate = loadLoginInformationOnCreate;
/**
 * Try to find a valid configuration in the configuration file and load it to the data structure.
 * Is called once on start and every time the configuration file is changed.
 */
function loadLoginInformation(connection, configFile) {
    connection.configFile = configFile;
    let configurations;
    try {
        // todo: use launchConfigurations.getFromDisk()
        const jsonContent = fs.readFileSync(connection.configFile, 'utf8');
        const jsonObject = JSON.parse(stripJsonComments(jsonContent));
        configurations = jsonObject.configurations;
    }
    catch (err) {
        return false;
    }
    if (!configurations)
        return false;
    // find janus/launch configuration (currentConfiguration or first one)
    let janusLaunchConfigurations = [];
    configurations.forEach(conf => {
        if (conf.type === 'janus' && conf.request === 'launch')
            janusLaunchConfigurations.push(conf);
    });
    if (janusLaunchConfigurations.length === 0)
        return false;
    let configuration = janusLaunchConfigurations[0];
    if (janusLaunchConfigurations.length > 1) {
        janusLaunchConfigurations.some((conf) => {
            if (conf.currentConfiguration) {
                configuration = conf;
                return true;
            }
        });
    }
    if (!configuration)
        return false;
    // finally load the configuration
    connection.server = configuration.host;
    connection.port = configuration.applicationPort;
    connection.principal = configuration.principal;
    connection.username = configuration.username;
    if (configuration.password === '${command:extension.vscode-janus-debug.askForPassword}' || configuration.password === undefined) {
        connection.askForPassword = true;
        connection.password = undefined;
    }
    else {
        connection.askForPassword = false;
        connection.password = nodeDoc.getJanusPassword(configuration.password);
    }
    connection.sdsTimeout = configuration.timeout;
    connection.documentsVersion = 'unknown';
    connection.tls = configuration.tls;
    connection.startTls = configuration.startTls;
    connection.trustedCas = configuration.trustedCaPaths ? configuration.trustedCaPaths.map(caPath => fs.readFileSync(caPath, "utf8")) : undefined;
    return true;
}
exports.loadLoginInformation = loadLoginInformation;
//# sourceMappingURL=login.js.map