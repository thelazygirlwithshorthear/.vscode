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
exports.sleep = exports.getConnectionInfoFromLaunchJSONAsConnectionInfo = exports.findLauchConfiguration = exports.getConnectionInfoFromLaunchJSON = exports.showWarning = exports.updateStatusBar = exports.ensureScript = exports.ensureServerScriptName = exports.ensureDirName = exports.ensureFolder = exports.setPaths = exports.getTime = exports.getErrorMsg = exports.fsPath = exports.getPathContext = exports.CACHE_FILE = exports.COMPARE_FILE_PREFIX = exports.COMPARE_FOLDER = void 0;
const fs_1 = require("fs");
const fs = require("fs-extra");
const nodeDoc = require("node-documents-scripting");
const node_documents_scripting_1 = require("node-documents-scripting");
const path = require("path");
const stripJsonComments = require("strip-json-comments");
const vscode = require("vscode");
const transpile_1 = require("./transpile");
// like eclipse plugin
exports.COMPARE_FOLDER = '.compare';
exports.COMPARE_FILE_PREFIX = 'compare_';
exports.CACHE_FILE = '.vscode-janus-debug';
const SCRIPT_NAMES_FILE = '.documents-script-names';
const supportedLanguages = [
    "javascript",
    "typescript",
    "xml"
];
/**
 * If the path is not a workspace folder, only the path is returned.
 * Because some features are possible without workspace folders.
 */
function getPathContext(param, activeEditor) {
    let uri;
    const editor = vscode.window.activeTextEditor;
    if (param && param instanceof vscode.Uri) {
        uri = param;
    }
    else if (activeEditor && editor && supportedLanguages.indexOf(editor.document.languageId) >= 0) {
        uri = editor.document.uri;
    }
    if (!uri) {
        return undefined;
    }
    const wsFolder = vscode.workspace.getWorkspaceFolder(uri);
    if (!wsFolder) {
        return undefined;
    }
    return {
        wsFolder,
        fsPath: uri.fsPath,
        isFolder: fs.statSync(uri.fsPath).isDirectory(),
        type: undefined
    };
}
exports.getPathContext = getPathContext;
function fsPath(uri, dirOnly = false) {
    if (!(uri instanceof vscode.Uri)) {
        return undefined;
    }
    if (!vscode.workspace.getWorkspaceFolder(uri)) {
        return undefined;
    }
    if (dirOnly && !fs.statSync(uri.fsPath).isDirectory()) {
        return undefined;
    }
    return uri.fsPath;
}
exports.fsPath = fsPath;
/**
 * If the type of an error is not clear, call this function.
 * @param error the error with unknown type
 */
function getErrorMsg(error) {
    let msg = 'Undefined error';
    if (error instanceof Error) {
        msg = error.message;
    }
    else if (typeof error === 'string') {
        msg = error;
    }
    return msg;
}
exports.getErrorMsg = getErrorMsg;
/**
 * get current time as hh:mm:ss
 */
function getTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const hours2 = hours < 10 ? '0' + hours : hours;
    const minutes2 = minutes < 10 ? '0' + minutes : minutes;
    const seconds2 = seconds < 10 ? '0' + seconds : seconds;
    return `${hours2}:${minutes2}:${seconds2}`;
}
exports.getTime = getTime;
function setPaths(scripts, targetDir) {
    scripts.forEach(function (script) {
        const ext = script.mode === 'Module' ? '.mjs' : '.js';
        script.path = path.join(targetDir, script.name + ext);
    });
}
exports.setPaths = setPaths;
function ensureFolder(_path) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            fs.stat(_path, (err, stats) => {
                if (err) {
                    if ('ENOENT' === err.code) {
                        fs.mkdir(_path, (error) => {
                            if (error)
                                reject(error);
                            else
                                resolve();
                        });
                    }
                    else {
                        reject(err);
                    }
                }
                else {
                    if (stats.isDirectory()) {
                        resolve();
                    }
                    else {
                        reject(`${_path} already exists but is not a directory`);
                    }
                }
            });
        });
    });
}
exports.ensureFolder = ensureFolder;
function ensureDirName(menuPath, allowSubDir = false, suggested = "", text) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            if (!vscode.workspace.workspaceFolders) {
                return reject('First open a workspace folder please!');
            }
            if (menuPath) {
                try {
                    const stats1 = fs.statSync(menuPath);
                    if (stats1.isDirectory()) {
                        return resolve(menuPath);
                    }
                    else if (stats1.isFile()) {
                        return resolve(path.dirname(menuPath));
                    }
                }
                catch (err) {
                    // if menuFile is invalid, ask user
                }
            }
            // set default for input box
            if (!suggested || suggested.length === 0) {
                // use invalid menuDir for suggestion
                if (menuPath && menuPath.length > 0) {
                    suggested = menuPath;
                }
                const editor = vscode.window.activeTextEditor;
                if (editor) {
                    const wsEditor = vscode.workspace.getWorkspaceFolder(editor.document.uri);
                    if (wsEditor) {
                        suggested = path.dirname(editor.document.fileName);
                    }
                }
            }
            // ask user
            const input = yield vscode.window.showInputBox({ prompt: text ? text : "Enter folder path", value: suggested, ignoreFocusOut: true });
            // check user input
            if (!input) {
                return reject('Invalid input');
            }
            if (!path.isAbsolute(input)) {
                return reject("Input path must be absolute");
            }
            if (!vscode.workspace.getWorkspaceFolder(vscode.Uri.file(input))) {
                return reject("Input path not in workspace");
            }
            // ensure dir
            try {
                if (fs.statSync(input).isDirectory()) {
                    return resolve(input);
                }
                throw new Error(`${input} does not exist`);
            }
            catch (err) {
                if (allowSubDir) {
                    fs.ensureDirSync(input);
                    return resolve(input);
                }
                else {
                    return reject(err);
                }
            }
        }));
    });
}
exports.ensureDirName = ensureDirName;
/**
 * This function shows a list of scripts to the user.
 * If the user selects a script, this script is returned.
 * The function is called for commands, that all require
 * a script on server, meaning if the
 * list of server scripts is empty, the function can simply reject.
 *
 * @param paramScript this param should be removed
 * @param serverScripts the list of scripts, should contain all scripts on server
 * @returns the selected script
 */
function ensureServerScriptName(paramScript, serverScripts = [], canPickMany = false) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            // todo
            // move this to none-vscode file
            // because this is required in mocha tests
            if (paramScript) {
                const extName = path.extname(paramScript);
                if ('.js' === extName || '.ts' === extName || '.mjs' === extName)
                    return resolve(path.basename(paramScript, extName));
            }
            var showScripts = serverScripts.map((value) => {
                if (typeof value === 'string')
                    return { label: value, description: "" };
                else
                    return { label: value.name, description: value.mode == "Module" ? "Module" : "" };
            });
            // show the list of server script names where the user can pick one
            if (showScripts.length > 0) {
                const selected = yield vscode.window.showQuickPick(showScripts, { canPickMany, ignoreFocusOut: true });
                if (!selected)
                    return reject("No script selected");
                if (canPickMany)
                    return resolve(selected.map(item => item.label));
                else if (selected && selected.label && typeof selected.label === "string")
                    return resolve(selected.label);
                else
                    return reject("No script selected");
            }
            return reject("No server scripts for selection");
        }));
    });
}
exports.ensureServerScriptName = ensureServerScriptName;
/**
 * Create script-type with name and sourceCode from file.
 *
 * @param file Scriptname, full path.
 */
function getScript(file, ext = '.js') {
    if (!file || ext !== path.extname(file)) {
        const lang = ext.match(/\.m?js$/) !== null ? 'javascript' : 'typescript';
        return `only ${lang} files allowed`;
    }
    if (!fs.existsSync(file)) {
        return `file ${file} does not exist`;
    }
    try {
        let scriptpath = file;
        if (ext === ".ts") {
            (0, transpile_1.transpileTypescript)(file);
            scriptpath = (0, transpile_1.findOutputFile)(file) || file;
        }
        const name = path.basename(file, ext);
        const localCode = fs.readFileSync(file, 'utf8');
        return new nodeDoc.scriptT(name, scriptpath, localCode);
    }
    catch (err) {
        return err instanceof Error ? err.message : "unknown error type";
    }
}
/**
 * Return script of type scriptT containing name and source code of given path or textdocument.
 *
 * @param param path to script or textdocument of script
 */
