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
exports.deactivate = exports.activate = exports.JanusDebugConfigurationProvider = void 0;
const nodeDoc = require("node-documents-scripting");
const path = require("path");
const vscode = require("vscode");
const documentation = require("./documentation");
const download = require("./download");
const helpers = require("./helpers");
const intellisense = require("./intellisense");
const ipcServer_1 = require("./ipcServer");
const launchConfigurations_1 = require("./launchConfigurations");
const login = require("./login");
const serverConsole_1 = require("./serverConsole");
const xmlExport = require("./xmlExport");
const stripJsonComments = require("strip-json-comments");
const upload = require("./upload");
const wizard = require("./wizard");
const janusV8Connection_1 = require("./janusV8Connection");
// tslint:disable-next-line:no-var-requires
const fs = require('fs-extra');
let ipcServer;
let launchJsonWatcher;
let serverConsole;
let scriptChannel;
let disposableOnSave;
/** settings.json: vscode-janus-debug.serverConsole.autoConnect */
let autoConnectServerConsole;
let onSaveBusy = 0;
function initLaunchJsonWatcher(outputChannel, loginData) {
    if (!vscode.workspace.workspaceFolders)
        return;
    // maybe vscode.workspace.onDidChangeConfiguration() is better?
    const pattern = new vscode.RelativePattern(vscode.workspace.workspaceFolders[0], '**/launch.json');
    launchJsonWatcher = vscode.workspace.createFileSystemWatcher(pattern, false, false, false);
    launchJsonWatcher.onDidCreate((file) => {
        if (autoConnectServerConsole && serverConsole) {
            outputChannel.appendLine('launch.json created; trying to connect...');
            (0, serverConsole_1.reconnectServerConsole)(serverConsole);
        }
        // const wsFolder = vscode.workspace.getWorkspaceFolder(file);
        // if (wsFolder && wsFolder.index === 0)
        //     login.loadLoginInformationOnCreate(loginData, file.fsPath);
    });
    launchJsonWatcher.onDidChange((file) => {
        if (autoConnectServerConsole && serverConsole) {
            outputChannel.appendLine('launch.json changed; trying to (re)connect...');
            (0, serverConsole_1.reconnectServerConsole)(serverConsole);
        }
        const wsFolder = vscode.workspace.getWorkspaceFolder(file);
        if (wsFolder && wsFolder.index === 0) {
            // nur noch die aufrufen, onDidChange wird immer auch nach dem Erstellen der Datei aufgerufen
            // loadLoginInformationOnCreate() fängt ab, wenn die Extension die Datei erstellt hat
            login.loadLoginInformationOnCreate(loginData, file.fsPath);
        }
    });
    launchJsonWatcher.onDidDelete((file) => {
        // this function is only called, if launch.json is deleted directly,
        // if the whole folder .vscode is deleted, this function is not called!
        if (autoConnectServerConsole && serverConsole) {
            (0, serverConsole_1.disconnectServerConsole)(serverConsole);
        }
        const wsFolder = vscode.workspace.getWorkspaceFolder(file);
        if (wsFolder && wsFolder.index === 0)
            loginData.resetLoginData();
    });
}
class JanusDebugConfigurationProvider {
    /**
     * Message a debug configuration just before a debug session is being launched,
     * e.g. add all missing attributes to the debug configuration.
     */
    resolveDebugConfiguration(folder, config, token) {
        // if launch.json is missing or empty allow quick access to
        // debugging by providing this config
        if (!config.type && !config.request && !config.name) {
            const editor = vscode.window.activeTextEditor;
            if (editor && editor.document.languageId === 'javascript') {
                config.type = 'janus';
                config.name = 'Launch Script on Server';
                config.request = 'launch';
                config.script = '${file}';
                config.stopOnEntry = true;
            }
        }
        config.processId = process.pid;
        if (vscode.workspace.workspaceFolders)
            config.workspace = vscode.workspace.workspaceFolders[0].uri.fsPath;
        return config;
    }
    /**
     * Returns initial debug configurations.
     */
    provideDebugConfigurations(folder, token) {
        return launchConfigurations_1.launchConfigurations.getInitial();
    }
}
exports.JanusDebugConfigurationProvider = JanusDebugConfigurationProvider;
function activate(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const vscodeDos = vscode.extensions.getExtension("otris-software.vscode-documentsos");
        if (vscodeDos === null || vscodeDos === void 0 ? void 0 : vscodeDos.isActive) {
            vscode.window.showErrorMessage("Both extensions vscode-janus-debug and vscode-documentsos are active. You should disable one of them.");
        }
        if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length) {
            let workspaceFolder = vscode.workspace.workspaceFolders[0];
            const vscodeDosFile = path.join(workspaceFolder.uri.fsPath, ".vscode-documentsos");
            if (fs.existsSync(vscodeDosFile))
                vscode.window.showErrorMessage("If you want to work with vscode-janus-debug in this workspace, you should delete the file '.vscode-documentsos'");
        }
        let conf = vscode.workspace.getConfiguration('vscode-janus-debug');
        const statusBarItem = vscode.window.createStatusBarItem();
        // statusBarItem.color = "orange";
        statusBarItem.text = "DOCUMENTS";
        statusBarItem.command = "extension.vscode-janus-debug.changeStatusColor";
        context.subscriptions.push(statusBarItem);
        // set extension path
        // get location fo the extensions source folder
        const thisExtension = vscode.extensions.getExtension("otris-software.vscode-janus-debug");
        // Get login data
        const loginData = new nodeDoc.ConnectionInformation();
        context.subscriptions.push(loginData);
        if (vscode.workspace && vscode.workspace.workspaceFolders)
            login.loadLoginInformation(loginData, path.join(vscode.workspace.workspaceFolders[0].uri.fsPath, '.vscode', 'launch.json'));
        // output channel for server console not global because serverConsole is global
        const serverChannel = vscode.window.createOutputChannel('Server Console');
        serverChannel.appendLine('Extension activated');
        scriptChannel = vscode.window.createOutputChannel('Script Console');
        serverConsole = new serverConsole_1.ServerConsole(serverChannel);
        autoConnectServerConsole = conf.get('serverConsole.autoConnect', false);
        if (autoConnectServerConsole)
            (0, serverConsole_1.reconnectServerConsole)(serverConsole);
        initLaunchJsonWatcher(serverChannel, loginData);
        ipcServer = new ipcServer_1.VSCodeExtensionIPC(loginData, scriptChannel);
        // Register configuration provider
        context.subscriptions.push(vscode.debug.registerDebugConfigurationProvider('janus', new JanusDebugConfigurationProvider()));
        // Register commands
        context.subscriptions.push(vscode.commands.registerCommand("extension.vscode-janus-debug.changeStatusColor", () => __awaiter(this, void 0, void 0, function* () {
            const fg = yield vscode.window.showInputBox({ title: "Foreground Color", value: "orange", placeHolder: "orange" });
            statusBarItem.color = fg;
        })));
        // this command is used for the default password entry in launch.json
        context.subscriptions.push(vscode.commands.registerCommand('extension.vscode-janus-debug.askForPassword', () => {
            return vscode.window.showInputBox({ prompt: 'Please enter the password', password: true, ignoreFocusOut: true });
        }));
        // Upload active script
        context.subscriptions.push(vscode.commands.registerCommand('extension.vscode-janus-debug.uploadScript', (clickedUri, selectedUris) => __awaiter(this, void 0, void 0, function* () {
            try {
                const editor = vscode.window.activeTextEditor;
                let active;
                if (editor) {
                    if (editor.document.languageId === "javascript" || editor.document.languageId === "typescript") {
                        active = editor.document;
                        yield upload.uploadActiveScript(loginData, active, statusBarItem);
                        helpers.showWarning(loginData);
                    }
                    else {
                        vscode.window.showErrorMessage(`Upload Active Script: Unsupported language: ${editor.document.languageId}.\nSupport languages: javascript, typescript.`);
                    }
                }
                else {
                    vscode.window.showErrorMessage("Upload Active Script: Please open a script in the editor");
                }
            }
            catch (err) {
                vscode.window.showErrorMessage(`Upload Active Script failed: ${err instanceof Error ? err.message : err}`);
            }
        })));
        // Upload script
        context.subscriptions.push(vscode.commands.registerCommand('extension.vscode-janus-debug.uploadSelectedScripts', (clickedUri, selectedUris) => __awaiter(this, void 0, void 0, function* () {
            // selectedUris is undefined when called via editor menu
            // if selectedUri is set, clickedUri is element of selectedUri
            yield upload.uploadScript(loginData, (selectedUris ? selectedUris : (clickedUri ? [clickedUri] : undefined)), statusBarItem);
            helpers.showWarning(loginData);
        })));
        // Upload scripts from folder
        context.subscriptions.push(vscode.commands.registerCommand('extension.vscode-janus-debug.uploadScriptsFromFolder', (clickedUri, selectedUris) => __awaiter(this, void 0, void 0, function* () {
            // selectedUris is undefined when called via editor menu => not possible here
            // clickedUri is element of selectedUri
            yield upload.uploadScriptsFromFolder(loginData, selectedUris, statusBarItem);
            helpers.showWarning(loginData);
        })));
        // Download script
        context.subscriptions.push(vscode.commands.registerCommand('extension.vscode-janus-debug.downloadScript', (param) => __awaiter(this, void 0, void 0, function* () {
            const pc = helpers.getPathContext(param, false);
            try {
                const name = yield download.downloadScript(loginData, (pc ? pc.fsPath : undefined));
                helpers.updateStatusBar(statusBarItem, `${name} $(arrow-down)`, 2);
            }
            catch (err) {
                if (err) {
                    helpers.updateStatusBar(statusBarItem, `downloading script failed`, 3);
                    vscode.window.showErrorMessage("Download Script: " + (err instanceof Error ? err.message : err));
                }
                else {
                    helpers.updateStatusBar(statusBarItem, "");
                }
            }
            helpers.showWarning(loginData);
        })));
        // Download all scripts from server
        context.subscriptions.push(vscode.commands.registerCommand('extension.vscode-janus-debug.downloadAllScripts', (param) => __awaiter(this, void 0, void 0, function* () {
            const pc = helpers.getPathContext(param, false);
            try {
                helpers.updateStatusBar(statusBarItem, `downloading scripts`, 1);
                const num = yield download.downloadAllSelected(loginData, (pc ? pc.fsPath : undefined));
                helpers.updateStatusBar(statusBarItem, `downloaded ${num} scripts`, 2);
            }
            catch (err) {
                helpers.updateStatusBar(statusBarItem, `downloading scripts failed`, 3);
                vscode.window.showErrorMessage("Download Multiple Scripts: " + (err instanceof Error ? err.message : err));
            }
            helpers.showWarning(loginData);
        })));
        // Download all scripts that are inside the folder
        context.subscriptions.push(vscode.commands.registerCommand('extension.vscode-janus-debug.reloadScripts', (param) => __awaiter(this, void 0, void 0, function* () {
            const pc = helpers.getPathContext(param, false);
            try {
                helpers.updateStatusBar(statusBarItem, `re-downloading scripts in folder`, 1);
                const result = yield download.reloadScripts(loginData, (pc ? pc.fsPath : undefined));
                helpers.updateStatusBar(statusBarItem, `re-downloaded ${result.num} scripts in ${result.folder}`, 2);
            }
            catch (err) {
                helpers.updateStatusBar(statusBarItem, `re-downloading scripts in folder failed`, 3);
                vscode.window.showErrorMessage("Re-Download Scripts In Folder: " + (err instanceof Error ? err.message : err));
            }
            helpers.showWarning(loginData);
        })));
        // Run script
        context.subscriptions.push(vscode.commands.registerCommand('extension.vscode-janus-debug.runScript', (param) => __awaiter(this, void 0, void 0, function* () {
            const pc = helpers.getPathContext(param, true);
            try {
                helpers.updateStatusBar(statusBarItem, `starting script at ${helpers.getTime()}`, 1);
                yield upload.runScript(loginData, (pc ? pc.fsPath : undefined), scriptChannel);
                helpers.updateStatusBar(statusBarItem, `finished script at ${helpers.getTime()}`, 2);
            }
            catch (err) {
                helpers.updateStatusBar(statusBarItem, `executing script failed`, 3);
            }
            helpers.showWarning(loginData);
        })));
        // Upload and Debug script
        context.subscriptions.push(vscode.commands.registerCommand('extension.vscode-janus-debug.debugScript', () => __awaiter(this, void 0, void 0, function* () {
            const editor = vscode.window.activeTextEditor;
            let active;
            if (!editor || (editor.document.languageId !== "javascript" && editor.document.languageId !== "typescript")) {
                vscode.window.showErrorMessage("Upload and Debug: Please open the script in editor");
                return;
            }
            active = editor.document;
            try {
                let folder;
                if (!vscode.workspace.workspaceFolders) {
                    vscode.window.showErrorMessage("Upload and Debug: Workspace Folder missing");
                    return;
                }
                folder = vscode.workspace.workspaceFolders[0];
                let config;
                const jsonContent = fs.readFileSync(loginData.configFile, 'utf8');
                const jsonObject = JSON.parse(stripJsonComments(jsonContent));
                const configurations = jsonObject.configurations;
                // VS Code API doesn't work here:
                // vscode.workspace.getConfiguration('launch').configurations.forEach((element: vscode.DebugConfiguration) => {
                configurations.forEach((element) => {
                    if (element.type === 'janus' && element.request === 'launch') {
                        config = element;
                        config.portal = true;
                        config.script = active.fileName;
                    }
                });
                if (!config) {
                    vscode.window.showErrorMessage("Upload and Debug: No suitable configuration found. Please add one in launch.json");
                    return;
                }
                const scriptPath = yield upload.uploadActiveScript(loginData, active, statusBarItem, true);
                if (scriptPath) {
                    yield vscode.debug.startDebugging(folder, config);
                }
                else {
                    vscode.window.showErrorMessage("Upload and Debug: Uploading script failed");
                }
            }
            catch (err) {
                //
            }
            helpers.showWarning(loginData);
        })));
        // Upload and Run script
        context.subscriptions.push(vscode.commands.registerCommand('extension.vscode-janus-debug.uploadRunScript', (clickedUri) => __awaiter(this, void 0, void 0, function* () {
            const scriptPath = yield upload.uploadScript(loginData, (clickedUri ? [clickedUri] : undefined), statusBarItem);
            if (scriptPath) {
                try {
                    yield upload.runScript(loginData, scriptPath, scriptChannel);
                    helpers.updateStatusBar(statusBarItem, `finished script at ${helpers.getTime()}`, 2);
                }
                catch (err) {
                    helpers.updateStatusBar(statusBarItem, `uploading/executing script failed`, 3);
                }
            }
            helpers.showWarning(loginData);
        })));
        // Upload and Run active script
        context.subscriptions.push(vscode.commands.registerCommand('extension.vscode-janus-debug.uploadRunActiveScript', () => __awaiter(this, void 0, void 0, function* () {
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                if (editor.document.languageId === "javascript" || editor.document.languageId === "typescript") {
                    const scriptPath = yield upload.uploadActiveScript(loginData, (editor.document), statusBarItem);
                    if (scriptPath) {
                        try {
                            yield upload.runScript(loginData, scriptPath, scriptChannel);
                            helpers.updateStatusBar(statusBarItem, `finished script at ${helpers.getTime()}`, 2);
                        }
                        catch (err) {
                            helpers.updateStatusBar(statusBarItem, `uploading/executing script failed`, 3);
                        }
                    }
                    helpers.showWarning(loginData);
                }
            }
        })));
        // Compare script
        context.subscriptions.push(vscode.commands.registerCommand('extension.vscode-janus-debug.compareScript', (param) => __awaiter(this, void 0, void 0, function* () {
            const pc = helpers.getPathContext(param, true);
            try {
                yield download.compareScript(loginData, (pc ? pc.fsPath : undefined));
            }
            catch (err) {
                //
            }
            helpers.showWarning(loginData);
        })));
        // Types / Intellisense
        if (thisExtension) {
            intellisense.registerCommands(context, loginData, statusBarItem, thisExtension.extensionPath);
        }
        // wizard: download project
        context.subscriptions.push(vscode.commands.registerCommand('extension.vscode-janus-debug.wizardDownloadProject', (param) => __awaiter(this, void 0, void 0, function* () {
            if (!thisExtension) {
                vscode.window.showErrorMessage("Unfortunately an unexpected error occurred...");
                return;
            }
            yield wizard.downloadCreateProject(loginData, param, thisExtension.extensionPath);
        })));
        // View documentation
        context.subscriptions.push(vscode.commands.registerCommand('extension.vscode-janus-debug.viewDocumentation', (file) => {
            // file is not used, use active editor...
            documentation.viewDocumentation();
        }));
        // Show server file
        context.subscriptions.push(vscode.commands.registerCommand('extension.vscode-janus-debug.showImportBundle', (param) => __awaiter(this, void 0, void 0, function* () {
            const pc = helpers.getPathContext(param, true);
            try {
                yield download.showImportBundle(loginData, (pc ? pc.fsPath : undefined));
            }
            catch (err) {
                //
            }
            helpers.showWarning(loginData);
        })));
        // Import/Export XML functions
        xmlExport.init(context, loginData, statusBarItem);
        context.subscriptions.push(vscode.commands.registerCommand('extension.vscode-janus-debug.maintenanceOperation', (param) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield login.ensureLoginInformation(loginData);
                const operation = yield vscode.window.showInputBox();
                if (!operation)
                    return;
                const result = yield nodeDoc.serverSession(loginData, [operation], nodeDoc.doMaintenance);
                if (result[0] && result[0].length > 0)
                    yield vscode.window.showInformationMessage(result[0], { modal: true });
            }
            catch (err) {
                vscode.window.showErrorMessage(err instanceof Error ? err.message : "Error of unknown type: " + err);
            }
        })));
        context.subscriptions.push(vscode.commands.registerCommand('extension.vscode-janus-debug.clearPortalScriptCache', () => __awaiter(this, void 0, void 0, function* () {
            yield login.ensureLoginInformation(loginData);
            yield nodeDoc.serverSession(loginData, [], nodeDoc.clearPortalScriptCache);
        })));
        context.subscriptions.push(vscode.commands.registerCommand('extension.vscode-janus-debug.wsAddressToLaunchConfig', () => __awaiter(this, void 0, void 0, function* () {
            try {
                const janusV8Conn = new janusV8Connection_1.JanusV8Connection();
                yield janusV8Conn.wsAddressToLaunchConfig();
            }
            catch (err) {
                vscode.window.showErrorMessage(err instanceof Error ? err.message : "Error of unknown type: " + err);
            }
        })));
        // connect the sever console manually
        context.subscriptions.push(vscode.commands.registerCommand('extension.vscode-janus.debug.connectServerConsole', (param) => {
            (0, serverConsole_1.reconnectServerConsole)(serverConsole);
        }));
        // disconnect the server console manually
        context.subscriptions.push(vscode.commands.registerCommand('extension.vscode-janus.debug.disconnectServerConsole', (param) => {
            (0, serverConsole_1.disconnectServerConsole)(serverConsole);
        }));
        // Upload script on save
        const autoUploadEnabled = conf.get('uploadOnSaveGlobal', true);
        if (autoUploadEnabled) {
            disposableOnSave = vscode.workspace.onDidSaveTextDocument((textDocument) => __awaiter(this, void 0, void 0, function* () {
                // in case the user called "Save All"
                while (onSaveBusy)
                    yield helpers.sleep(500);
                onSaveBusy = 1;
                const extName = path.extname(textDocument.fileName);
                if (extName.match(/\.m?js$/) === null && extName !== '.ts')
                    return;
                // configuration must be reloaded
                conf = vscode.workspace.getConfiguration('vscode-janus-debug');
                const subfolder = path.dirname(textDocument.fileName).split(path.sep).filter(Boolean).pop();
                const answer = yield upload.ensureUploadOnSave(conf, path.basename(textDocument.fileName, extName), subfolder);
                if (upload.autoUpload.yes === answer) {
                    yield upload.uploadActiveScript(loginData, textDocument, statusBarItem);
                }
                else if (upload.autoUpload.neverAsk === answer) {
                    if (disposableOnSave) {
                        disposableOnSave.dispose();
                    }
                }
                onSaveBusy = 0;
            }));
            context.subscriptions.push(disposableOnSave);
        }
        // create activation file if it does not exist
        if (vscode.workspace.workspaceFolders) {
            const activationFile = path.join(vscode.workspace.workspaceFolders[0].uri.fsPath, helpers.CACHE_FILE);
            try {
                fs.readFileSync(activationFile);
            }
            catch (err) {
                if (err && typeof err === "object" && err["code"] === "ENOENT")
                    fs.writeFileSync(activationFile, "");
            }
        }
        statusBarItem.show();
        if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0) {
            // Check if typescript is used. If so, the extension needs to know which tsconfig.json should be used to transpile on upload
            // (if multiple exists). And some other settings
            const workspaceFolder = vscode.workspace.workspaceFolders[0];
            const workspaceSettings = vscode.workspace.getConfiguration("vscode-janus-debug");
            const tsconfigFiles = yield vscode.workspace.findFiles("tsconfig*.json");
            if (tsconfigFiles.length > 1) {
                const tsconfigPaths = tsconfigFiles.map(u => path.relative(workspaceFolder.uri.fsPath, u.fsPath));
                const selectedTSConfigPath = workspaceSettings.get("tsconfigPath");
                if (!selectedTSConfigPath || tsconfigPaths.indexOf(selectedTSConfigPath) === -1) {
                    const choices = ["Select tsconfig", "Dismiss"];
                    const result = yield vscode.window.showInformationMessage("It seems like you use typescript. The extension can automatically transpile typescript files on upload. For that, we need to know which tsconfig file we should use. Please choose the correct tsconfig file.", ...choices);
                    if (result === choices[0]) {
                        const result = yield vscode.window.showQuickPick(tsconfigPaths, {
                            placeHolder: "Please select a tsconfig file:",
                            ignoreFocusOut: true
                        });
                        if (result) {
                            yield workspaceSettings.update("tsconfigPath", result);
                        }
                    }
                }
            }
        }
    });
}
exports.activate = activate;
function deactivate() {
    ipcServer.dispose();
    launchJsonWatcher.dispose();
    serverConsole.hide();
    serverConsole.dispose();
    scriptChannel.hide();
    scriptChannel.dispose();
    return;
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map