"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const vscodeUtilities_1 = require("../../src/vscodeUtilities");
const vscode = require("vscode");
suite("Utility Tests", () => {
    test("new python doc", function (done) {
        vscodeUtilities_1.default.newUnsavedPythonDoc("test").then((editor) => {
            assert.equal(editor.document.isClosed, false);
            assert.equal(editor.document.getText(), "test");
            vscode.commands.executeCommand("workbench.action.closeActiveEditor").then(() => {
                done();
            });
        });
    });
    // test("get highlighted text", function(){
    //     Utilities.newUnsavedPythonDoc("testGetHighlightedText").then((editor)=>{
    //         // not sure how to highlight text :/
    //         assert.equal(Utilities.getHighlightedText(), "testGetHighlightedText")
    //     })
    // })
});
//# sourceMappingURL=vscodeUtilities.test.js.map