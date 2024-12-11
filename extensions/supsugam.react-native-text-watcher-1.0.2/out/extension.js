"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const ts = __importStar(require("typescript"));
const validator_1 = require("./helpers/validator");
const constants_1 = require("./utils/constants");
const ActionEnum_1 = require("./enum/ActionEnum");
const manageTextComponent_1 = require("./commands/manageTextComponent");
const changeSeverityType_1 = require("./commands/changeSeverityType");
async function activate(context) {
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    const shouldActivate = workspaceFolder && (await isReactNativeProject(workspaceFolder));
    if (!shouldActivate)
        return;
    const diagnosticsCollection = vscode.languages.createDiagnosticCollection(constants_1.extensionId);
    context.subscriptions.push(vscode.workspace.onDidOpenTextDocument((document) => {
        if (document.languageId === 'typescriptreact') {
            (0, validator_1.startValidating)(document, ts.ScriptKind.TSX, diagnosticsCollection);
        }
        if (document.languageId === 'javascriptreact') {
            (0, validator_1.startValidating)(document, ts.ScriptKind.JSX, diagnosticsCollection);
        }
    }), vscode.workspace.onDidChangeTextDocument((event) => {
        if (event.document.languageId === 'typescriptreact') {
            (0, validator_1.startValidating)(event.document, ts.ScriptKind.TSX, diagnosticsCollection);
        }
        if (event.document.languageId === 'javascriptreact') {
            (0, validator_1.startValidating)(event.document, ts.ScriptKind.JSX, diagnosticsCollection);
        }
    }), vscode.workspace.onDidSaveTextDocument((document) => {
        if (document.languageId === 'typescriptreact') {
            (0, validator_1.startValidating)(document, ts.ScriptKind.TSX, diagnosticsCollection);
        }
        if (document.languageId === 'javascriptreact') {
            (0, validator_1.startValidating)(document, ts.ScriptKind.JSX, diagnosticsCollection);
        }
    }), vscode.commands.registerCommand(constants_1.commands.manageCustomTextComponents, async () => {
        try {
            const action = await vscode.window.showQuickPick(Object.values(ActionEnum_1.ActionEnum), { placeHolder: 'Select an action, Add or Remove Components.' });
            if (!action)
                return;
            const success = await (0, manageTextComponent_1.onManageTextComonentAction)(action);
            if (success) {
                for (const document of vscode.workspace.textDocuments) {
                    if (document.languageId === 'typescriptreact') {
                        (0, validator_1.startValidating)(document, ts.ScriptKind.TSX, diagnosticsCollection);
                    }
                    if (document.languageId === 'javascriptreact') {
                        (0, validator_1.startValidating)(document, ts.ScriptKind.JSX, diagnosticsCollection);
                    }
                }
            }
        }
        catch (error) {
            vscode.window.showErrorMessage('Failed to manage custom text components');
        }
    }), vscode.commands.registerCommand(constants_1.commands.changeSeverityType, async () => {
        const severityType = await vscode.window.showQuickPick(constants_1.DiagnosticSeverityAsString, {
            placeHolder: 'Select a New Severity Type',
            title: 'Severity Type for RN Text Warnings',
        });
        if (!severityType)
            return;
        const success = await (0, changeSeverityType_1.changeSeverityType)(severityType);
        if (success) {
            for (const document of vscode.workspace.textDocuments) {
                if (document.languageId === 'typescriptreact') {
                    (0, validator_1.startValidating)(document, ts.ScriptKind.TSX, diagnosticsCollection);
                }
                if (document.languageId === 'javascriptreact') {
                    (0, validator_1.startValidating)(document, ts.ScriptKind.JSX, diagnosticsCollection);
                }
            }
        }
    }), diagnosticsCollection);
}
exports.activate = activate;
async function isReactNativeProject(workspaceFolder) {
    const packageJsonPath = vscode.Uri.file(path.join(workspaceFolder.uri.fsPath, 'package.json'));
    const packageJsonContent = await vscode.workspace.fs.readFile(packageJsonPath);
    const packageJson = JSON.parse(packageJsonContent.toString());
    return !!packageJson.dependencies?.['react-native'];
}
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map