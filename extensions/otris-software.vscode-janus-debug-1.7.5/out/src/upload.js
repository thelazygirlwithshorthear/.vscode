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
exports.ensureUploadOnSave = exports.autoUpload = exports.runScript = exports.uploadScriptsFromFolder = exports.uploadScript = exports.uploadActiveScript = exports.ensureForceUpload = exports.NO_CONFLICT = exports.FORCE_UPLOAD_NONE = exports.FORCE_UPLOAD_ALL = exports.FORCE_UPLOAD_NO = exports.FORCE_UPLOAD_YES = void 0;
const fs = require("fs-extra");
const nodeDoc = require("node-documents-scripting");
const path = require("path");
const vscode = require("vscode");
const helpers = require("./helpers");
const login = require("./login");
const os = require("os");
const settings = require("./settings");
const fs_1 = require("fs");
const helpers_1 = require("./helpers");
const node_documents_scripting_1 = require("node-documents-scripting");
const transpile_1 = require("./transpile");
// tslint:disable-next-line:no-var-requires
const reduce = require('reduce-for-promises');
/**
 * Two things for script are checked:
 *
 * 1) has the category changed?
 * because the category is created from the folder
 * just make sure, that the category is not changed by mistake
 *
 * 2) has the source code on server changed?
 * this is only important if more than one people work on
 * the same server
 */