function ensureScript(param, ext = '.js') {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            if (param) {
                if (typeof param === 'string') { // param: path to script
                    const retscript = getScript(param, ext);
                    if (retscript instanceof nodeDoc.scriptT) {
                        return resolve(retscript);
                    }
                    else {
                        return reject(retscript);
                    }
                }
                else { // param: vscode.TextDocument
                    const ret = new nodeDoc.scriptT(path.basename(param.fileName, ext), param.fileName, param.getText());
                    return resolve(ret);
                }
            }
            else {
                let activeScript = '';
                const editor = vscode.window.activeTextEditor;
                if (editor && vscode.workspace.getWorkspaceFolder(editor.document.uri)) {
                    activeScript = editor.document.fileName;
                }
                vscode.window.showInputBox({
                    prompt: 'Please enter the script path',
                    value: activeScript,
                    ignoreFocusOut: true,
                }).then((_scriptname) => {
                    if (_scriptname) {
                        const retscript = getScript(_scriptname);
                        if (retscript instanceof nodeDoc.scriptT) {
                            return resolve(retscript);
                        }
                        else {
                            return reject(retscript);
                        }
                    }
                    else {
                        return reject('no scriptname');
                    }
                });
            }
        });
    });
}
exports.ensureScript = ensureScript;
function updateStatusBar(statusBarItem, text, status) {
    if (!statusBarItem) {
        return;
    }
    if (status === undefined || text === "") {
        statusBarItem.text = text;
    }
    else if (status === 1) {
        statusBarItem.text = text + " $(loading)";
    }
    else if (status === 2) {
        statusBarItem.text = text + " $(check)";
    }
    else if (status === 3) {
        statusBarItem.text = text + " $(error)";
    }
}
exports.updateStatusBar = updateStatusBar;
function showWarning(loginData) {
    if (0 < loginData.lastWarning.length) {
        vscode.window.showWarningMessage(loginData.lastWarning);
        loginData.lastWarning = '';
    }
}
exports.showWarning = showWarning;
function getConnectionInfoFromLaunchJSON() {
    return __awaiter(this, void 0, void 0, function* () {
        const config = yield findLauchConfiguration("launch");
        if (config) {
            return {
                host: config.host,
                password: config.password,
                port: parseInt(config.applicationPort, 10),
                user: config.username,
                tls: config.tls,
                startTls: config.startTls,
                trustedCas: config.trustedCaPaths ? config.trustedCaPaths.map(caPath => (0, fs_1.readFileSync)(caPath, "utf8")) : undefined
            };
        }
        return null;
    });
}
exports.getConnectionInfoFromLaunchJSON = getConnectionInfoFromLaunchJSON;
/**
 * Returns the configuration of type 'janus' and the provided type
 */
function findLauchConfiguration(requestType) {
    return __awaiter(this, void 0, void 0, function* () {
        if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0) {
            const workspaceFolder = vscode.workspace.workspaceFolders[0].uri.fsPath;
            const launchJSONPath = path.join(workspaceFolder, ".vscode", "launch.json");
            if ((0, fs_1.existsSync)(launchJSONPath)) {
                const launchJSON = JSON.parse(stripJsonComments((0, fs_1.readFileSync)(launchJSONPath, "utf-8")));
                if (Array.isArray(launchJSON.configurations)) {
                    const configs = launchJSON.configurations.filter(l => l.type === "janus" && l.request === requestType);
                    if (configs.length > 0) {
                        return configs[0];
                    }
                }
            }
        }
        return null;
    });
}
exports.findLauchConfiguration = findLauchConfiguration;
function getConnectionInfoFromLaunchJSONAsConnectionInfo() {
    return __awaiter(this, void 0, void 0, function* () {
        const connectionInfo = new node_documents_scripting_1.ConnectionInformation();
        const connection = yield getConnectionInfoFromLaunchJSON();
        if (connection) {
            connectionInfo.port = connection.port;
            connectionInfo.server = connection.host;
            connectionInfo.password = connection.password;
            connectionInfo.username = connection.user;
            connectionInfo.tls = connection.tls;
            connectionInfo.startTls = connection.startTls;
            connectionInfo.trustedCas = connection.trustedCas;
            return connectionInfo;
        }
        return null;
    });
}
exports.getConnectionInfoFromLaunchJSONAsConnectionInfo = getConnectionInfoFromLaunchJSONAsConnectionInfo;
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
exports.sleep = sleep;
//# sourceMappingURL=helpers.js.map