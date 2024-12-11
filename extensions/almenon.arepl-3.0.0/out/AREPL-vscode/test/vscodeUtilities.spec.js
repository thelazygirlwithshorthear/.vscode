"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
// these tests haven't been going well 
// should try looking into sinon
// if that doesn't work try switching to jest
const assert = require("assert");
const vscodeUtilities_1 = require("../src/vscodeUtilities");
const path_1 = require("path");
suite('vscode utilities tests', () => {
    test('eol as string', () => {
        const d = new mockVscode_spec_1.vscodeMock.TextDocument("", "");
        assert.strictEqual(vscodeUtilities_1.default.eol(d), "\n");
        d.eol = 2;
        assert.strictEqual(vscodeUtilities_1.default.eol(d), "\r\n");
    });
    suite('expand path setting', () => {
        test('should replace env vars', () => {
            process.env["foo2435"] = "a";
            assert.strictEqual(vscodeUtilities_1.default.expandPathSetting("${env:foo2435}"), "a");
            delete process.env["foo2435"];
        });
        test('should replace workspacefolder', () => {
            assert.strictEqual(vscodeUtilities_1.default.expandPathSetting("${workspaceFolder}"), path_1.sep);
        });
        test('should make relative paths absolute', () => {
            assert.strictEqual(vscodeUtilities_1.default.expandPathSetting(`foo${path_1.sep}.env`), `${path_1.sep + path_1.sep}foo${path_1.sep}.env`);
        });
        test('should not change absolute paths', () => {
            assert.strictEqual(vscodeUtilities_1.default.expandPathSetting(__dirname), __dirname);
        });
    });
    // get bizarre error with this one
    // bad option: --extensionTestsPath=c:\dev\AREPL-vscode\test\suite\index
    // can't even run it
    // suite('new unsaved python doc', () => {
    //     it('should return a doc', (done) => {
    //         vscodeUtilities.newUnsavedPythonDoc().then((doc)=>{
    //             assert.strictEqual(doc, 1)
    //             done()
    //         })
    //     });
    // });
});
//# sourceMappingURL=vscodeUtilities.spec.js.map