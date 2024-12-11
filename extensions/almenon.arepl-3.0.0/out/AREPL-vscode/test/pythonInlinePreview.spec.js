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
const assert = require("assert");
const pythonInlinePreview_1 = require("../src/pythonInlinePreview");
suite('inline preview', () => {
    const context = {
        'asAbsolutePath': (path) => { }
    };
    test('shows one error if just one error', () => {
        let p = new pythonInlinePreview_1.default(null, context);
        const error = {
            __cause__: null,
            __context__: null,
            _str: "",
            cause: null,
            context: null,
            exc_traceback: {},
            exc_type: {
                "py/type": "ValueError"
            },
            stack: {
                "py/seq": [{
                        _line: "raise ValueError()",
                        filename: "<string>",
                        lineno: 1,
                        locals: {},
                        name: "foo"
                    }]
            }
        };
        mockVscode_spec_1.vscodeMock.window.activeTextEditor.setDecorations = (decorationType, rangesOrOptions) => {
            assert.strictEqual(rangesOrOptions.length, 1);
        };
        p.showInlineErrors(error, "");
    });
    test('shows multiple errors if more than one', () => {
        let p = new pythonInlinePreview_1.default(null, context);
        const error = {
            __cause__: null,
            __context__: null,
            _str: "",
            cause: null,
            context: null,
            exc_traceback: {},
            exc_type: {
                "py/type": "ValueError"
            },
            stack: {
                "py/seq": [{
                        _line: "raise ValueError()",
                        filename: "<string>",
                        lineno: 1,
                        locals: {},
                        name: "foo"
                    }]
            }
        };
        // deep-copy error to avoid infinite recursion
        error.__cause__ = JSON.parse(JSON.stringify(error));
        mockVscode_spec_1.vscodeMock.window.activeTextEditor.setDecorations = (decorationType, rangesOrOptions) => {
            assert.strictEqual(rangesOrOptions.length, 2);
        };
        p.showInlineErrors(error, "");
    });
});
//# sourceMappingURL=pythonInlinePreview.spec.js.map