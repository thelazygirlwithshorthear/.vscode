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
exports.VSCodeExtensionIPC = void 0;
const fs = require("fs");
const nodeDoc = require("node-documents-scripting");
const ipc = require("node-ipc");
const os = require("os");
const path = require("path");
const vscode_1 = require("vscode");
const vscode = require("vscode");
const login = require("./login");
const helpers_1 = require("./helpers");
const http_1 = require("http");
const child_process_1 = require("child_process");
// We use a UNIX Domain or Windows socket, respectively, for having a
// communication channel from the debug adapter process back to the extension.
// Socket file path is usually /tmp/vscode-janus-debug.sock or so on Linux or
// macOS. This communication channel is outside of VS Code's debug protocol and
// allows us to show input boxes or use other parts of the VS Code extension
// API that would otherwise be unavailable to us in the debug adapter.
// We use the process id in the socket id, to handle multiple opened windows
// in VS Code.
ipc.config.appspace = 'vscode-janus-debug.';
ipc.config.id = 'sock' + process.pid.toString();
ipc.config.retry = 1500;
ipc.config.silent = true;
/**
 * Acts as the server in our communication.
 *
 * @export
 * @class VSCodeExtension
 */
class VSCodeExtensionIPC {
    constructor(loginData, outputChannel) {
        console.log(`ipc server id: ${ipc.config.id}`);
        this.loginData = loginData;
        this.outputChannel = outputChannel;
        this.scriptName = "";
        this.socket = undefined;
        ipc.serve(this.serverCallback.bind(this));
        ipc.server.start();
        process.on('exit', this.removeStaleSocket);
        process.on('uncaughtException', this.removeStaleSocket);
    }
    dispose() {
        ipc.disconnect('sock' + process.pid.toString());
    }
    removeStaleSocket() {
        console.log('removeStaleSocket');
        ipc.disconnect('sock' + process.pid.toString());
        const staleSocket = `${ipc.config.socketRoot}${ipc.config.appspace}${ipc.config.id}`;
        if (fs.existsSync(staleSocket)) {
            try {
                fs.unlinkSync(staleSocket);
            }
            catch (err) {
                // Disregard
            }
        }
    }
    serverCallback() {
        // This is the "API" that we expose via this IPC mechanism
        ipc.server.on('showContextQuickPick', (contextList, socket) => __awaiter(this, void 0, void 0, function* () {
            console.log('showContextQuickPick');
            // check for scripts with same name
            // const multiNames = contextList.filter((value, index, self) => (self.indexOf(value) !== index));
            if (Array.isArray(contextList[0])) {
                // Got "[["context 1", "context 2"]]
                // I don't know why, but had a case were an 2d-array was received..
                contextList = contextList[0];
            }
            const picked = yield vscode_1.window.showQuickPick(contextList, { ignoreFocusOut: true });
            // send answer in any case because server is waiting
            ipc.server.emit(socket, 'contextChosen', picked);
        }));
        /**
         * This request will be received if multiple files with the same name are found in the workspace.
         * This function will ask the user to select the correct source file and send the selected file
         * as response.
         */
        ipc.server.on('askForCorrectSourceFile', (params, socket) => __awaiter(this, void 0, void 0, function* () {
            const fileName = params[0];
            const filePaths = params[1];
            const serverFileSourceCode = params[2]; // optional. Source code of the remote file splitted by \r?\n
            // try to find the correct source file automatically by comparing the source code of the remote file
            // passed to that function with the source code of the selectable files
            let selected = null;
            if (serverFileSourceCode && serverFileSourceCode.length > 0) {
                selected = this.tryFindCorrectSourceFile(filePaths, serverFileSourceCode);
            }
            while (!selected) {
                selected = yield vscode_1.window.showQuickPick(filePaths, {
                    ignoreFocusOut: true,
                    placeHolder: `Multiple files were found for file ${fileName}. Please select the correct file.`
                });
            }
            ipc.server.emit(socket, 'correctSourceFileProvided', selected);
        }));
        ipc.server.on('launchContexts', (fileName, socket) => __awaiter(this, void 0, void 0, function* () {
            let selected;
            while (!selected) {
                selected = yield vscode_1.window.showQuickPick(["Start debugging newest script", "Terminate all", "Cancel"], {
                    ignoreFocusOut: true,
                    placeHolder: `Multiple scripts with name ${fileName} are running on server.`
                });
            }
            ipc.server.emit(socket, 'answerLaunchContexts', selected);
        }));
        /**
         * The callback returns an array containing all files in workspace that match
         * the include and exclude pattern.
         * Additional the function checks the array for scripts with same basename, because
         * on server the scriptnames are unique. If there are duplicate scriptnames in
         * workspace, the user can choose the correct script, or they can choose to
         * simply ignore all scripts with  names.
         */
        ipc.server.on('findURIsInWorkspace', (globPaterns, socket) => __awaiter(this, void 0, void 0, function* () {
            console.log('findURIsInWorkspace');
            const include = globPaterns.include ? globPaterns.include : '**/*.js';
            const exclude = globPaterns.exclude ? globPaterns.exclude : '**/node_modules/**';
            const uris = yield vscode_1.workspace.findFiles(include, exclude);
            // Create a Map with file name as key and one local path object which holds all
            // duplicates
            const uriMap = new Map();
            for (const uri of uris) {
                const currentPath = uri.fsPath;
                const currentName = path.basename(currentPath);
                if (uriMap.has(currentName)) {
                    const localPath = uriMap.get(currentName);
                    localPath.paths.push(currentPath);
                    uriMap.set(currentName, localPath);
                }
                else {
                    uriMap.set(currentName, {
                        name: currentName,
                        path: currentPath,
                        paths: [currentPath] // Always provide the path in this array because this array is used in SourceMap.setLocalUrls
                    });
                }
            }
            ipc.server.emit(socket, 'urisFound', [...uriMap.entries()]);
        }));
        ipc.server.on('displayMessage', (data, socket) => __awaiter(this, void 0, void 0, function* () {
            if (data.type === "error") {
                vscode_1.window.showErrorMessage(data.message);
            }
            else if (data.type === "warning") {
                vscode_1.window.showWarningMessage(data.message);
            }
            else {
                vscode_1.window.showInformationMessage(data.message);
            }
            if (data.source && data.source.length) {
                const doc = yield vscode_1.workspace.openTextDocument({ content: data.source, language: 'javascript' });
                yield vscode_1.window.showTextDocument(doc);
            }
        }));
        ipc.server.on("debugScript", (params, socket) => __awaiter(this, void 0, void 0, function* () {
            const scriptName = params[0];
            yield this.debugScript(this.loginData, scriptName, this.outputChannel, socket);
        }));
        ipc.server.on("checkForAdditionalDebugJSONHelpers", (params, socket) => {
            this.checkForAdditionalDebugJSONHelpers().then(() => {
                ipc.server.emit(socket, 'checkForAdditionalDebugJSONHelpersResponse');
            });
        });
    }
    checkForAdditionalDebugJSONHelpers() {
        return __awaiter(this, void 0, void 0, function* () {
            // First, get login informations from launch.json
            const isRegistryAvailable = yield this.isRegistryAvailable();
            if (isRegistryAvailable) {
                const connectionInfo = yield (0, helpers_1.getConnectionInfoFromLaunchJSONAsConnectionInfo)();
                if (connectionInfo) {
                    const isDocumentsToJsonAvailable = yield this.isDocumentsToJsonAvailable(connectionInfo);
                    if (!isDocumentsToJsonAvailable) {
                        const result = yield vscode.window.showInformationMessage("Do you want to upload additional scripts to your principal with which the debugger can provide more informations about the values of variables? This command will import the script 'documents-model-json', 'documents-to-json' and 'portal-scripting-json' which converts DOCUMENTS-elements to a JSON-format.", "Yes", "No");
                        if (result && result === "Yes") {
                            // get the tarball url
                            const tarballUrl = yield this.exec("npm view --registry https://registry.otris.de @otr-tools/documents-to-json dist.tarball");
                            // download the tarball
                            const downloadResult = yield this.exec(`npm pack ${tarballUrl}`, os.tmpdir());
                            const splitted = downloadResult.split(/\r?\n/g);
                            const fileName = splitted[splitted.length - 1];
                            // extract the tarball
                            const tarballPath = path.join(os.tmpdir(), fileName);
                            const extractedFiles = yield this.readTarball(tarballPath);
                            // Upload the files
                            yield nodeDoc.serverSession(connectionInfo, extractedFiles.map((filePath) => {
                                const script = new nodeDoc.scriptT(path.basename(filePath, ".js"), filePath, fs.readFileSync(filePath, { encoding: "utf-8" }));
                                script.forceUpload = true;
                                return script;
                            }), nodeDoc.uploadScripts);
                        }
                    }
                }
            }
        });
    }
    readTarball(filePath) {
        // Read the tarball content. The function `t` passes readstreams to the onentry-callback
        // which are piped to a writestream. We push promise-writestreams to the target array, which
        // will resolve once the file was extracted from the tarball
        const tar = require("tar");
        const writeStreamPromises = [];
        tar.t({
            // Pass the path to the tarball
            sync: true,
            file: filePath,
            // onentry passes a readstream as entry
            onentry: (entry) => {
                if (/dist/.test(entry.path)) {
                    var localPath = path.join(os.tmpdir(), path.basename(entry.path));
                    writeStreamPromises.push(new Promise((resolve) => {
                        if (fs.existsSync(localPath)) {
                            fs.unlinkSync(localPath);
                        }
                        entry.pipe(fs.createWriteStream(localPath)
                            .on("close", () => resolve(localPath)));
                    }));
                }
            }
        });
        // returns the path of the extracted files
        return Promise.all(writeStreamPromises);
    }
    exec(command, cwd) {
        return new Promise((resolve, reject) => {
            (0, child_process_1.exec)(command, { cwd }, (err, stdout, stderr) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(stdout.trim());
                }
            });
        });
    }
    isRegistryAvailable() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return new Promise((resolve) => {
                    (0, http_1.get)({
                        host: "registry.otris.de",
                        port: 443,
                        timeout: 3000
                    }, () => {
                        resolve(true);
                    }).on("error", () => resolve(false));
                });
            }
            catch (err) {
                return false;
            }
        });
    }
    isDocumentsToJsonAvailable(connectionInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const scriptNames = yield nodeDoc.serverSession(connectionInfo, [], nodeDoc.getScriptNamesFromServer);
                return scriptNames.indexOf("documents-to-json") > -1;
            }
            catch (err) {
                const msg = (err instanceof Error) ? err.message : "unknown error type";
                if (msg.match(/could not find \[object Object\] on server/)) {
                    return false;
                }
                else {
                    vscode.window.showErrorMessage(msg);
                    throw msg;
                }
            }
        });
    }
    /**
     * Tries to find the local source file by comparing the source code of the passed local file paths
     * with the source code of the remote server file
     * @param filePaths Array of file paths which should be compared to remoteSourceCode
     * @param remoteSourceCode Source code of the remote server file
     */
    tryFindCorrectSourceFile(filePaths, remoteSourceCode) {
        const crypto = require('crypto');
        const remoteSourceFileHash = crypto.createHash('md5').update(remoteSourceCode.join("\n")).digest('hex');
        // loop through each selectable file, read content, create hash and compare it to the remoteSourceFileHash
        let targetFileIndex = -1;
        filePaths.some((path, i) => {
            let fileContent = fs.readFileSync(path).toString().replace(/\r\n/g, "\n");
            if (fileContent.endsWith("\n")) {
                // The remote server file code comes without eol
                fileContent = fileContent.substr(0, fileContent.length - "\n".length);
            }
            const fileHash = crypto.createHash('md5').update(fileContent).digest('hex');
            if (fileHash === remoteSourceFileHash) {
                targetFileIndex = i;
                return true;
            }
        });
        if (targetFileIndex > -1) {
            return filePaths[targetFileIndex];
        }
        else {
            return null;
        }
    }
    debugScript(loginData, scriptName, outputChannel, socket) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield login.ensureLoginInformation(loginData);
                if (!scriptName || scriptName.length === 0) {
                    throw new Error("Debug Script failed");
                }
                const script = new nodeDoc.scriptT(scriptName, "");
                outputChannel.append(`Starting script ${scriptName} for debugging` + os.EOL);
                outputChannel.show();
                // do NOT AWAIT here!! return and add the debugger immediately
                nodeDoc.serverSession(loginData, [script], nodeDoc.debugScript).then(() => {
                    outputChannel.append(script.output + os.EOL);
                    outputChannel.append(`Script finished` + os.EOL);
                    outputChannel.show();
                    ipc.server.emit(socket, "scriptFinished");
                }).catch((e) => {
                    const msg = e.message ? e.message : e;
                    if (msg.toLowerCase().indexOf("timed out") >= 0) {
                        vscode.window.showWarningMessage(`Set "timeout": 86400000 in launch.json to get script output`);
                    }
                    else {
                        vscode.window.showErrorMessage(`Upload and Debug: ${msg}`);
                    }
                });
            }
            catch (e) {
                vscode.window.showErrorMessage(`Upload and Debug failed: ${e instanceof Error ? e.message : "unknown error type"}`);
            }
        });
    }
}
exports.VSCodeExtensionIPC = VSCodeExtensionIPC;
//# sourceMappingURL=ipcServer.js.map