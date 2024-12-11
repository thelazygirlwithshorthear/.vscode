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
exports.downloadCreateProject = void 0;
const fs_1 = require("fs");
const fs = require("fs-extra");
const path = require("path");
const vscode = require("vscode");
const download = require("./download");
const helpers = require("./helpers");
const intellisense = require("./intellisense");
const login = require("./login");
const launchConfigurations_1 = require("./launchConfigurations");
const SOURCE_FOLDER_NAME = "src";
const uMage = "\u{1F9D9}:";
function downloadScriptsViaWizard(loginData, workspaceFolder) {
    return __awaiter(this, void 0, void 0, function* () {
        const wizard = `${uMage} Do you want to download all scripts of your selected principal? This will take a few seconds...`;
        const answer = yield vscode.window.showQuickPick(["Continue", "Skip"], { placeHolder: wizard });
        let result = true;
        if (answer === "Continue") {
            const extensionSettings = vscode.workspace.getConfiguration('vscode-janus-debug');
            const createCategories = yield vscode.window.showQuickPick(["Yes", "No"], {
                placeHolder: `${uMage} Create subfolders from categories?`
            });
            if (createCategories === "Yes") {
                extensionSettings.update('categories', true);
            }
            const src = path.join(workspaceFolder, SOURCE_FOLDER_NAME);
            fs.ensureDirSync(src);
            // execute Download All command
            // await vscode.window.setStatusBarMessage("Establishing connection to server...", 60000);
            try {
                yield download.downloadAllSelected(loginData, src);
                helpers.showWarning(loginData);
            }
            catch (err) {
                result = false;
            }
        }
        return result;
    });
}
function getWorkspaceFolderForWizard(fsPath) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!fsPath) {
            // Get the workspace folder where the launch.json and the scripts should be downloaded.
            let workspaceFolder = "";
            if (vscode.workspace && vscode.workspace.workspaceFolders) {
                // the user has already opened a folder. Use this folder as default value
                workspaceFolder = vscode.workspace.workspaceFolders[0].uri.fsPath;
            }
            // ask if the provided folder should be used as workspace folder
            let abort = false;
            while (!fsPath && !abort) {
                fsPath = yield vscode.window.showInputBox({ value: workspaceFolder });
                if (typeof fsPath === "string") {
                    if (!(0, fs_1.existsSync)(fsPath)) {
                        yield vscode.window.showErrorMessage(`${uMage}The folder does not exist. Please try again.`);
                        fsPath = undefined;
                    }
                    else if (!(0, fs_1.statSync)(fsPath).isDirectory()) {
                        yield vscode.window.showErrorMessage(`${uMage}Please pass a folder path.`);
                        fsPath = undefined;
                    }
                }
                else {
                    // user has aborted the wizard (e. g. with "esc").
                    // Nothing to do
                    abort = true;
                }
            }
        }
        return fsPath;
    });
}
function createJSConfig(extensionPath, workspaceFolder) {
    return __awaiter(this, void 0, void 0, function* () {
        const source = path.join(extensionPath, "portalscript", "templates", "jsconfig.json");
        const jsconfigPath = path.join(workspaceFolder, "jsconfig.json");
        let overwrite = true;
        if ((0, fs_1.existsSync)(jsconfigPath)) {
            const answer = yield vscode.window.showQuickPick(["Yes", "No"], {
                placeHolder: `${uMage} jsconfig.json already exists. Do you want to overwrite this file?`
            });
            overwrite = (answer === "Yes");
        }
        if (overwrite) {
            fs.copySync(source, jsconfigPath);
        }
        return jsconfigPath;
    });
}
function setDefaultBrowser() {
    return __awaiter(this, void 0, void 0, function* () {
        const browsers = [
            "iexplore",
            "mozilla",
            "chrome",
            "safari",
            "firefox"
        ];
        const browser = yield vscode.window.showQuickPick(browsers, { placeHolder: `${uMage} Please select your favourite browser for documentation` });
        const extensionSettings = vscode.workspace.getConfiguration('vscode-janus-debug');
        extensionSettings.update('browser', browser);
    });
}
function createLaunchJson(loginData, workspaceFolder) {
    return __awaiter(this, void 0, void 0, function* () {
        let answer = yield vscode.window.showQuickPick(["Continue", "Abort wizard"], {
            placeHolder: `${uMage} Let's connect to the server.`
        });
        if (answer === "Continue") {
            let abort = false;
            if (launchConfigurations_1.launchConfigurations.exists()) {
                answer = yield vscode.window.showQuickPick(["Use existing", "Abort wizard"], {
                    placeHolder: `${uMage} You have already created a launch.json file with connection info. If you want to use different connection information, delete this file first.`
                });
                abort = (answer === "Abort wizard");
            }
            if (abort) {
                return false;
            }
            else {
                yield login.ensureLoginInformation(loginData);
                return true;
            }
        }
        else {
            return false;
        }
    });
}
function assertEmptyWorkspace(workspaceFolder) {
    return __awaiter(this, void 0, void 0, function* () {
        const folderContent = fs.readdirSync(workspaceFolder);
        if (!folderContent) {
            return false;
        }
        if (folderContent.length === 0 || (folderContent.length === 1 && folderContent[0] === ".vscode-janus-debug")) {
            return true;
        }
        const answer = yield vscode.window.showQuickPick(["Continue", "Abort wizard"], { placeHolder: `${uMage} The selected folder is not empty!` });
        if (answer === "Continue") {
            return true;
        }
        return false;
    });
}
function defaultGitIgnore(extensionPath, workspaceFolder, gitProject) {
    return __awaiter(this, void 0, void 0, function* () {
        const folderContent = fs.readdirSync(workspaceFolder);
        if (gitProject || (folderContent && folderContent.indexOf(".git") >= 0 && folderContent.indexOf(".gitignore") < 0)) {
            const answer = yield vscode.window.showQuickPick(["Yes", "No"], { placeHolder: `${uMage} Create default .gitignore?` });
            if (answer === "Yes") {
                const sourcePath = path.join(extensionPath, "portalscript", "templates", "gitignore");
                const projectPath = path.join(workspaceFolder, ".gitignore");
                fs.copySync(sourcePath, projectPath);
            }
        }
    });
}
function downloadCreateProject(loginData, param, extensionPath, gitProject = false) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const workspaceFolder = yield getWorkspaceFolderForWizard((param) ? param._fsPath : undefined);
            if (!workspaceFolder) {
                return;
            }
            let skipDownload = false;
            const useWorkspace = yield assertEmptyWorkspace(workspaceFolder);
            if (!useWorkspace) {
                return;
            }
            // Create launch.json
            const success = yield createLaunchJson(loginData, workspaceFolder);
            if (!success) {
                return;
            }
            const jsconfigPath = yield createJSConfig(extensionPath, workspaceFolder);
            // Download scripts
            const downloadSuccessful = skipDownload || gitProject || (yield downloadScriptsViaWizard(loginData, workspaceFolder));
            if (skipDownload || downloadSuccessful) {
                // Ensure src folder
                const folderContent = fs.readdirSync(workspaceFolder);
                if (folderContent && folderContent.indexOf("src") < 0) {
                    fs.ensureDirSync(path.join(workspaceFolder, "src"));
                }
                // Download typings
                yield intellisense.getAllTypings(extensionPath, loginData, true);
                // Default browser
                yield setDefaultBrowser();
                // Create default gitignore
                yield defaultGitIgnore(extensionPath, workspaceFolder, gitProject);
                // Open jsconfig and show finished message
                const doc = yield vscode.workspace.openTextDocument(jsconfigPath);
                // await vscode.window.showTextDocument(doc);
                vscode.window.showInformationMessage(uMage + `Finished! If you rename folder '${SOURCE_FOLDER_NAME}', rename it in 'jsconfig.json'`);
            }
        }
        catch (err) {
            yield vscode.window.showErrorMessage(`Unexpected error occurred. Please try again.\n\n` + (err instanceof Error ? `${err.message}\n${err.stack}` : ""));
        }
    });
}
exports.downloadCreateProject = downloadCreateProject;
//# sourceMappingURL=wizard.js.map