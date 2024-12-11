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
exports.init = exports.ensureFileName = void 0;
const fs = require("fs-extra");
const nodeDoc = require("node-documents-scripting");
const path = require("path");
const vscode = require("vscode");
const helpers = require("./helpers");
const login = require("./login");
const upload = require("./upload");
const XML_ALL_SEPARATE = "<All in separate files>";
const XML_ALL_IN_ONE = "<All in one file>";
const XML_FROM_JSON = "<Get names from JSON>";
class ExportClasses {
    constructor(version) {
        this.exportClassesE = [
            "DlcFileType",
            "PortalScript",
            "Workflow",
            "DistributionList",
            "Documents"
        ];
        this.exportClassesF = [
            "DlcFolder" // only Documents 5.0f
        ];
        this.exportClassesMsg = [
            "helpMessage"
        ];
        if (version >= 8200) {
            this.availableClasses = this.exportClassesE.concat(this.exportClassesF);
        }
        else {
            this.availableClasses = this.exportClassesE;
        }
        this.userNames = this.availableClasses.map(value => this.nameMapping(value));
    }
    nameMapping(exportClass) {
        return ((exportClass === "Documents") ? "Principal" : (exportClass.replace("Dlc", (exportClass === "DlcFile" ? "Doc" : "")) + (exportClass.endsWith("s") ? "" : "s")));
    }
    available(className) {
        if (!className) {
            return false;
        }
        return (this.availableClasses.indexOf(className) >= 0);
    }
    getDocName(userName) {
        if (!userName) {
            return undefined;
        }
        const i = this.userNames.indexOf(userName);
        return this.availableClasses[i];
    }
}
function getXMLExportClass(exportClasses) {
    return __awaiter(this, void 0, void 0, function* () {
        const selectedClass = yield vscode.window.showQuickPick(exportClasses.userNames, { placeHolder: "Select class", ignoreFocusOut: true });
        return Promise.resolve(exportClasses.getDocName(selectedClass));
    });
}
function getServerFileTypeNames(loginData, params = []) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield nodeDoc.serverSession(loginData, params, nodeDoc.getFileTypeNames);
    });
}
function getXMLExportNames(loginData, exportClass) {
    return __awaiter(this, void 0, void 0, function* () {
        let names = [];
        if (exportClass === "DlcFileType") {
            names = yield getServerFileTypeNames(loginData);
        }
        else if (exportClass === "PortalScript") {
            names = yield nodeDoc.serverSession(loginData, [], nodeDoc.getScriptNamesFromServer);
        }
        return Promise.resolve(names);
    });
}
function selectXmlElements(className, names) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            if (className !== "DlcFileType" && className !== "PortalScript") {
                return resolve({ type: XML_ALL_IN_ONE, list: [], label: "" });
            }
            // for filetypes and portalscripts subsets of elements can be selected
            const types = (className === "DlcFileType") ? [XML_ALL_SEPARATE] : [XML_ALL_SEPARATE, XML_ALL_IN_ONE, XML_FROM_JSON];
            const selected = yield vscode.window.showQuickPick(types.concat(names));
            if (!selected) {
                return resolve(undefined);
            }
            if (types.indexOf(selected) < 0) {
                // single element selected
                return resolve({ type: undefined, list: [selected], label: "" });
            }
            const type = selected;
            if (type === XML_ALL_IN_ONE) {
                return resolve({ type, list: [], label: "" });
            }
            if (type === XML_ALL_SEPARATE) {
                return resolve({ type, list: names, label: "" });
            }
            if (type === XML_FROM_JSON) {
                const uri = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.document.uri : undefined;
                let jsonUri;
                if (uri && path.extname(uri.fsPath) === ".json") {
                    jsonUri = uri.fsPath;
                }
                const jsonFile = yield vscode.window.showInputBox({ prompt: "Insert Path to JSON File", ignoreFocusOut: true, value: jsonUri });
                if (!jsonFile) {
                    return resolve(undefined);
                }
                const jsonString = fs.readFileSync(jsonFile, 'utf8');
                const jsonObj = JSON.parse(jsonString);
                const keys = Object.keys(jsonObj);
                if (keys.length === 1) {
                    return resolve({ type, list: jsonObj[keys[0]], label: keys[0] });
                }
                if (keys.length > 1) {
                    const label = (yield vscode.window.showQuickPick(keys)) || "";
                    if (!jsonObj[label] || !(jsonObj[label] instanceof Array)) {
                        vscode.window.showWarningMessage("Expected array in JSON file");
                        return resolve(undefined);
                    }
                    return resolve({ type, list: jsonObj[label], label });
                }
            }
            return resolve(undefined);
        }));
    });
}
/**
 * 4 cases:
 * 1) XML_ALL_IN_ONE: all elements of the class in one file
 * 2) XML_FROM_JSON: subset of elements in one file, elements defined in json file
 * 3) XML_ALL_SEPARATE: all elements of the class, each in a separate file
 * 4) Single element in one file
 *
 * @example xmlExport.filter = "(Name='crmNote'||Name='crmCase')"
 */
