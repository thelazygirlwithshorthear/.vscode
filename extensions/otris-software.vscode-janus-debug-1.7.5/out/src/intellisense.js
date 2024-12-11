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
exports.registerCommands = exports.getAllTypings = void 0;
const child_process_1 = require("child_process");
const http_1 = require("http");
const nodeDoc = require("node-documents-scripting");
const path = require("path");
const vscode = require("vscode");
const helpers = require("./helpers");
const login = require("./login");
const documentsVersion_1 = require("./documentsVersion");
// tslint:disable-next-line:no-var-requires
const fs = require('fs-extra');
// tslint:disable-next-line:no-var-requires
const simpleGit = require("simple-git");
const TYPINGS_FOLDER_DEFAULT = 'typings';
/**
 * Clones the given repository to the typings folder
 * Note: Requires git to be installed.
 * @todo Maybe we should switch the git module to an alternative which doesn't require git to be installed local
 * @param typingsRepositoryUrl The URL of the repository to clone
 */
function cloneTypingsFolder(typingsRepositoryUrl, userFolder) {
    if (!vscode.workspace.workspaceFolders || !vscode.workspace.workspaceFolders[0]) {
        throw new Error("You need to open a workspace first");
    }
    const workspaceFolder = vscode.workspace.workspaceFolders[0].uri.fsPath;
    const typingsFolder = userFolder ? userFolder : path.join(workspaceFolder, TYPINGS_FOLDER_DEFAULT);
    if (!fs.existsSync(typingsFolder)) {
        fs.mkdirSync(typingsFolder);
    }
    // if the repository was cloned before, we need to remove it first
    const typingsRepoFolder = path.join(typingsFolder, "typings-repository");
    if (fs.existsSync(typingsRepoFolder)) {
        fs.removeSync(typingsRepoFolder);
    }
    const git = simpleGit(typingsFolder);
    return new Promise((resolve, reject) => {
        git.clone(typingsRepositoryUrl, "typings-repository", (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve("");
            }
        });
    });
}
function getAllTypings(extensionPath, loginData, force = false, userFolder) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let message = "";
            let serverRunning = false;
            try {
                yield createFiletypesTSD(loginData, userFolder);
                message += ' fileTypes.d.ts';
                serverRunning = true;
            }
            catch (err) {
                //
            }
            const extensionSettings = vscode.workspace.getConfiguration("vscode-janus-debug");
            // clone a repository with typings if the user has configured one
            const typingsRepositoryUrl = extensionSettings.has("typingsRepository.url") ? extensionSettings.get("typingsRepository.url") : null;
            if (typingsRepositoryUrl) {
                yield cloneTypingsFolder(typingsRepositoryUrl, userFolder);
            }
            if (force || serverRunning) {
                const version = (0, documentsVersion_1.getVersion)(loginData.documentsVersion);
                const installPortalScripting = extensionSettings.has("typingsRepository.installPortalScripting") ? extensionSettings.get("typingsRepository.installPortalScripting", true) : true;
                if (installPortalScripting && copyTypings(extensionPath, ["portalScripting.d.ts"], version, userFolder))
                    message += ' portalScripting.d.ts';
                const additionalTypings = ["scriptExtensions.d.ts", "gadgetApi.d.ts", "documentsClientSdk.d.ts", "otrAssert.d.ts", "otrLogger.d.ts"];
                if (copyTypings(extensionPath, additionalTypings, version, userFolder)) {
                    message += " " + additionalTypings[0];
                    message += " " + additionalTypings[1];
                    message += " " + additionalTypings[2];
                }
            }
            // Install additional typings if available
            let isRegistryAvailable = false;
            try {
                yield (0, http_1.request)({
                    method: "get",
                    host: "registry.otris.de",
                    protocol: "http:",
                    timeout: 3000
                });
                isRegistryAvailable = true;
            }
            catch (err) {
                isRegistryAvailable = false;
            }
            if (isRegistryAvailable) {
                let isYarn = (yield vscode.workspace.findFiles("yarn.lock")).length > 0;
                if (!isYarn) {
                    isYarn = yield new Promise((resolve) => {
                        (0, child_process_1.exec)("yarn --version", (err, stdout, stderr) => {
                            if (err) {
                                resolve(false);
                            }
                            else {
                                resolve(true);
                            }
                        });
                    });
                }
                // the next command requires a package.json file
                let workspaceFolders = vscode.workspace.workspaceFolders;
                if (workspaceFolders && workspaceFolders.length > 0) {
                    let workspaceFolder = workspaceFolders[0];
                    const hasPackageJSON = (yield vscode.workspace.findFiles("package.json")).length > 0;
                    if (!hasPackageJSON) {
                        yield new Promise((resolve) => {
                            (0, child_process_1.exec)(`${isYarn ? "yarn" : "npm"} init -y`, { cwd: workspaceFolder.uri.fsPath }, (err, stdout, stderr) => {
                                if (err) {
                                    vscode.window.showErrorMessage(err.message);
                                }
                                resolve();
                            });
                        });
                    }
                    let command = isYarn
                        ? "yarn add @types/documents --dev"
                        : "npm i @types/documents --save-dev";
                    if (workspaceFolder) {
                        yield new Promise((resolve) => {
                            (0, child_process_1.exec)(`${command} --registry https://registry.otris.de`, { cwd: workspaceFolder.uri.fsPath }, (err, stdout, stderr) => {
                                if (err) {
                                    vscode.window.showErrorMessage(err.message);
                                }
                                resolve();
                            });
                        });
                    }
                }
            }
            return resolve(message);
        }));
    });
}
exports.getAllTypings = getAllTypings;
function getFileTypesTSD(loginData) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        yield login.ensureLoginInformation(loginData);
        nodeDoc.serverSession(loginData, [], nodeDoc.getFileTypesTSD).then((result) => {
            if (!result || result.length === 0) {
                return reject('TSD file was not created');
            }
            if (result[0].length === 0) {
                return reject('TSD file is empty');
            }
            resolve(result[0]);
        }).catch((reason) => {
            reject(reason);
        });
    }));
}
function createFiletypesTSD(loginData, userFolder) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        if (!vscode.workspace || !vscode.workspace.rootPath) {
            return reject('Workspace folder missing');
        }
        // get the content for fileTypes.d.ts
        let fileTypesTSD = '';
        try {
            fileTypesTSD = yield getFileTypesTSD(loginData);
        }
        catch (err) {
            return reject(err instanceof Error ? err.message : err);
        }
        const projtypings = userFolder ? userFolder : path.join(vscode.workspace.rootPath, TYPINGS_FOLDER_DEFAULT);
        fs.ensureDirSync(projtypings);
        // create fileTypes.d.ts
        const filetypesPath = path.join(projtypings, "fileTypes.d.ts");
        try {
            fs.writeFileSync(filetypesPath, fileTypesTSD);
        }
        catch (reason) {
            return reject(reason instanceof Error ? reason.message : "unknown error type");
        }
        resolve();
    }));
}
function ensureJsconfigJson(extensionPath) {
    if (!vscode.workspace || !vscode.workspace.rootPath) {
        vscode.window.showErrorMessage('Workspace folder missing');
        return false;
    }
    // create empty jsconfig.json, if it does not exist
    const jsconfigPath = path.join(vscode.workspace.rootPath, 'jsconfig.json');
    const tsconfigPath = path.join(vscode.workspace.rootPath, 'tsconfig.json');
    if (!fs.existsSync(jsconfigPath) && !fs.existsSync(tsconfigPath)) {
        try {
            fs.copySync(path.join(extensionPath, "portalscript", "templates", "jsconfig.json"), jsconfigPath);
        }
        catch (reason) {
            vscode.window.showErrorMessage("Write jsonfig.json failed: " + reason);
        }
    }
}
function copyTypings(extensionPath, dtsFiles, version, userFolder) {
    if (!vscode.workspace || !vscode.workspace.workspaceFolders || !vscode.workspace.workspaceFolders[0]) {
        vscode.window.showErrorMessage('Extension or workspace folder missing');
        return false;
    }
    // ensure target dir
    const projTypingsDir = userFolder ? userFolder : path.join(vscode.workspace.workspaceFolders[0].uri.fsPath, TYPINGS_FOLDER_DEFAULT);
    fs.ensureDirSync(projTypingsDir);
    // copy all files
    let baseName;
    for (baseName of dtsFiles) {
        // source file in extension
        const extensionTSDFile = path.join(extensionPath, "typings", version, baseName);
        try {
            // copy does not throw exception
            fs.readFileSync(extensionTSDFile);
            fs.copySync(extensionTSDFile, path.join(projTypingsDir, baseName));
        }
        catch (err) {
            vscode.window.showErrorMessage(err instanceof Error ? err.message : "unknown error type");
            return false;
        }
    }
    return true;
}
function registerCommands(context, loginData, statusBarItem, extensionPath) {
    // Install Intellisense
    context.subscriptions.push(vscode.commands.registerCommand('extension.vscode-janus-debug.installIntellisense', () => __awaiter(this, void 0, void 0, function* () {
        helpers.updateStatusBar(statusBarItem, `Installing Intellisense`, 1);
        try {
            ensureJsconfigJson(extensionPath);
        }
        catch (err) {
            helpers.updateStatusBar(statusBarItem, "Installing Intellisense failed", 3);
            return;
        }
        const message = yield getAllTypings(extensionPath, loginData, true);
        if (message.length === 0) {
            helpers.updateStatusBar(statusBarItem, "Installing Intellisense failed", 3);
            return;
        }
        helpers.updateStatusBar(statusBarItem, "Installed: jsconfig.json" + message, 2);
    })));
    // Get Types
    context.subscriptions.push(vscode.commands.registerCommand('extension.vscode-janus-debug.getTypes', (param) => __awaiter(this, void 0, void 0, function* () {
        helpers.updateStatusBar(statusBarItem, `Get Types`, 1);
        try {
            const menuFolder = helpers.fsPath(param, true);
            const defaultFolder = vscode.workspace.workspaceFolders ? path.join(vscode.workspace.workspaceFolders[0].uri.fsPath, TYPINGS_FOLDER_DEFAULT) : "";
            const userFolder = yield helpers.ensureDirName(menuFolder, true, defaultFolder);
            const message = yield getAllTypings(extensionPath, loginData, true, userFolder);
            if (message.length === 0) {
                helpers.updateStatusBar(statusBarItem, "Getting Types failed", 3);
                return;
            }
            helpers.updateStatusBar(statusBarItem, "Got Types: " + message, 2);
        }
        catch (err) {
            helpers.updateStatusBar(statusBarItem, "Getting Types failed", 3);
            vscode.window.showErrorMessage(err instanceof Error ? err.message : "unknown error type");
        }
    })));
}
exports.registerCommands = registerCommands;
//# sourceMappingURL=intellisense.js.map