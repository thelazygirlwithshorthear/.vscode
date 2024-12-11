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
exports.showImportBundle = exports.compareScript = exports.reloadScripts = exports.downloadAllSelected = exports.downloadAllCommon = exports.downloadScript = exports.getServerScripts = void 0;
const nodeDoc = require("node-documents-scripting");
const path = require("path");
const vscode = require("vscode");
const helpers = require("./helpers");
const login = require("./login");
const settings = require("./settings");
// tslint:disable-next-line:no-var-requires
const fs = require('fs-extra');
function getServerScripts(loginData, params = []) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield nodeDoc.serverSession(loginData, params, nodeDoc.getScriptsFromServer);
    });
}
exports.getServerScripts = getServerScripts;
function downloadScript(loginData, param) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!vscode.workspace.workspaceFolders)
                    throw new Error('Workspace folder required');
                const wsPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
                const conf = vscode.workspace.getConfiguration('vscode-janus-debug');
                const paramIsScript = typeof param === 'string' && param.length > 0 && path.extname(param).match(/\.m?js/) !== null;
                yield login.ensureLoginInformation(loginData);
                // get dir where to save the script
                const scriptDir = yield helpers.ensureDirName(param, true, path.join(wsPath, "src"));
                // get script name and create script object
                let serverScripts;
                if (!paramIsScript) {
                    const category = settings.getCategoryFromPath(conf.get('categories', false), scriptDir);
                    serverScripts = yield getServerScripts(loginData, category ? [category] : []);
                }
                const scriptName = yield helpers.ensureServerScriptName(param, serverScripts);
                if (typeof scriptName !== 'string')
                    throw new Error('Download Script: single script expected');
                const script = new nodeDoc.scriptT(scriptName);
                // extension .js default, module scripts (.mjs) are changed in save function
                script.path = path.join(scriptDir, scriptName + '.js');
                if (!script.path || script.path.length === 0)
                    throw new Error('Download Script: unexpected error, script path is empty');
                // download parameters?
                settings.getScriptInfoJson(conf.get('scriptParameters', false), [script]);
                // download the script
                yield nodeDoc.serverSession(loginData, [script], nodeDoc.downloadScript);
                // create folders from categories
                if (!paramIsScript) {
                    // if download is called directly on a script, the path should not be changed
                    const invalidNames = settings.categoriesToFolders(conf.get('categories', false), loginData.documentsVersion, [script], scriptDir);
                    if (invalidNames.length > 0) {
                        vscode.window.showWarningMessage(`Cannot create folder from category '${invalidNames[0]}' - please remove special characters`);
                    }
                }
                // if script is open in editor, ask before saving
                if (vscode.window.activeTextEditor) {
                    const ext = path.extname(vscode.window.activeTextEditor.document.fileName);
                    if (ext.match(/\.m?js$/) !== null && path.basename(vscode.window.activeTextEditor.document.fileName, ext) === script.name) {
                        const overwrite = yield vscode.window.showQuickPick(["Download anyway", "Cancel"], { ignoreFocusOut: true, placeHolder: `${script.name} is active` });
                        if (overwrite === "Cancel")
                            return reject();
                    }
                }
                // now save script, new hash value and scriptParameters
                yield nodeDoc.saveScriptUpdateSyncHash([script]);
                settings.updateHashValues(conf.get('forceUpload', false), wsPath, [script], loginData.server);
                settings.writeScriptInfoJson(conf.get('scriptParameters', false), wsPath, [script]);
                // show script in editor
                const doc = yield vscode.workspace.openTextDocument(vscode.Uri.file(script.path));
                vscode.window.showTextDocument(doc);
                return resolve(script.name);
            }
            catch (err) {
                return reject("Download Script: " + (err instanceof Error ? err.message : err));
            }
        }));
    });
}
exports.downloadScript = downloadScript;
/**
 * Downloads all scripts from list inputScripts to folder in downloadFolder
 */