function createXMLExportFilter(className, elements) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const filterPrefix = (className === "DlcFileType") ? "Title=" : "Name=";
            if (elements.type === XML_ALL_IN_ONE) {
                const xmlExport = new nodeDoc.xmlExport(className, "", "");
                return resolve(xmlExport);
            }
            else if (elements.type === XML_FROM_JSON) {
                const titles = elements.list.map(name => filterPrefix + `'${name}'`);
                const xmlExport = new nodeDoc.xmlExport(className, "(" + titles.join("||") + ")", elements.label);
                return resolve([xmlExport]);
            }
            else if (elements.type === XML_ALL_SEPARATE) {
                const xmlExports = elements.list.map((name, i) => {
                    return new nodeDoc.xmlExport(className, filterPrefix + `'${elements.list[i]}'`, elements.list[i]);
                });
                return resolve(xmlExports);
            }
            else {
                // only one element, meaning list.length === 1
                const xmlExports = elements.list.map((name, i) => {
                    return new nodeDoc.xmlExport(className, filterPrefix + `'${elements.list[i]}'`, elements.list[i]);
                });
                return resolve(xmlExports);
            }
        }));
    });
}
function receiveFiles(loginData, files) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            if (files.length === 0 && (files.length % 2) !== 0) {
                return reject();
            }
            yield nodeDoc.serverSession(loginData, files, nodeDoc.receiveFiles);
            return resolve();
        }));
    });
}
function exportXMLReceiveFiles(loginData, xmlExports, exportDir) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            if (xmlExports.length === 0) {
                return reject('Export XML failed: incorrect input');
            }
            try {
                yield login.ensureLoginInformation(loginData);
                yield nodeDoc.serverSession(loginData, xmlExports, nodeDoc.exportXML);
                fs.ensureDirSync(exportDir);
                // got content (= xml) and files (= e.g. documents in filetype)
                let files = [];
                for (const item of xmlExports) {
                    if (item.content) {
                        if (item.content.startsWith("Available export classes:")) {
                            throw new Error(`export class ${item.className} not available`);
                        }
                        fs.writeFileSync(path.join(exportDir, item.fileName + ".xml"), item.content);
                    }
                    if (item.className === "DlcFileType" && item.files) {
                        // tslint:disable-next-line: prefer-for-of
                        for (let i = 0; i < item.files.length; i += 2) {
                            const fileName = path.join(item.fileName, path.basename(item.files[i]));
                            item.files[i] = path.join(exportDir, fileName);
                        }
                        files = files.concat(item.files);
                    }
                }
                if (files.length > 0) {
                    yield receiveFiles(loginData, files);
                }
                resolve();
            }
            catch (err) {
                const msg = err instanceof Error ? err.message : err;
                return reject(`Export XML failed: ${msg}`);
            }
        }));
    });
}
function uploadExportXML(loginData, statusBarItem) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            if (!vscode.window.activeTextEditor) {
                vscode.window.showErrorMessage("Upload and export XML failed: active script required");
                return resolve();
            }
            const uri = vscode.window.activeTextEditor.document.uri;
            const extName = path.extname(uri.fsPath);
            if (extName !== ".js" && extName !== ".ts") {
                vscode.window.showErrorMessage("Upload and export XML failed: active script must be javascript or typescript");
                return resolve();
            }
            const workspaceFolder = vscode.workspace.getWorkspaceFolder(uri);
            if (!workspaceFolder) {
                vscode.window.showErrorMessage("Upload and export XML failed: active script must be in workspace");
                return resolve();
            }
            const jsName = path.basename(uri.fsPath, extName);
            yield upload.uploadActiveScript(loginData, vscode.window.activeTextEditor.document, statusBarItem);
            const exp = new nodeDoc.xmlExport("PortalScript", "Name=" + `'${jsName}'`, jsName);
            try {
                const exportDir = yield helpers.ensureDirName(undefined, true, path.join(workspaceFolder.uri.fsPath, "portalScript.xml"), "Enter folder (use .xml in folder name)");
                helpers.updateStatusBar(statusBarItem, `Export XML: ${exp.fileName}`, 1);
                yield exportXMLReceiveFiles(loginData, [exp], exportDir);
                helpers.updateStatusBar(statusBarItem, `Export XML: ${exp.fileName}`, 2);
            }
            catch (err) {
                helpers.updateStatusBar(statusBarItem, `Export XML: failed`, 3);
                vscode.window.showErrorMessage(err instanceof Error ? err.message : "unknown error type");
            }
            return resolve();
        }));
    });
}
function getServerVersion(loginData) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield login.ensureLoginInformation(loginData);
            // version is set on login, no function call required
            yield nodeDoc.serverSession(loginData, []);
            if (!loginData.documentsVersion || loginData.documentsVersion.length === 0) {
                return reject('Get Version failed');
            }
        }
        catch (err) {
            return reject(err);
        }
        return resolve();
    }));
}
function ensureFileName(menuFile, suggested = "", text) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            // check menu file
            if (menuFile && menuFile.length > 0) {
                try {
                    if (fs.statSync(menuFile).isFile()) {
                        return resolve(menuFile);
                    }
                }
                catch (err) {
                    // if menuFile is invalid, ask user
                }
            }
            // set suggested path
            if (!suggested || suggested.length === 0) {
                // use invalid menuFile for suggestion
                if (menuFile && menuFile.length > 0) {
                    suggested = menuFile;
                }
                const editor = vscode.window.activeTextEditor;
                if (editor) {
                    const wsEditor = vscode.workspace.getWorkspaceFolder(editor.document.uri);
                    if (wsEditor) {
                        suggested = editor.document.fileName;
                    }
                }
            }
            // ask user
            const input = yield vscode.window.showInputBox({ prompt: text ? text : "Enter file path", value: suggested, ignoreFocusOut: true });
            // check user-input
            if (input === undefined || input === "") {
                return reject();
            }
            if (!path.isAbsolute(input)) {
                return reject("Input path must be absolute");
            }
            if (!vscode.workspace.getWorkspaceFolder(vscode.Uri.file(input))) {
                return reject("Input path is not in workspace");
            }
            // ensure dir
            try {
                fs.ensureDirSync(path.dirname(input));
                return resolve(input);
            }
            catch (err) {
                return reject(err);
            }
        }));
    });
}
exports.ensureFileName = ensureFileName;
function exportXML(loginData, menuDir, statusBarItem) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!vscode.workspace.workspaceFolders || !vscode.workspace.workspaceFolders[0]) {
                    throw new Error("Export XML failed: workspace folder required");
                }
                const workspaceFolder = vscode.workspace.workspaceFolders[0].uri.fsPath;
                yield getServerVersion(loginData);
                const docVer = Number(loginData.documentsVersion);
                if (!docVer || isNaN(docVer) || docVer < 0) {
                    vscode.window.showErrorMessage("Cannot determine Documents version");
                    return resolve();
                }
                const docClasses = new ExportClasses(docVer);
                // ask user for class (e.g. DlcFileType, PortalScript)
                const exportClass = yield getXMLExportClass(docClasses);
                if (!exportClass || !docClasses.available(exportClass)) {
                    return resolve();
                }
                // get elements for selected class from server
                const names = yield getXMLExportNames(loginData, exportClass);
                if (!names) {
                    return resolve();
                }
                // the user can select subsets from the list of elements
                const elements = yield selectXmlElements(exportClass, names);
                if (!elements) {
                    return resolve();
                }
                // create filter for selected elements
                const exp = yield createXMLExportFilter(exportClass, elements);
                if (!exp) {
                    return resolve();
                }
                // define output file/folder names and then call the export...
                const templateName = docClasses.nameMapping(exportClass);
                const suggestedDir = menuDir ? menuDir : path.join(workspaceFolder, templateName.replace(/^\w/, c => c.toLowerCase()) + ".xml");
                // case 1: >= 1 files, filenames are fix, user may have to choose the folder
                if (Array.isArray(exp)) {
                    const exportDir = menuDir ? menuDir : yield helpers.ensureDirName(undefined, true, suggestedDir, "Enter folder (use .xml in folder name)");
                    helpers.updateStatusBar(statusBarItem, `Export XML: ${exportClass}`, 1);
                    yield exportXMLReceiveFiles(loginData, exp, exportDir);
                    helpers.updateStatusBar(statusBarItem, `Export XML: ${exportClass}`, 2);
                    return resolve();
                }
                // case 2: 1 file, user has to choose the filename
                if (exp instanceof nodeDoc.xmlExport) {
                    const suggestedBasename = (exp.fileName.length > 0) ? exp.fileName : ((exportClass === "Documents") ? loginData.principal : ("all" + templateName));
                    const exportPath = yield ensureFileName(undefined, path.join(suggestedDir, suggestedBasename + ".xml"), "Enter file (use .xml in folder name)");
                    exp.fileName = path.basename(exportPath, ".xml");
                    const exportDir = path.dirname(exportPath);
                    helpers.updateStatusBar(statusBarItem, `Export XML: ${exp.fileName}`, 1);
                    yield exportXMLReceiveFiles(loginData, [exp], exportDir);
                    helpers.updateStatusBar(statusBarItem, `Export XML: ${exp.fileName}`, 2);
                    return resolve();
                }
            }
            catch (err) {
                helpers.updateStatusBar(statusBarItem, `Export XML: failed`, 3);
                vscode.window.showErrorMessage(err instanceof Error ? err.message : "unknown error type");
            }
            return resolve();
        }));
    });
}
function importXMLUpdateDocuments(loginData, xmlFile) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let sdsConnection;
            try {
                if (!path.isAbsolute(xmlFile)) {
                    throw new Error(`xml file path must be absolute`);
                }
                sdsConnection = yield nodeDoc.connectLogin(undefined, loginData);
                // import filetype
                const xmlContent = fs.readFileSync(xmlFile, "utf8");
                const output = yield nodeDoc.importXML(sdsConnection, [xmlContent]);
                if (output[1].length > 0) {
                    throw new Error(output[1]);
                }
                // import documents
                const files = output.slice(2).map(v => {
                    if (path.dirname(v) !== ".") {
                        return path.join(path.dirname(xmlFile), path.basename(xmlFile, ".xml"), path.basename(v));
                    }
                    else {
                        return v;
                    }
                });
                yield nodeDoc.updateDocuments(sdsConnection, files);
                return resolve();
            }
            catch (err) {
                return reject(`Import XML failed: ${err}`);
            }
            finally {
                nodeDoc.disconnect(sdsConnection);
            }
        }));
    });
}
function importXML(loginData, xmlFile, statusBarItem) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!vscode.workspace.workspaceFolders || !vscode.workspace.workspaceFolders[0]) {
                    throw new Error("Import XML failed: workspace folder required");
                }
                const workspaceFolder = vscode.workspace.workspaceFolders[0].uri.fsPath;
                xmlFile = yield ensureFileName(xmlFile, path.join(workspaceFolder, "<someXmlExport.xml>"));
                helpers.updateStatusBar(statusBarItem, `Import XML: ${path.basename(xmlFile)}`, 1);
                yield importXMLUpdateDocuments(loginData, xmlFile);
                helpers.updateStatusBar(statusBarItem, `Import XML: ${path.basename(xmlFile)}`, 2);
            }
            catch (err) {
                helpers.updateStatusBar(statusBarItem, `Import XML: failed`, 3);
                vscode.window.showErrorMessage(err instanceof Error ? err.message : "unknown error type");
            }
            return resolve();
        }));
    });
}
function init(context, loginData, statusBarItem) {
    context.subscriptions.push(vscode.commands.registerCommand('extension.vscode-janus-debug.importXML', (param) => __awaiter(this, void 0, void 0, function* () {
        yield importXML(loginData, helpers.fsPath(param), statusBarItem);
    })));
    context.subscriptions.push(vscode.commands.registerCommand('extension.vscode-janus-debug.exportXML', (param) => __awaiter(this, void 0, void 0, function* () {
        yield exportXML(loginData, helpers.fsPath(param, true), statusBarItem);
    })));
    context.subscriptions.push(vscode.commands.registerCommand('extension.vscode-janus-debug.uploadExportXML', (param) => __awaiter(this, void 0, void 0, function* () {
        yield uploadExportXML(loginData, statusBarItem);
    })));
}
exports.init = init;
//# sourceMappingURL=xmlExport.js.map