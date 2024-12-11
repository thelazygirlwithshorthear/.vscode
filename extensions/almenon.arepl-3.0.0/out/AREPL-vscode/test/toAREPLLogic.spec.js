"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = require("os");
const assert = require("assert");
//////////////////////////////////////////////
// below thanks to https://github.com/rokucommunity/vscode-brightscript-language
let Module = require('module');
const mockVscode_spec_1 = require("./mockVscode.spec");
//override the "require" call to mock certain items
const { require: oldRequire } = Module.prototype;
Module.prototype.require = function hijacked(file) {
    if (file === 'vscode') {
        return mockVscode_spec_1.vscodeMock;
    }
    else {
        return oldRequire.apply(this, arguments);
    }
};
//////////////////////////////////////////////
const toAREPLLogic_1 = require("../src/toAREPLLogic");
suite("toAREPLLogic tests", () => {
    const mockPythonExecutor = {
        execCode: () => { },
        checkSyntax: () => new Promise(() => { })
    };
    const toAREPLLogic = new toAREPLLogic_1.ToAREPLLogic(mockPythonExecutor, null);
    test("arepl not ran when just end section is changed", function () {
        let returnVal = toAREPLLogic.onUserInput(`#$end${os_1.EOL}bla`, "", os_1.EOL);
        assert.strictEqual(returnVal, true);
        returnVal = toAREPLLogic.onUserInput(`#$end${os_1.EOL}foo`, "", os_1.EOL);
        assert.strictEqual(returnVal, false);
    });
    test("unsafe keyword not allowed", function () {
        assert.strictEqual(toAREPLLogic.scanForUnsafeKeywords("os.rmdir('bla')", ["rmdir"]), true);
    });
    test("safe keyword allowed", function () {
        assert.strictEqual(toAREPLLogic.scanForUnsafeKeywords("bla bla bla", ["rmdir"]), false);
    });
    test("unsafe keyword allowed in comment", function () {
        assert.strictEqual(toAREPLLogic.scanForUnsafeKeywords("#rmdir", ["rmdir"]), false);
    });
    test("unsafe keywords not allowed", function () {
        assert.strictEqual(toAREPLLogic.scanForUnsafeKeywords("DELETE * FROM", ["rmdir", "DELETE"]), true);
    });
});
//# sourceMappingURL=toAREPLLogic.spec.js.map