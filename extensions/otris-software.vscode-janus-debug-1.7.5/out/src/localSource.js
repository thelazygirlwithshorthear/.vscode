"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalSource = void 0;
const fs = require("fs");
const node_file_log_1 = require("node-file-log");
const path_1 = require("path");
const localSourceLog = node_file_log_1.Logger.create('SourceMap');
/**
 * A local source file.
 */
class LocalSource {
    constructor(pathsOrPath) {
        this.paths = [];
        const paths = (Array.isArray(pathsOrPath)) ? pathsOrPath : [pathsOrPath];
        if (paths.length === 0) {
            throw new Error("Local source must have at least one local path");
        }
        else if (paths.length === 1) {
            // The file exists only once in the workspace
            this.path = paths[0];
        }
        else {
            // There are multiple files with the same name in the workspace. We will save
            // all paths. Once the file is requested for debugging, we will ask the user
            // to provide the correct file
            this.paths = paths;
            localSourceLog.info(`Additional paths found ${JSON.stringify(this.paths)}`);
        }
        // we assume that all paths are pointing to the same file (name). We can use
        // the first path to get the file name
        const parsedPath = (0, path_1.parse)(paths[0]);
        this.name = parsedPath.base;
        this.aliasNames = [
            parsedPath.name,
            parsedPath.base
        ];
        this.sourceReference = 0;
    }
    loadFromDisk() {
        if (this.path) {
            return fs.readFileSync(this.path, 'utf8');
        }
        else {
            throw new Error(`Can't load source ${this.name}. Found multiple source files with the same name`);
        }
    }
    getSourceLine(lineNo) {
        const fileContents = this.loadFromDisk();
        const lines = fileContents.split("\n");
        const ret = lines[lineNo - 1];
        if (ret === undefined) {
            throw new Error(`Line ${lineNo} does not exist in ${this.name}`);
        }
        return ret.trim();
    }
    leadingDebuggerStmts() {
        let counter = 0;
        const fileContents = this.loadFromDisk();
        const lines = fileContents.split("\n");
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
    sourceName() {
        return (0, path_1.parse)(this.name).name;
    }
}
exports.LocalSource = LocalSource;
//# sourceMappingURL=localSource.js.map