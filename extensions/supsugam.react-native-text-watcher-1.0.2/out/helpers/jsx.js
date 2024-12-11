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
exports.extractAllNakedTexts = void 0;
const vscode = __importStar(require("vscode"));
const ts = __importStar(require("typescript"));
const manageTextComponent_1 = require("../commands/manageTextComponent");
function isJsxStringLiteral(text) {
    return text.match(/\{(?:['"`])(.*?)(?:['"`])\}/g) !== null;
}
function isNakedText(node) {
    const ALL_TAGS_TO_IGNORE = (0, manageTextComponent_1.getCustomTextComponents)();
    if (isOneOfTheseTags(node, ALL_TAGS_TO_IGNORE)) {
        return false;
    }
    if (!hasAtLeastOneJSXAncestor(node)) {
        return false;
    }
    if (ts.isCallExpression(node.parent)) {
        return false;
    }
    if (!ts.isJsxText(node) && !ts.isStringLiteralLike(node)) {
        return false;
    }
    if (!isNotAPartOfProps(node)) {
        return false;
    }
    const text = node.getText().trim();
    if (text.match(/^\s*$/) !== null) {
        return false;
    }
    if (text.startsWith('{') && text.endsWith('}')) {
        if (isJsxStringLiteral(text)) {
            return false;
        }
    }
    return true;
}
function extractAllNakedTexts({ content, scriptKind, }) {
    const nakedTexts = [];
    const sourceFile = ts.createSourceFile('temp.tsx', content, ts.ScriptTarget.Latest, true, scriptKind);
    function visit(node) {
        if (isNakedText(node)) {
            const start = node.getStart();
            const end = node.getEnd();
            const trimmedStart = content.substring(start).search(/\S/);
            const trimmedEnd = content.substring(0, end).match(/\S\s*$/)?.index;
            if (trimmedStart !== -1 && trimmedEnd !== undefined) {
                const text = content.substring(start + trimmedStart, end - (end - trimmedEnd) + 1);
                const startPosition = sourceFile.getLineAndCharacterOfPosition(start + trimmedStart);
                const endPosition = sourceFile.getLineAndCharacterOfPosition(end - (end - trimmedEnd) + 1);
                const range = new vscode.Range(new vscode.Position(startPosition.line, startPosition.character), new vscode.Position(endPosition.line, endPosition.character));
                nakedTexts.push({ text, range });
            }
        }
        ts.forEachChild(node, visit);
    }
    ts.forEachChild(sourceFile, visit);
    return nakedTexts;
}
exports.extractAllNakedTexts = extractAllNakedTexts;
const hasAtLeastOneJSXAncestor = (node) => {
    if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) {
        return true;
    }
    if (node.parent) {
        return hasAtLeastOneJSXAncestor(node.parent);
    }
    return false;
};
const isNotAPartOfProps = (node) => {
    if (ts.isJsxAttribute(node)) {
        return false;
    }
    if (node.parent) {
        return isNotAPartOfProps(node.parent);
    }
    return true;
};
const isOneOfTheseTags = (node, tags) => {
    const tagPattern = /<([^\/\s>]+)/;
    const nodeTag = tagPattern.exec(node.getText())?.[1] ?? null;
    if (nodeTag && tags.includes(nodeTag)) {
        return true;
    }
    else {
        if (node.parent) {
            return isOneOfTheseTags(node.parent, tags);
        }
    }
    return false;
};
//# sourceMappingURL=jsx.js.map