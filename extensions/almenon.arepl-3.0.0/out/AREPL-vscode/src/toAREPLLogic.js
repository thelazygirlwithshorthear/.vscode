"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToAREPLLogic = void 0;
const settings_1 = require("./settings");
/**
 * formats text for passing into AREPL backend
 */
class ToAREPLLogic {
    constructor(PythonExecutor, previewContainer) {
        this.PythonExecutor = PythonExecutor;
        this.previewContainer = previewContainer;
        this.lastSavedSection = "";
        this.lastCodeSection = "";
        this.lastEndSection = "";
    }
    scanForUnsafeKeywords(text, unsafeKeywords = []) {
        const commentChar = "#";
        // user may try to clear setting just by deleting word
        // in that case make sure its cleared correctly
        if (unsafeKeywords.length == 1 && unsafeKeywords[0].trim() == '')
            unsafeKeywords = [];
        if (unsafeKeywords.length == 0)
            return false;
        const unsafeKeywordsRe = new RegExp(`^[^${commentChar}]*${unsafeKeywords.join('|')}`);
        return unsafeKeywordsRe.test(text);
    }
    onUserInput(text, filePath, eol, showGlobalVars = true) {
        const settingsCached = settings_1.settings();
        let codeLines = text.split(eol);
        let savedLines = [];
        let startLineNum = 0;
        let endLineNum = codeLines.length;
        codeLines.forEach((line, i) => {
            if (line.trimRight().endsWith("#$save")) {
                savedLines = codeLines.slice(0, i + 1);
                startLineNum = i + 1;
            }
            if (line.trimRight().endsWith("#$end")) {
                endLineNum = i + 1;
                return;
            }
        });
        const endSection = codeLines.slice(endLineNum).join(eol);
        codeLines = codeLines.slice(startLineNum, endLineNum);
        const unsafeKeywords = settingsCached.get('unsafeKeywords');
        const realTime = settingsCached.get("whenToExecute") == "afterDelay";
        // if not real-time we trust user to only run safe code
        if (realTime && this.scanForUnsafeKeywords(codeLines.join(eol), unsafeKeywords)) {
            throw Error("unsafeKeyword");
        }
        const data = {
            evalCode: codeLines.join(eol),
            filePath,
            savedCode: savedLines.join(eol),
            usePreviousVariables: settingsCached.get('keepPreviousVars'),
            show_global_vars: showGlobalVars,
            default_filter_vars: settingsCached.get('defaultFilterVars'),
            default_filter_types: settingsCached.get('defaultFilterTypes')
        };
        // user should be able to rerun code without changing anything
        // only scenario where we dont re-run is if just end section is changed
        if (endSection != this.lastEndSection && data.savedCode == this.lastSavedSection && data.evalCode == this.lastCodeSection) {
            return false;
        }
        this.lastCodeSection = data.evalCode;
        this.lastSavedSection = data.savedCode;
        this.lastEndSection = endSection;
        let syntaxPromise;
        // only execute code if syntax is correct
        // this is because it's annoying to have GUI apps restart constantly while typing
        syntaxPromise = this.PythonExecutor.checkSyntax(data.savedCode + data.evalCode);
        syntaxPromise.then(() => {
            this.PythonExecutor.execCode(data);
        })
            .catch((error) => {
            // an ErrnoException is a bad internal error
            let internalErr = "";
            if (typeof (error) != "string") {
                internalErr = error.message + '\n\n' + error.stack;
                error = "";
            }
            // todo: refactor above to call arepl to check syntax so we get a actual error object back instead of error text
            // The error text has a bunch of useless info
            this.previewContainer.handleResult({
                userVariables: {}, userError: null,
                userErrorMsg: error,
                execTime: 0, totalPyTime: 0, totalTime: 0,
                internalError: internalErr, caller: "", lineno: -1, done: true, evaluatorName: "", startResult: false,
            });
        });
        return true;
    }
}
exports.ToAREPLLogic = ToAREPLLogic;
//# sourceMappingURL=toAREPLLogic.js.map