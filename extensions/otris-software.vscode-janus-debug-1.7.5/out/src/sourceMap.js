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
exports.ServerSource = exports.SourceMap = void 0;
const assert = require("assert");
const crypto = require("crypto");
const node_file_log_1 = require("node-file-log");
const path_1 = require("path");
const localSource_1 = require("./localSource");
// tslint:disable-next-line:no-var-requires
const utf8 = require('utf8');
class ValueMap extends Map {
    findKeyIf(predicate) {
        for (const entry of this) {
            if (predicate(entry[1])) {
                return entry[0];
            }
        }
        return undefined;
    }
    findValueIf(predicate) {
        for (const value of this.values()) {
            if (predicate(value)) {
                return value;
            }
        }
        return undefined;
    }
}
function randU32() {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(4, (err, buf) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(buf.readUInt32BE(0, true));
            }
        });
    });
}
const sourceMapLog = node_file_log_1.Logger.create('SourceMap');
/**
 * Provides bi-directional mapping from local sources, most likely files, to remote JS context names.
 *
 * The jsrdbg protocol speaks of URLs but these are actually not URLs but more like URIs or URNs.
 */
class SourceMap {
    constructor(ipcClient) {
        this.prevChunk = "";
        this.prevLine = 1;
        this.isAsking = false;
        this.ipcClient = ipcClient;
        this.map = new ValueMap();
        this._serverSource = new ServerSource();
        this._dynamicScripts = new ValueMap();
    }
    set serverSource(sources) {
        this._serverSource = sources;
    }
    get serverSource() {
        return this._serverSource;
    }
    addDynamicScript(remoteUrl, serverSource) {
        this._dynamicScripts.set(remoteUrl, serverSource);
    }
    addMapping(localSource, remoteName) {
        this.map.set(remoteName, localSource);
    }
    toLocalPosition(line, url) {
        return __awaiter(this, void 0, void 0, function* () {
            this.prevChunk = "";
            this.prevLine = 1;
            let serverSource;
            if (url && url !== this.serverSource.name) {
                sourceMapLog.info(`dynamic script`);
                serverSource = this.getDynamicServerSource(url);
            }
            if (!serverSource) {
                sourceMapLog.info(`main static script`);
                serverSource = this._serverSource;
            }
            const localPos = serverSource.toLocalPosition(line);
            let sourceLines = serverSource.sourceLines;
            if (serverSource.hiddenStatement) {
                // we have to clone the array. otherwise shift will remove the first entry from this._serverSource.sourceLines
                sourceLines = [...sourceLines];
                sourceLines.shift();
            }
            const localSource = yield this.getSource(localPos.source, sourceLines);
            if (!localSource) {
                throw new Error(`Local source '${localPos.source}' not found, remote line ${line}, local line ${localPos.line}`);
            }
            const localSourceLine = localSource.getSourceLine(localPos.line);
            const remoteSourceLine = serverSource.getSourceLine(line);
            if (localSourceLine.trim() !== remoteSourceLine.trim()) {
                if (line === 1 && serverSource.hiddenStatement) {
                    // hidden debugger; statement, should not happen because next was executed
                    // map this line to first line (done in serverSource.toLocalPosition)
                    return localPos;
                }
                const first = this._serverSource.chunks.find(chunk => (line >= chunk.pos.start) && (line < (chunk.pos.start + chunk.pos.len)));
                let duplicate;
                if (first) {
                    duplicate = this._serverSource.chunks.find(chunk => (first.name === chunk.name) && (first.localStart === chunk.localStart) && (first.pos.len !== chunk.pos.len));
                }
                if (duplicate) {
                    throw new Error(`Duplicate #import in ${duplicate.name}, first occurrence at line ${duplicate.localStart - 1}`);
                }
                const utf8string = utf8.decode(remoteSourceLine);
                if (localSourceLine.trim() !== utf8string.trim()) {
                    this.prevChunk = serverSource.getChunkLines(localPos.idx, utf8string);
                    this.prevLine = line;
                    throw new Error('Not on same source line');
                }
            }
            return localPos;
        });
    }
    toRemoteLine(localPos, dynamicScript) {
        let remoteLine;
        if (dynamicScript) {
            sourceMapLog.debug(`toRemoteLine: dynamic script ${dynamicScript.name}`);
            remoteLine = dynamicScript.toRemoteLine({
                line: localPos.line,
                source: localPos.source.sourceName(),
            });
        }
        else {
            sourceMapLog.debug(`toRemoteLine: static script`);
            remoteLine = this._serverSource.toRemoteLine({
                line: localPos.line,
                source: localPos.source.sourceName(),
            });
        }
        return remoteLine;
    }
    getRemoteUrl(localPath) {
        const parsedPath = (0, path_1.parse)(localPath);
        let remoteName;
        remoteName = this.map.findKeyIf(value => value.path === localPath);
        if (!remoteName) {
            remoteName = this.map.findKeyIf(value => value.aliasNames.indexOf(parsedPath.base) !== -1);
        }
        if (!remoteName) {
            remoteName = localPath;
            sourceMapLog.warn(`no remote name found for '${localPath}'`);
        }
        sourceMapLog.debug(`getRemoteUrl: '${localPath}' → '${remoteName}'`);
        return remoteName;
    }
    /**
     * @param remoteName
     * @param serverFileSourceCode source code of the server file. received directly from the remote debugger
     * @returns
     */
    getSource(remoteName, serverFileSourceCode) {
        return __awaiter(this, void 0, void 0, function* () {
            let source = this.map.get(remoteName);
            if (source && !source.path) {
                source = yield new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                    while (this.isAsking) {
                        yield this.delay(1000);
                    }
                    const updatedSource = this.map.get(remoteName);
                    if (!updatedSource.path) {
                        if (!serverFileSourceCode) {
                            serverFileSourceCode = this._serverSource.sourceLines;
                            if (this._serverSource.hiddenStatement) {
                                // we have to clone the array. otherwise shift will remove the first entry from this._serverSource.sourceLines
                                serverFileSourceCode = [...serverFileSourceCode];
                                serverFileSourceCode.shift();
                            }
                        }
                        this.isAsking = true;
                        updatedSource.path = yield this.ipcClient.askForCorrectSourceFile(updatedSource.name, updatedSource.paths, serverFileSourceCode);
                        this.isAsking = false;
                    }
                    resolve(updatedSource);
                }));
                this.map.set(remoteName, source);
            }
            return source;
        });
    }
    getDynamicServerSource(remoteUrl) {
        return this._dynamicScripts.get(remoteUrl);
    }
    getSourceByReference(sourceReference) {
        return sourceReference > 0 ?
            this.map.findValueIf(value => value.sourceReference === sourceReference) : undefined;
    }
    setLocalUrls(localPaths) {
        for (const localPath of localPaths.values()) {
            const localSource = new localSource_1.LocalSource(localPath.paths);
            this.addMapping(localSource, localSource.aliasNames[0]);
        }
    }
    setLocalUrlsSimple(localPaths) {
        localPaths.forEach(path => {
            const localSource = new localSource_1.LocalSource(path);
            this.addMapping(localSource, localSource.aliasNames[0]);
        });
    }
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
exports.SourceMap = SourceMap;
class Pos {
    constructor(start, len) {
        this.start = start;
        this.len = len;
    }
}
/**
 * The generator of the server source added comment-lines and maybe a debugger-statement to
 * the server source. These comments and statements do not exist in the original source.
 *
 * But using the comment-lines, the server source can be seperated into chunks:
 * - The first chunk starts at line 1 of the server code.
 * - Every chunk, except the last one, ends immediately before a generated comment-line.
 * - Every chunk, except the first one, starts at a generated comment-line.
 *
 * A generated comment-line looks like this: "//# i name", meaning the original source of
 * this chunk starts at position i in the local file with name "name"(.js).
 *
 * The debugger-statement is generated to the first line of the main file before the server
 * source is generated, but only in the case that 'Upload and Debug Script' is executed.
 *
 * If a chunk starts at a comment-line, or contains the generated debugger-statement
 * the original source in the chunk starts one line behind the comment-line.
 * So we have 3 cases for the original source position inside the chunk:
 * - (1+2) The first chunk does not contain a generated comment but maybe it contains the generated debugger-statement.
 * - (3) All other chunks start at a generated comment-line and they do not contain a generated debugger-statement.
 *
 * See Documentation of Source Mapping with example in sourcemap.test.ts
 */
