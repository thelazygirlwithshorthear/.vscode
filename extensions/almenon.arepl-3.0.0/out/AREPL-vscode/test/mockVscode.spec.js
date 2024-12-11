"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vscodeMock = void 0;
const os_1 = require("os");
const vscode_uri_1 = require("vscode-uri");
// adapted from https://github.com/rokucommunity/vscode-brightscript-language/blob/master/src/mockVscode.spec.ts
exports.vscodeMock = {
    CompletionItem: class {
    },
    CodeLens: class {
    },
    StatusBarAlignment: {
        Left: 1,
        Right: 2
    },
    StatusBarItem: {
        alignment: {
            Left: 1,
            Right: 2
        },
        priority: 0,
        text: "",
        tooltip: "",
        color: "",
        command: "",
        show: () => { },
        hide: () => { },
        dispose: () => { }
    },
    extensions: {
        getExtension: function (extensionId) {
            return {
                id: "",
                /**
                 * The absolute file path of the directory containing this extension.
                 */
                extensionPath: "",
                /**
                 * `true` if the extension has been activated.
                 */
                isActive: true,
                /**
                 * The parsed contents of the extension's package.json.
                 */
                packageJSON: {
                    "version": "0.0.0"
                },
                extensionKind: null,
                exports: null,
                activate: () => { return new Promise(() => { }); }
            };
        },
        all: [],
        onDidChange: null,
    },
    debug: {
        registerDebugConfigurationProvider: () => { },
        onDidStartDebugSession: () => { },
        onDidReceiveDebugSessionCustomEvent: () => { },
    },
    languages: {
        registerDefinitionProvider: () => { },
        registerDocumentSymbolProvider: () => { },
        registerWorkspaceSymbolProvider: () => { },
        registerDocumentRangeFormattingEditProvider: () => { },
        registerSignatureHelpProvider: () => { },
        registerReferenceProvider: () => { },
        registerDocumentLinkProvider: () => { },
        registerCompletionItemProvider: () => { },
        createDiagnosticCollection: () => {
            return {
                clear: () => { }
            };
        }
    },
    subscriptions: [],
    commands: {
        registerCommand: () => {
        },
        executeCommand: () => {
        }
    },
    context: {
        subscriptions: [],
        asAbsolutePath: function () { }
    },
    workspace: {
        workspaceFolders: [{
                uri: vscode_uri_1.URI.parse(""),
                name: "foo",
                index: 0
            }],
        createFileSystemWatcher: () => {
            return {
                onDidCreate: () => {
                },
                onDidChange: () => {
                },
                onDidDelete: () => {
                }
            };
        },
        getConfiguration: function () {
            return {
                get: function (section, resource) {
                    if (section == "enableTelemetry")
                        return false;
                    if (section == "pyGuiLibraries")
                        return [];
                }
            };
        },
        onDidChangeConfiguration: () => {
            return {
                "dispose": () => { }
            };
        },
        onDidChangeWorkspaceFolders: () => { },
        findFiles: (include, exclude) => {
            return [];
        },
        registerTextDocumentContentProvider: () => { },
        onDidChangeTextDocument: () => { },
        onDidCloseTextDocument: () => { },
        openTextDocument: (content) => new Promise(() => ({}))
    },
    window: {
        createOutputChannel: function () {
            return {
                show: () => { },
                clear: () => { },
                appendLine: () => { }
            };
        },
        registerTreeDataProvider: function (viewId, treeDataProvider) { },
        showErrorMessage: function (message) {
        },
        activeTextEditor: {
            document: undefined,
            setDecorations(decorationType, rangesOrOptions) { }
        },
        onDidChangeTextEditorSelection: () => { },
        createTextEditorDecorationType: function () { },
        showTextDocument: function (doc) {
            return new Promise(() => doc);
        },
        createStatusBarItem: function (alignment, priority) {
            return {
                alignment: 0,
                priority: 0,
                text: "",
                tooltip: "",
                color: "",
                command: "",
                show: () => { },
                hide: () => { },
                dispose: () => { }
            };
        }
    },
    CompletionItemKind: {
        Function: 2
    },
    Disposable: class {
        static from() {
        }
    },
    EventEmitter: class {
        fire() {
        }
        event() {
        }
    },
    DeclarationProvider: class {
        constructor() {
            this.onDidChange = () => {
            };
            this.onDidDelete = () => {
            };
            this.onDidReset = () => {
            };
            this.sync = () => {
            };
        }
    },
    OutputChannel: class {
        clear() { }
        appendLine() { }
        show() { }
    },
    DebugCollection: class {
        clear() { }
        set() { }
    },
    Position: class {
        constructor(line, character) {
            this.line = line;
            this.character = character;
        }
    },
    ParameterInformation: class {
        constructor(label, documentation) {
            this.label = label;
            this.documentation = documentation;
        }
    },
    SignatureHelp: class {
        constructor() {
            this.signatures = [];
        }
    },
    SignatureInformation: class {
        constructor(label, documentation) {
            this.label = label;
            this.documentation = documentation;
        }
    },
    Range: class {
        constructor(startLine, startCharacter, endLine, endCharacter) {
            this.startLine = startLine;
            this.startCharacter = startCharacter;
            this.endLine = endLine;
            this.endCharacter = endCharacter;
            this.start = {
                line: startLine,
                character: startCharacter
            };
            this.end = {
                line: endLine,
                character: endCharacter
            };
        }
    },
    SymbolKind: {
        File: 0,
        Module: 1,
        Namespace: 2,
        Package: 3,
        Class: 4,
        Method: 5,
        Property: 6,
        Field: 7,
        Constructor: 8,
        Enum: 9,
        Interface: 10,
        Function: 11,
        Variable: 12,
        Constant: 13,
        String: 14,
        Number: 15,
        Boolean: 16,
        Array: 17,
        Object: 18,
        Key: 19,
        Null: 20,
        EnumMember: 21,
        Struct: 22,
        Event: 23,
        Operator: 24,
        TypeParameter: 25
    },
    TextDocument: class {
        constructor(fileName, text) {
            this.text = text;
            this.eol = 1;
            this.fileName = fileName;
            this.lineCount = text.split(os_1.EOL).length;
        }
        getText() { return this.text; }
        save() { return new Promise(() => { }); }
        ;
        getWordRangeAtPosition(position, regex) { return undefined; }
        ;
        lineAt(line) {
            const splitText = this.text.split(os_1.EOL);
            return {
                lineNumber: line,
                text: splitText[line],
                range: {
                    start: {
                        line: line,
                    },
                    end: {
                        line: line
                    },
                    isEmpty: Boolean(this.text),
                    isSingleLine: true
                },
                rangeIncludingLineBreak: null,
                firstNonWhitespaceCharacterIndex: null,
                isEmptyOrWhitespace: null
            };
        }
        ;
        offsetAt(position) { return -1; }
        ;
        positionAt(offset) { return null; }
        ;
    },
    TreeItem: class {
        constructor(label, collapsibleState) {
            this.label = label;
            this.collapsibleState = collapsibleState;
        }
    },
    DocumentLink: class {
        constructor(range, uri) {
            this.range = range;
            this.uri = uri;
        }
    },
    MarkdownString: class {
        constructor(value = null) {
            this.value = value;
        }
    },
    Uri: vscode_uri_1.URI.parse(""),
    SnippetString: class {
        constructor(value = null) {
            this.value = value;
        }
    },
};
//# sourceMappingURL=mockVscode.spec.js.map