function downloadAllCommon(loginData, inputScripts, downloadFolder, categories = false) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!vscode.workspace.workspaceFolders) {
                    throw new Error("Missing workspace folder");
                }
                const wsPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
                const conf = vscode.workspace.getConfiguration('vscode-janus-debug');
                // set downloadParameters flag in script structure,
                // if scriptParameters is true in settings.json
                settings.getScriptInfoJson(conf.get('scriptParameters', false), inputScripts);
                // download scripts from server
                const outputScripts = yield nodeDoc.serverSession(loginData, inputScripts, nodeDoc.downloadAll);
                if (categories) {
                    // script path might be changed depending on type of downloadFolder:
                    // * category folder
                    // * normal folder that does not contain category folders
                    // * normal folder that contains category folders
                    const invalidNames = settings.categoriesToFolders(conf.get('categories', false), loginData.documentsVersion, outputScripts, downloadFolder);
                    if (invalidNames.length > 0) {
                        vscode.window.showWarningMessage(`Cannot create folder from category '${invalidNames[0]}' - please remove special characters`);
                    }
                }
                // now save script, new hash value and scriptParameters
                const numSavedScripts = yield nodeDoc.saveScriptUpdateSyncHash(outputScripts);
                settings.updateHashValues(conf.get('forceUpload', false), wsPath, outputScripts, loginData.server);
                settings.writeScriptInfoJson(conf.get('scriptParameters', false), wsPath, outputScripts);
                // if a script from inputScripts list is not downloaded but the function resolves,
                // the script is encrypted on server
                const encryptedScripts = inputScripts.length - outputScripts.length;
                if (1 <= encryptedScripts) {
                    vscode.window.showWarningMessage(`couldn't download ${encryptedScripts} scripts (scripts probably encrypted)`);
                }
                return resolve(numSavedScripts);
            }
            catch (reason) {
                return reject(reason);
            }
        }));
    });
}
exports.downloadAllCommon = downloadAllCommon;
function downloadAllSelected(loginData, fileOrFolder) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield login.ensureLoginInformation(loginData);
                if (!vscode.workspace.workspaceFolders)
                    throw new Error("Missing workspace folder");
                const conf = vscode.workspace.getConfiguration('vscode-janus-debug');
                // get target folder
                const downloadFolder = yield helpers.ensureDirName(fileOrFolder, true);
                // target folder == category?
                const category = settings.getCategoryFromPath(conf.get('categories', false), downloadFolder);
                // get all scripts on server
                let serverScripts = yield nodeDoc.serverSession(loginData, category ? [category] : [], nodeDoc.getScriptsFromServer);
                const selectedScripts = yield helpers.ensureServerScriptName(undefined, serverScripts, true);
                if (typeof selectedScripts === 'string')
                    throw new Error("downloadAllSelected. unexpected value");
                const scripts = serverScripts.filter(script => selectedScripts.includes(script.name));
                // set target folder to scripts paths
                helpers.setPaths(scripts, downloadFolder);
                const num = yield downloadAllCommon(loginData, scripts, downloadFolder, true);
                return resolve(num);
            }
            catch (err) {
                return reject(err);
            }
        }));
    });
}
exports.downloadAllSelected = downloadAllSelected;
/**
 * Download scripts that are found in the folder or sub folder and on the server.
 * The paths of the reloaded scripts won't be changed.
 */
function reloadScripts(loginData, fileOrFolder) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield login.ensureLoginInformation(loginData);
                // get download folder
                const downloadFolder = yield helpers.ensureDirName(fileOrFolder);
                // get all scripts in that folder and sub folders
                // and set paths to script objects
                const scripts = nodeDoc.getScriptsFromFolderSync(downloadFolder);
                // set categories to false because script paths should not be changed
                const numDownloaded = yield downloadAllCommon(loginData, scripts, downloadFolder, false);
                return resolve({ num: numDownloaded, folder: path.basename(downloadFolder) });
            }
            catch (err) {
                vscode.window.showErrorMessage('reload all failed: ' + err);
                return reject();
            }
        }));
    });
}
exports.reloadScripts = reloadScripts;
/**
 * Compare script
 */
function compareScript(loginData, contextMenuPath) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let compareDir;
            if (vscode.workspace && vscode.workspace.rootPath) {
                compareDir = path.join(vscode.workspace.rootPath, helpers.COMPARE_FOLDER);
            }
            else {
                return reject('First create workspace folder please');
            }
            try {
                yield login.ensureLoginInformation(loginData);
                yield helpers.ensureFolder(compareDir);
            }
            catch (error) {
                return reject(error);
            }
            let extname = contextMenuPath ? path.extname(contextMenuPath) : undefined;
            if (extname !== ".js" && extname !== ".mjs" && extname !== ".ts")
                extname = undefined;
            helpers.ensureScript(contextMenuPath, extname).then((serverScript) => {
                return nodeDoc.serverSession(loginData, [serverScript], nodeDoc.downloadScript).then((value) => {
                    try {
                        const compareScriptPath = path.join(compareDir, helpers.COMPARE_FILE_PREFIX + serverScript.name + '.js');
                        fs.writeFileSync(compareScriptPath, serverScript.serverCode);
                        const title = serverScript.name + '.js' + ' (DOCUMENTS Server)';
                        const leftUri = vscode.Uri.file(compareScriptPath);
                        if (!serverScript.path) {
                            return resolve();
                        }
                        const rightUri = vscode.Uri.file(serverScript.path);
                        vscode.commands.executeCommand('vscode.diff', leftUri, rightUri, title).then(() => {
                            resolve();
                        }, (reason) => {
                            vscode.window.showErrorMessage('Compare script failed ' + reason);
                            resolve();
                        });
                    }
                    catch (err) {
                        reject(err);
                    }
                });
            }).catch((reason) => {
                vscode.window.showErrorMessage('Compare script failed: ' + reason);
                reject();
            });
        }));
    });
}
exports.compareScript = compareScript;
function showImportBundle(loginData, param) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield login.ensureLoginInformation(loginData);
                let serverScriptNames;
                const extName = param ? path.extname(param) : null;
                if (!extName || ('.js' !== extName && '.ts' !== extName)) {
                    serverScriptNames = yield nodeDoc.serverSession(loginData, [], nodeDoc.getScriptNamesFromServer);
                }
                const scriptName = yield helpers.ensureServerScriptName(param, serverScriptNames);
                // const script = new nodeDoc.scriptT(scriptName, '');
                const returnValue = yield nodeDoc.serverSession(loginData, [scriptName], nodeDoc.getSourceCodeForEditor);
                const doc = yield vscode.workspace.openTextDocument({ content: returnValue[0], language: 'javascript' });
                const editor = yield vscode.window.showTextDocument(doc);
                resolve();
            }
            catch (reason) {
                vscode.window.showErrorMessage('Show Server File failed: ' + reason);
                reject();
            }
        }));
    });
}
exports.showImportBundle = showImportBundle;
//# sourceMappingURL=download.js.map