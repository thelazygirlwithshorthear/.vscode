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
exports.viewDocumentation = void 0;
const path = require("path");
const vscode = require("vscode");
// tslint:disable-next-line:no-var-requires
const open = require('opn');
// tslint:disable-next-line:no-var-requires
const fs = require('fs-extra');
// tslint:disable-next-line:no-var-requires
const mapping = require('../portalscript/documentation/methodMapping').mapping;
const availableBrowsers = [
    "iexplore",
    "mozilla",
    "chrome",
    "safari",
    "firefox"
];
function viewDocumentation() {
    return __awaiter(this, void 0, void 0, function* () {
        const thisExtension = vscode.extensions.getExtension("otris-software.vscode-janus-debug");
        if (thisExtension === undefined) {
            return;
        }
        const extensionPath = thisExtension.extensionPath;
        const portalScriptDocs = path.join(extensionPath, 'portalscript', 'documentation', 'portalscript-api.html');
        const activeFile = vscode.window.activeTextEditor;
        const config = vscode.workspace.getConfiguration('vscode-janus-debug');
        let browser = config.get('browser', '');
        if (browser.length > 0 && 0 > availableBrowsers.indexOf(browser)) {
            vscode.window.showWarningMessage(`The browser ${browser} is not yet supported!`);
            browser = undefined;
        }
        if (portalScriptDocs && activeFile) {
            let file = '';
            const doc = activeFile.document;
            const pos = activeFile.selection.active;
            if (doc && pos) {
                const range = doc.getWordRangeAtPosition(pos);
                if (range) {
                    const selectedWord = doc.getText(range);
                    const selectedWordL = selectedWord.toLocaleLowerCase();
                    const moduleName = (mapping['class-names'].indexOf('module:' + selectedWordL) >= 0) ? 'module:' + selectedWordL : '';
                    const namespaceName = (mapping['class-names'].indexOf(selectedWordL) >= 0) ? 'module:' + selectedWordL : '';
                    const className = (mapping['class-names'].indexOf(selectedWord) >= 0) ? selectedWord : '';
                    const functionOrMember = mapping[selectedWord];
                    // function or member selected?
                    if (functionOrMember && functionOrMember.length > 0) {
                        if (!browser) {
                            vscode.window.showWarningMessage(`Jump to **${selectedWordL}**: specify a browser in **vscode-janus-debug.browser**`);
                        }
                        if (functionOrMember.length === 1) {
                            const classNameHtml = functionOrMember[0].replace(':', '-') + '.html';
                            file = portalScriptDocs + '#' + classNameHtml + '&' + selectedWord;
                        }
                        else {
                            const question = `Found ${selectedWord} in several classes, select one class please!`;
                            let result = yield vscode.window.showQuickPick(functionOrMember, { placeHolder: question });
                            if (result) {
                                result = result.replace(':', '-') + '.html';
                                file = portalScriptDocs + '#' + result + '&' + selectedWord;
                            }
                        }
                        // module selected?
                    }
                    else if (moduleName.length > 0) {
                        const moduleNameHtml = moduleName.replace(':', '-') + '.html';
                        file = portalScriptDocs + '#' + moduleNameHtml;
                        // class or interface selected?
                    }
                    else if (className.length > 0) {
                        const classNameHtml = className + '.html';
                        file = portalScriptDocs + '#' + classNameHtml;
                        // namespace selected?
                    }
                    else if (namespaceName.length > 0) {
                        const namespaceNameHtml = namespaceName + '.html';
                        file = portalScriptDocs + '#' + namespaceNameHtml;
                    }
                }
            }
            // no portal script member selected, open main documentation
            if (!file || file.length === 0) {
                file = portalScriptDocs;
            }
            if (file) {
                open(`file:///${file}`, { app: browser });
            }
        }
    });
}
exports.viewDocumentation = viewDocumentation;
//# sourceMappingURL=documentation.js.map