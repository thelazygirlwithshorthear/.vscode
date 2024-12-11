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
        const settingsCached = (0, settings_1.settings)();
        let codeLines = text.split(eol);
        let startLineNum = 0;
        let endLineNum = codeLines.length;
        codeLines.forEach((line, i) => {
            if (line.trimEnd().endsWith("#$end")) {
                endLineNum = i + 1;
                return;
            }
        });
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
            show_global_vars: showGlobalVars,
            default_filter_vars: settingsCached.get('defaultFilterVars'),
            default_filter_types: settingsCached.get('defaultFilterTypes')
        };
        if (data.evalCode == this.lastCodeSection) {
            // nothing changed, no point in rerunning
            return false;
        }
        this.lastCodeSection = data.evalCode;
        this.PythonExecutor.execCode(data);
        return true;
    }
}
exports.ToAREPLLogic = ToAREPLLogic;
//# sourceMappingURL=toAREPLLogic.js.map