exports.FORCE_UPLOAD_YES = 'Yes';
exports.FORCE_UPLOAD_NO = 'No';
exports.FORCE_UPLOAD_ALL = 'All';
exports.FORCE_UPLOAD_NONE = 'None';
exports.NO_CONFLICT = 'No conflict';
function askForUpload(script, all, none, singlescript, categories, statusBarItem) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            if (!script.conflict) {
                if (script.lastSyncHash) {
                    return resolve(exports.NO_CONFLICT);
                }
                else {
                    // if !lastSyncHash -> we have no information about the script
                    // but actually conflict should have been set to true in this case
                }
            }
            if (all) {
                return resolve(exports.FORCE_UPLOAD_ALL);
            }
            if (none) {
                return resolve(exports.FORCE_UPLOAD_NONE);
            }
            let answers = [exports.FORCE_UPLOAD_YES, exports.FORCE_UPLOAD_NO];
            let question;
            let answer;
            // first check category
            if (script.conflict && (script.conflict & nodeDoc.CONFLICT_CATEGORY)) {
                // only show warning, if category feature is used,
                // if it's not used, categories will not be changed on server
                if (categories) {
                    question = `Category of ${script.name} is different on server, upload anyway?`;
                    helpers.updateStatusBar(statusBarItem, "Conflict on Upload...");
                    answer = yield vscode.window.showQuickPick(answers, { placeHolder: question });
                }
                else {
                    answer = exports.FORCE_UPLOAD_YES;
                }
            }
            // script not force uploaded
            // so don't check source code
            if (answer === exports.FORCE_UPLOAD_NO) {
                return resolve(exports.FORCE_UPLOAD_NO);
            }
            // now check source code
            if (script.conflict && (script.conflict & nodeDoc.CONFLICT_SOURCE_CODE)) {
                if (script.encrypted === 'true') {
                    question = `${script.name} cannot be decrypted, source code might have been changed on server, upload anyway?`;
                }
                else if (script.lastSyncHash && script.serverCode) {
                    question = `${script.name} has been changed on server, upload anyway?`;
                }
                else if (script.lastSyncHash && !script.serverCode) {
                    question = `${script.name} has been deleted on server, upload anyway?`;
                }
                else if (!script.lastSyncHash && script.serverCode) {
                    question = `${script.name} might have been changed on server, upload anyway?`;
                }
                else if (!script.lastSyncHash && !script.serverCode) {
                    // new script
                    answer = exports.FORCE_UPLOAD_YES;
                }
                if (question) {
                    if (!singlescript) {
                        answers = [exports.FORCE_UPLOAD_YES, exports.FORCE_UPLOAD_NO, exports.FORCE_UPLOAD_ALL, exports.FORCE_UPLOAD_NONE];
                    }
                    helpers.updateStatusBar(statusBarItem, "Conflict on Upload...");
                    answer = yield vscode.window.showQuickPick(answers, { placeHolder: question });
                }
            }
            return resolve(answer);
        }));
    });
}
function ensureForceUpload(confForceUpload, confCategories, scripts, statusBarItem) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const forceUpload = [];
            const noConflict = [];
            let all = confForceUpload;
            let none = false;
            const singlescript = (1 === scripts.length);
            // todo: using async/await here probably makes the whole procedure
            // a bit simpler
            return reduce(scripts, (numScripts, script) => {
                return askForUpload(script, all, none, singlescript, confCategories, statusBarItem).then((value) => {
                    if (exports.NO_CONFLICT === value) {
                        noConflict.push(script);
                    }
                    else if (exports.FORCE_UPLOAD_ALL === value) {
                        script.forceUpload = true;
                        script.conflict = 0;
                        forceUpload.push(script);
                        all = true;
                    }
                    else if (exports.FORCE_UPLOAD_YES === value) {
                        script.forceUpload = true;
                        script.conflict = 0;
                        forceUpload.push(script);
                    }
                    else if (exports.FORCE_UPLOAD_NO === value) {
                        // do nothing ...
                    }
                    else {
                        // escape or anything should behave as if the user answered 'None'
                        none = true;
                    }
                    return numScripts + 1;
                });
            }, 0).then(() => {
                resolve({ noConflict, forceUpload });
            });
        }));
    });
}
exports.ensureForceUpload = ensureForceUpload;
function uploadScripts(loginData, scripts, statusBarItem, logging = false) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (scripts.length > 1) {
                    helpers.updateStatusBar(statusBarItem, `Start upload scripts $(loading) ${loginData.server}:${loginData.port}/${loginData.principal}`, 1);
                }
                else {
                    helpers.updateStatusBar(statusBarItem, `${scripts[0].name} $(loading) ${loginData.server}:${loginData.port}/${loginData.principal}`, 1);
                }
                yield login.ensureLoginInformation(loginData);
                const conf = vscode.workspace.getConfiguration('vscode-janus-debug');
                const confForceUpload = conf.get('forceUpload', false);
                const confCategories = conf.get('categories', false);
                const rootPath = vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders[0].uri.fsPath : undefined;
                if (!rootPath) {
                    throw new Error("Workspace folder missing");
                }
                settings.setConflictModes(confForceUpload, scripts);
                settings.readHashValues(confForceUpload, rootPath, scripts, loginData.server);
                settings.readEncryptionFlag(conf.get('encryptOnUpload', false), conf.get('encryptionOnUpload', "default"), scripts);
                settings.setScriptInfoJson(conf.get('scriptParameters', false), rootPath, scripts);
                settings.foldersToCategories(confCategories, loginData, scripts);
                const value = yield nodeDoc.serverSession(loginData, scripts, nodeDoc.uploadScripts);
                const retScripts = value;
                if (confForceUpload) {
                    // set status message and return
                    if (retScripts.length === 1) {
                        helpers.updateStatusBar(statusBarItem, `${retScripts[0].name} $(arrow-up) ${loginData.server}:${loginData.port}/${loginData.principal} $(clock) ${helpers.getTime()}`, 2);
                        return resolve(retScripts[0].name);
                    }
                    else {
                        helpers.updateStatusBar(statusBarItem, `${retScripts.length} scripts $(arrow-up) ${loginData.server}:${loginData.port}/${loginData.principal} $(clock) ${helpers.getTime()}`, 2);
                        return resolve();
                    }
                }
                // check script for conflict and if ask user if script should be force-uploaded
                const result = yield ensureForceUpload(confForceUpload, confCategories, retScripts, statusBarItem);
                let forceUploaded = [];
                if (result.forceUpload.length > 0) {
                    forceUploaded = yield nodeDoc.serverSession(loginData, result.forceUpload, nodeDoc.uploadScripts);
                }
                const uploaded = result.noConflict.concat(forceUploaded);
                // update hash values of uploaded scripts
                settings.updateHashValues(confForceUpload, rootPath, uploaded, loginData.server);
                // set status message and return
                if (uploaded.length === 1) {
                    helpers.updateStatusBar(statusBarItem, `${uploaded[0].name} $(arrow-up) ${loginData.server}:${loginData.port}/${loginData.principal} $(clock) ${helpers.getTime()}`, 2);
                    return resolve(uploaded[0].name);
                }
                else {
                    helpers.updateStatusBar(statusBarItem, `${uploaded.length} scripts $(arrow-up) ${loginData.server}:${loginData.port}/${loginData.principal} $(clock) ${helpers.getTime()}`, 2);
                    return resolve();
                }
            }
            catch (err) {
                helpers.updateStatusBar(statusBarItem, `uploading script failed`, 3);
                vscode.window.showErrorMessage("Upload Script: " + (err instanceof Error ? err.message : err));
                return resolve();
            }
        }));
    });
}
function createScript(filePath) {
    const extname = path.extname(filePath);
    const name = path.basename(filePath, extname);
    let code = fs.readFileSync(filePath, 'utf8');
    if (extname === '.ts')
        code = (0, transpile_1.transpileTypescript)(filePath, code);
    var script = new nodeDoc.scriptT(name, filePath, code);
    if (extname === '.mjs')
        script.mode = 'Module';
    return script;
}
function scriptsFromFileUris(uris) {
    const filesOnly = uris.filter(uri => {
        const pc = helpers.getPathContext(uri, false);
        if (pc && !pc.isFolder) {
            return true;
        }
    });
    const fsPaths = filesOnly.map(uri => uri.fsPath);
    const scripts = fsPaths.map(fsPath => createScript(fsPath));
    return scripts;
}
function scriptsFromFolderUris(uris) {
    const scripts = [];
    const foldersOnly = uris.filter(uri => {
        const pc = helpers.getPathContext(uri, false);
        if (pc && pc.isFolder) {
            return true;
        }
    });
    const folderPaths = foldersOnly.map(uri => uri.fsPath);
    folderPaths.forEach(folder => {
        const newScripts = nodeDoc.getScriptsFromFolderSync(folder);
        newScripts.forEach(newScript => scripts.push(newScript));
        // typescript files
        const typescriptFiles = (0, fs_1.readdirSync)(folder)
            .map(f => path.join(folder, f))
            .filter(f => (0, fs_1.statSync)(f).isFile() && path.extname(f) === ".ts");
        typescriptFiles.forEach(filePath => {
            const scriptName = path.basename(filePath, ".ts");
            const fileContent = fs.readFileSync(filePath).toString();
            const script = new node_documents_scripting_1.scriptT(scriptName, filePath, fileContent);
            scripts.push(script);
        });
    });
    return scripts;
}
function uploadActiveScript(loginData, selected, statusBarItem, logging = false) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const script = createScript(selected.fileName);
                const scripts = [script];
                yield uploadScripts(loginData, scripts, statusBarItem, logging);
                return resolve(scripts[0].path);
            }
            catch (err) {
                reject(err);
            }
        }));
    });
}
exports.uploadActiveScript = uploadActiveScript;
function uploadScript(loginData, selected, statusBarItem, logging = false) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let scripts = [];
            // get selected files and create script list
            if (selected) {
                scripts = scriptsFromFileUris(selected);
            }
            // if nothing selected, ask user
            if (!scripts || scripts.length === 0) {
                const _script = yield helpers.ensureScript();
                if (!_script) {
                    return resolve();
                }
                scripts = [_script];
            }
            yield uploadScripts(loginData, scripts, statusBarItem, logging);
            // return value only required for single script
            return resolve(scripts[0].path);
        }));
    });
}
exports.uploadScript = uploadScript;
function uploadScriptsFromFolder(loginData, selected, statusBarItem, logging = false) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let scripts = [];
            // get selected folders and create script list
            if (selected) {
                scripts = scriptsFromFolderUris(selected);
            }
            // if nothing selected, ask user
            if (!scripts || !scripts.length) {
                const folder = yield helpers.ensureDirName();
                if (!folder) {
                    return resolve();
                }
                scripts = nodeDoc.getScriptsFromFolderSync(folder);
            }
            if (!scripts || !scripts.length)
                return resolve();
            scripts = scripts.filter((script) => script.path && (path.extname(script.path) !== ".ts"));
            if (!scripts.length) {
                vscode.window.showWarningMessage("Uploading TypeScript files from folder not supported.");
                return resolve();
            }
            yield uploadScripts(loginData, scripts, statusBarItem, logging);
            return resolve();
        }));
    });
}
exports.uploadScriptsFromFolder = uploadScriptsFromFolder;
function runScript(loginData, param, outputChannel) {
    const conf = vscode.workspace.getConfiguration('vscode-janus-debug');
    const rootPath = vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders[0].uri.fsPath : undefined;
    // openScriptConsoleOnRunScript is deprecated and will be removed
    // default of both is true, if one of them is false, the user doesn't want to see the console
    const keepHidden = !conf.get('scriptConsole.open', true) || !conf.get('openScriptConsoleOnRunScript', true);
    const clear = conf.get('scriptConsole.clear', true);
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield login.ensureLoginInformation(loginData);
            let serverScriptNames;
            const extName = param ? path.extname(param) : null;
            if (!extName || ('.js' !== extName && '.ts' !== extName)) {
                serverScriptNames = yield nodeDoc.serverSession(loginData, [], nodeDoc.getScriptNamesFromServer);
            }
            const scriptName = yield helpers.ensureServerScriptName(param, serverScriptNames);
            if (typeof scriptName !== 'string')
                throw new Error("Download Script: single script expected");
            const script = new nodeDoc.scriptT(scriptName, '');
            outputChannel.append(`Starting script ${scriptName} at ${(0, helpers_1.getTime)()}${os.EOL}`);
            if (!keepHidden) {
                outputChannel.show(true);
            }
            if (clear) {
                outputChannel.clear();
            }
            yield nodeDoc.serverSession(loginData, [script], nodeDoc.runScript);
            let ver = '#' + loginData.documentsVersion;
            outputChannel.append(script.output + os.EOL);
            outputChannel.append(`Script finished at ${(0, helpers_1.getTime)()} on ${loginData.server} ${ver}${os.EOL}`);
            if (!keepHidden) {
                outputChannel.show(true);
            }
            settings.scriptLog(conf.get('scriptLog'), rootPath, script.output);
            resolve(scriptName);
        }
        catch (reason) {
            return reject(reason);
        }
    }));
}
exports.runScript = runScript;
var autoUpload;
(function (autoUpload) {
    autoUpload[autoUpload["yes"] = 0] = "yes";
    autoUpload[autoUpload["no"] = 1] = "no";
    autoUpload[autoUpload["neverAsk"] = 2] = "neverAsk";
})(autoUpload = exports.autoUpload || (exports.autoUpload = {}));
function ensureUploadOnSave(conf, scriptname, subfolder) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const always = conf.get('uploadOnSave', []);
            const never = conf.get('uploadManually', []);
            const neverFolder = never.filter(folder => folder.endsWith('/*.js')).map(folder => folder.replace('/*.js', ''));
            if (subfolder && neverFolder.indexOf(subfolder) >= 0)
                return resolve(autoUpload.no);
            if (0 <= never.indexOf(scriptname)) {
                resolve(autoUpload.no);
            }
            else if (0 <= always.indexOf(scriptname)) {
                resolve(autoUpload.yes);
            }
            else {
                const QUESTION = `Upload script ${scriptname}?`;
                const YES = `Yes`;
                const NO = `No`;
                const ALWAYS = `Always upload ${scriptname} automatically`;
                const NEVER = `Never upload ${scriptname} automatically`;
                const NEVERASK = `Never upload scripts automatically`;
                const answer = yield vscode.window.showQuickPick([YES, NO, ALWAYS, NEVER, NEVERASK], { placeHolder: QUESTION });
                if (YES === answer) {
                    resolve(autoUpload.yes);
                }
                else if (NO === answer) {
                    resolve(autoUpload.no);
                }
                else if (ALWAYS === answer) {
                    always.push(scriptname);
                    conf.update('uploadOnSave', always);
                    resolve(autoUpload.yes);
                }
                else if (NEVER === answer) {
                    never.push(scriptname);
                    conf.update('uploadManually', never);
                    resolve(autoUpload.no);
                }
                else if (NEVERASK === answer) {
                    conf.update('uploadOnSaveGlobal', false, true);
                    resolve(autoUpload.neverAsk);
                }
            }
        }));
    });
}
exports.ensureUploadOnSave = ensureUploadOnSave;
//# sourceMappingURL=upload.js.map