class Chunk {
    constructor(name, pos, localStart, debugAdded, firstChunk) {
        this.name = name;
        this.pos = pos;
        this.localStart = localStart;
        this.debugAdded = debugAdded;
        // serverSourceLog.error(`chunk.pos.start ${pos.start} | firstChunk ${pos.start === 1} | debugAdded ${debugAdded}`);
        if (firstChunk) {
            // first chunk
            if (debugAdded) {
                // first chunk and debugger-statement added
                // length is not set on creation
                this.originalStart = pos.start + 1;
            }
            else {
                // the chunk matches the original source
                this.originalStart = pos.start;
            }
        }
        else {
            // not the first chunk ==> comment-line at start
            // length is not set on creation
            this.originalStart = pos.start + 1;
        }
    }
}
const serverSourceLog = node_file_log_1.Logger.create('ServerSource');
class ServerSource {
    constructor() {
        this._chunks = [];
        this._sourceLines = [];
        this._hiddenStatement = false;
        this._name = "";
        this._staticScripts = [];
    }
    static leadingDebuggerStmts(lines) {
        let counter = 0;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].trim().startsWith("debugger;")) {
                counter++;
            }
            else {
                break;
            }
        }
        return counter;
    }
    static fromSources(contextName, sourceLines, hiddenStatement = false, localSource) {
        const chunks = [];
        const staticScripts = [];
        const pattern = /^\/\/#\s([0-9]+)\s([\w\_\-\.#]+);?$/;
        let current;
        // todo: make hiddenStatement local variable
        // case attach: check, if "debugger;" statement added to server source
        if (hiddenStatement === false && localSource !== undefined) {
            const numLocal = localSource.leadingDebuggerStmts();
            const numRemote = this.leadingDebuggerStmts(sourceLines);
            if (numRemote > numLocal) {
                hiddenStatement = true;
            }
        }
        // case launch: check, if "debugger;" statement really added to server source
        if (hiddenStatement === true && !sourceLines[0].trim().startsWith("debugger;")) {
            hiddenStatement = false;
        }
        // serverSourceLog.debug(`# server source lines ${sourceLines.length}`);
        sourceLines.forEach((line, index) => {
            // lines start at 1
            const lineNo = index + 1;
            // serverSourceLog.debug(`${lineNo}: ${line}`);
            line = line.trim();
            const match = line.match(pattern);
            if (match) {
                if (chunks.length === 0) {
                    // add first chunk, don't check length, add it anyway
                    // because toLocalPosition() is easier to handle then,
                    // because first chunk looks different (no "//#..." at start)
                    chunks.push(new Chunk(contextName, new Pos(1, lineNo - 1), 1, hiddenStatement, true));
                    // serverSourceLog.debug(`(CHUNK[0]) name ${contextName} remote pos ${1} len ${sourceLines.length} local pos ${1}`);
                }
                const offset = Number(match[1]);
                const name = match[2];
                if (staticScripts.indexOf(name) < 0) {
                    staticScripts.push(name);
                }
                // the start of the source in the local file
                // lines start at 1
                let localPos = 1 + offset;
                if (hiddenStatement && (name === contextName)) {
                    // the chunk belongs to the mainfile and the debugger-statement was added,
                    // we have to subtract 1, because the debugger-statement does not exist
                    // in local file
                    localPos -= 1;
                }
                if (current) {
                    current.pos.len = lineNo - current.pos.start;
                    if (current.pos.len > 0) {
                        // serverSourceLog.debug(`CHUNK[${chunks.length}] name ${current.name} remote line ${current.pos.start} len ${current.pos.len} local line ${current.localStart}`);
                        chunks.push(current);
                    }
                    else {
                        current = undefined;
                    }
                }
                const remotePos = lineNo;
                // pos.len must be set in next iteration
                current = new Chunk(name, new Pos(remotePos, 0), localPos, hiddenStatement, false);
            }
        });
        if (current) {
            // last chunk, resolve pos.len like above
            const index = sourceLines.length;
            const lineNo = index + 1;
            current.pos.len = lineNo - current.pos.start;
            // serverSourceLog.debug(`CHUNK[${chunks.length}] name ${current.name} pos ${current.pos.start} len ${current.pos.len} local ${current.localStart}`);
            chunks.push(current);
        }
        // if no "//#..."-comments in source, add only one first chunk
        // this chunk looks different, because there's no "//#..."-line at start
        if (chunks.length === 0) {
            chunks.push(new Chunk(contextName, new Pos(1, sourceLines.length), 1, hiddenStatement, true));
            // serverSourceLog.debug(`(CHUNK[0]) name ${contextName} remote pos ${1} len ${sourceLines.length} local pos ${1}`);
        }
        // first chunk can have length 0
        assert.equal(chunks.filter(c => (c !== chunks[0] && c.pos.len === 0)).length, 0);
        const s = new ServerSource();
        s._chunks = chunks;
        s._staticScripts = staticScripts,
            s._sourceLines = sourceLines;
        s._hiddenStatement = hiddenStatement;
        s._name = contextName;
        return s;
    }
    get sourceLines() {
        return this._sourceLines;
    }
    get chunks() {
        return this._chunks;
    }
    getSourceCode() {
        return this._sourceLines.reduce((a, b) => a + "\n" + b);
    }
    /**
     * returns true, if the internal "debugger;" statement was inserted to
     * this server source
     */
    get hiddenStatement() {
        return this._hiddenStatement;
    }
    get name() {
        return this._name;
    }
    get staticScripts() {
        return this._staticScripts;
    }
    getChunkLines(idx, line) {
        const chunk = this._chunks[idx];
        let comment = `// This is ONLY A PART of the currently executed source code on server\n`;
        comment += `// Current line is:\n`;
        comment += `// ${line}\n\n`;
        const arrayStart = chunk.pos.start - 1;
        const chunkLines = this._sourceLines.slice(arrayStart, (chunk.pos.start - 1 + chunk.pos.len));
        return comment + chunkLines.join("\n") + "\n";
    }
    /**
     * See documentation in "test/sourceMap.test.ts"
     */
    toLocalPosition(line) {
        assert.ok(this._chunks.length > 0, "expected at least one chunk");
        let idx;
        idx = this._chunks.findIndex(chunk => (line >= chunk.pos.start) && (line < (chunk.pos.start + chunk.pos.len)));
        if (idx < 0) {
            this._chunks.forEach((chunk, index) => serverSourceLog.info(`chunk ${index}, start: ${chunk.pos.start}, len: ${chunk.pos.len}`));
            serverSourceLog.error(`toLocalPosition: line ${line} not found in all ${this._chunks.length} chunks`);
            throw new Error(`eval() statement in script? set debugger; statement to line 1`);
        }
        const firstChunk = (idx === 0);
        const chunk = this._chunks[idx];
        if (!firstChunk && (line === chunk.pos.start)) {
            // line is a generated comment-line
            // this line cannot be mapped, because it does not exist in local code,
            // but additional it's a comment so the debugger should not be in this line,
            // something must be wrong...
            throw new Error(`Unexpected call of ServerSource.toLocalPosition with line: ${line} === chunk-start: ${chunk.pos.start}`);
        }
        if (this.hiddenStatement && firstChunk && (line === 1)) {
            // line is at the generated debugger-statement in first line
            // map to first line, but the debug-adapter skips this line anyway
            return {
                source: chunk.name,
                line: 1,
                idx
            };
        }
        const localCodeStart = chunk.originalStart;
        // todo remove
        const localCodeStart2 = chunk.pos.start + ((!firstChunk || this.hiddenStatement) ? 1 : 0);
        if (localCodeStart !== localCodeStart2) {
            serverSourceLog.error(`localCodeStart (${localCodeStart}) !== localCodeStart2 (${localCodeStart2})`);
        }
        // the offset of the line inside the chunk
        const chunkOffset = line - localCodeStart;
        // serverSourceLog.debug(`(toLocalPosition) REMOTE CHUNK[${idx}]: content-start ${chunk.pos.start + 1} current line ${line} => offset ${chunkOffset}`);
        // the line in local file
        const localLine = chunk.localStart + chunkOffset;
        // serverSourceLog.debug(`(toLocalPosition) LOCAL: content-start ${chunk.localStart} => current line (content-start + offset) ${localLine}`);
        return {
            source: chunk.name,
            line: localLine,
            idx
        };
    }
    toRemoteLine(pos) {
        // serverSourceLog.debug(`(toRemoteLine) LOCAL: source file ${pos.source}.js, line ${pos.line}`);
        const idx = this._chunks.findIndex(chunk => (pos.source === chunk.name) && (pos.line >= chunk.localStart) && (pos.line < (chunk.localStart + chunk.pos.len)));
        if (idx < 0) {
            this._chunks.forEach((chunk, index) => serverSourceLog.info(`chunk ${index}, start: ${chunk.pos.start}, len: ${chunk.pos.len}`));
            serverSourceLog.error(`toRemoteLine: line ${pos.line} not found in all ${this._chunks.length} chunks`);
            throw new Error(`toRemoteLine: ${pos.source} line ${pos.line} not found in chunks`);
        }
        // serverSourceLog.debug(`(toRemoteLine) found CHUNK[${idx}]: starts in ${pos.source}.js at ${this.chunks[idx].localStart} and in remote at ${this.chunks[idx].pos.start} (+1)`);
        const firstChunk = (idx === 0);
        const chunk = this.chunks[idx];
        // the chunk offset in the local file
        const localChunkOffset = pos.line - chunk.localStart;
        const chunkCodeStart = chunk.originalStart;
        // todo remove
        const chunkCodeStart2 = chunk.pos.start + ((!firstChunk || this.hiddenStatement) ? 1 : 0);
        if (chunkCodeStart !== chunkCodeStart2) {
            serverSourceLog.error("chunkCodeStart !== chunkCodeStart2");
        }
        const lineNo = chunkCodeStart + localChunkOffset;
        // serverSourceLog.debug(`(toRemoteLine) chunk offset in local file ${localChunkOffset} => REMOTE offset ${lineNo}`);
        return lineNo;
    }
    getSourceLine(lineNo) {
        return this._sourceLines[lineNo - 1];
    }
}
exports.ServerSource = ServerSource;
//# sourceMappingURL=sourceMap.js.map