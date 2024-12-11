"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transpileTypescript = exports.findOutputFile = void 0;
const fs_1 = require("fs");
const path = require("path");
const stripJsonComments = require("strip-json-comments");
const vscode = require("vscode");
const glob_1 = require("glob");
const fs_extra_1 = require("fs-extra");
const child_process_1 = require("child_process");
function findOutputFile(sourceFilePath, cOptions) {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (workspaceFolders && workspaceFolders.length > 0) {
        if (!cOptions) {
            const workspaceFolder = workspaceFolders[0];
            const workspaceSettings = vscode.workspace.getConfiguration("vscode-janus-debug");
            const tsConfigFile = path.join(workspaceFolder.uri.fsPath, workspaceSettings.get("tsconfigPath") || "tsconfig.json");
            cOptions = getTypescriptConfig(tsConfigFile, workspaceFolder);
        }
        // determine the output directory where typescript would output the transpiled files.
        let outputDir = "";
        if (cOptions && cOptions.outDir) {
            outputDir = cOptions.outDir;
        }
        const globs = glob_1.glob.sync(path.join(outputDir, "**", `${path.basename(sourceFilePath, ".ts")}.js`));
        if (globs.length === 1) {
            return globs[0];
        }
    }
    return null;
}
exports.findOutputFile = findOutputFile;
function transpileTypescript(filePath, code = (0, fs_1.readFileSync)(filePath, 'utf8')) {
    // this function uses the module "https://www.npmjs.com/package/ttypescript" to transpile
    // the typescript code to javascript. TTypescript is a wrapper for typescript which supports
    // `transformers` which can change the output of tsc before and after the transpilation (e. g. to replace
    // global returns etc.)
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (workspaceFolders && workspaceFolders.length > 0) {
        const cwd = process.cwd();
        const workspaceFolder = workspaceFolders[0];
        try {
            process.chdir(workspaceFolder.uri.fsPath);
            const workspaceSettings = vscode.workspace.getConfiguration("vscode-janus-debug");
            const tsConfigFile = path.join(workspaceFolder.uri.fsPath, workspaceSettings.get("tsconfigPath") || "tsconfig.json");
            const cOptions = getTypescriptConfig(tsConfigFile, workspaceFolder);
            const tOptions = {
                fileName: filePath,
                reportDiagnostics: true,
                compilerOptions: cOptions
            };
            let typescript;
            try {
                typescript = require(path.join(workspaceFolder.uri.fsPath, "node_modules", "ttypescript"));
            }
            catch (err) {
                typescript = require(path.join(workspaceFolder.uri.fsPath, "node_modules", "typescript"));
            }
            const result = typescript.transpileModule(code, tOptions);
            // determine the output directory where typescript would output the transpiled files.
            let outputFilePath = findOutputFile(filePath, cOptions);
            if (outputFilePath) {
                const dirname = path.dirname(outputFilePath);
                if (!(0, fs_1.existsSync)(dirname)) {
                    (0, fs_extra_1.mkdirpSync)(dirname);
                }
                (0, fs_1.writeFileSync)(outputFilePath, result.outputText);
                const sourceMapPath = `${outputFilePath}.map`;
                if (result.sourceMapText) {
                    let sourceMapText = result.sourceMapText;
                    if ((0, fs_1.existsSync)(sourceMapPath)) {
                        // I dont know why, but the transpileModule does not generate the correct `sources` path in the source map.
                        // Just an ugly quick fix: Overwrite this property with the original value.
                        const parsedSourceMap = JSON.parse(sourceMapText);
                        const originalSourceMap = JSON.parse((0, fs_1.readFileSync)(sourceMapPath).toString());
                        parsedSourceMap.sources = originalSourceMap.sources;
                        sourceMapText = JSON.stringify(parsedSourceMap);
                    }
                    (0, fs_1.writeFileSync)(sourceMapPath, sourceMapText);
                }
            }
            else {
                const packageJSONPath = path.join(workspaceFolder.uri.fsPath, "package.json");
                let showWarning = true;
                if ((0, fs_1.existsSync)(packageJSONPath)) {
                    const packageJSON = JSON.parse((0, fs_1.readFileSync)(packageJSONPath).toString());
                    if (packageJSON.scripts && (packageJSON.scripts.compile || packageJSON.scripts.transpile)) {
                        showWarning = false;
                        let command = `npm run `;
                        if (packageJSON.scripts.compile) {
                            command += "compile";
                        }
                        else if (packageJSON.scripts.transpile) {
                            command += "transpile";
                        }
                        try {
                            (0, child_process_1.execSync)(command, { cwd: workspaceFolder.uri.fsPath });
                        }
                        catch (err) {
                            const errMsg = `Cannot execute ${command}: ${err}`;
                            vscode.window.showErrorMessage(errMsg);
                        }
                    }
                }
                if (showWarning) {
                    vscode.window.showWarningMessage(`Could not find the output file for ${path.relative(workspaceFolder.uri.fsPath, filePath)}. You should transpile your source files once manually to produce the typescript out folder. Then the extension can update those files on upload script which enables the debugger to work probably. Call 'tsc' by yourself or add a script task named 'compile' to your package.json which the extension can execute once to get rid of this message.`);
                }
            }
            return result.outputText;
        }
        finally {
            process.chdir(cwd);
        }
    }
    else {
        throw new Error(`Missing workspace. Please open a folder first`);
    }
}
exports.transpileTypescript = transpileTypescript;
function getTypescriptConfig(tsConfigFile, workspaceFolder) {
    const jsonString = (0, fs_1.readFileSync)(tsConfigFile, "utf-8");
    const json = JSON.parse(stripJsonComments(jsonString));
    const ts = require(path.join(workspaceFolder.uri.fsPath, "node_modules", "typescript"));
    const result = ts.convertCompilerOptionsFromJson(json.compilerOptions, path.dirname(tsConfigFile), path.basename(tsConfigFile));
    return result.options;
}
//# sourceMappingURL=transpile.js.map