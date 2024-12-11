"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//
// Note: This test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//
const assert = require("assert");
const utilities_1 = require("../src/utilities");
suite("Utility Tests", () => {
    suite('isEmpty', () => {
        test("returns true for empty element", function () {
            assert.strictEqual(utilities_1.default.isEmpty({}), true);
            assert.strictEqual(utilities_1.default.isEmpty([]), true);
        });
        test("returns false for non-empty elements", function () {
            assert.strictEqual(utilities_1.default.isEmpty({ a: null }), false);
            assert.strictEqual(utilities_1.default.isEmpty([1]), false);
        });
        test("returns true for null element", function () {
            assert.strictEqual(utilities_1.default.isEmpty(null), true);
        });
    });
    suite('escape html', () => {
        test("escapes html", function () {
            assert.strictEqual(utilities_1.default.escapeHtml("<yo>"), "&lt;yo&gt;");
        });
        test("does not escape non-html", function () {
            assert.strictEqual(utilities_1.default.escapeHtml("feaf$"), "feaf$");
        });
    });
    suite('get last line', () => {
        test("gets last line", function () {
            assert.strictEqual(utilities_1.default.getLastLine("a\nb"), "b");
        });
        test("does not error when empty", function () {
            assert.strictEqual(utilities_1.default.getLastLine(""), "");
        });
    });
    suite('flatten nested object', () => {
        test("does not error out on null objects", function () {
            assert.deepStrictEqual(utilities_1.default.flattenNestedObject(null, "key"), []);
        });
        test("does not error with bad key", function () {
            assert.deepStrictEqual(utilities_1.default.flattenNestedObject({}, "b"), [{}]);
        });
        test("can flatten a single object", function () {
            assert.deepStrictEqual(utilities_1.default.flattenNestedObject({ 'a': null }, "a"), [{ 'a': null }]);
        });
        test("can flatten nested objects", function () {
            assert.deepStrictEqual(utilities_1.default.flattenNestedObject({ 'a': { 'a': null } }, "a"), [{ 'a': { 'a': null } }, { 'a': null }]);
        });
    });
    suite('flatten nested object with multiple keys', () => {
        test("can flatten nested objects", function () {
            assert.deepStrictEqual(utilities_1.default.flattenNestedObjectWithMultipleKeys({ 'a': { 'a': null } }, ["a", "b"]), [{ 'a': { 'a': null } }, { 'a': null }]);
            assert.deepStrictEqual(utilities_1.default.flattenNestedObjectWithMultipleKeys({ 'a': { 'b': null } }, ["a", "b"]), [{ 'a': { 'b': null } }, { 'b': null }]);
        });
    });
});
//# sourceMappingURL=utilities.spec.js.map