"use strict";
/**
 * This file contains all functions that prepare the scripts-struct
 * before uploading/downloading it.
 *
 * The vscode module should not be imported here anymore, because
 * all the functions here should be tested with the mocha tests.
 *
 * ToDo:
 * * Create a type "configurations" with a member for any setting
 *   and for the used working folder.
 *   Settings and working folder must be read in "extension.ts" at
 *   the beginning of every command.
 * * Add tests!
 */
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
exports.scriptLog = exports.updateHashValues = exports.readHashValues = exports.setConflictModes = exports.readEncryptionFlag = exports.writeScriptInfoJson = exports.getScriptInfoJson = exports.setScriptInfoJson = exports.foldersToCategories = exports.categoriesToFolders = exports.getCategoryFromPath = void 0;
const nodeDoc = require("node-documents-scripting");
const os = require("os");
const path = require("path");
const helpers = require("./helpers");
// tslint:disable-next-line:no-var-requires
const fs = require('fs-extra');
const invalidCharacters = /[\\\/:\*\?"<>\|]/;
const CATEGORY_FOLDER_POSTFIX = '.cat';
function getCategoryFromPath(confCategories, parampath) {
    if (confCategories !== true)
        return undefined;
    if (!parampath)
        return undefined;
    const ext = path.extname(parampath);
    const dir = (ext.match(/\.m?js$/) !== null || ext === ".ts") ? path.dirname(parampath) : parampath;
    if (!dir.endsWith(CATEGORY_FOLDER_POSTFIX))
        return undefined;
    const postfixPos = dir.lastIndexOf(CATEGORY_FOLDER_POSTFIX);
    return path.normalize(dir.slice(0, postfixPos)).split(path.sep).pop();
}
exports.getCategoryFromPath = getCategoryFromPath;
/**
 * @param serverInfo to be removed
 */
function categoriesToFolders(confCategories, documentsVersion, scripts, targetDir) {
    if (confCategories !== true) {
        return [];
    }
    if (Number(documentsVersion) < Number(nodeDoc.VERSION_CATEGORIES)) {
        return [];
    }
    const invalidNames = [];
    const category = getCategoryFromPath(confCategories, targetDir);
    if (category) {
        // the target folder is a category-folder
        // only save scripts from this category
        scripts.forEach((script) => {
            if (script.category === category) {
                script.path = path.join(targetDir, script.name + '.js');
            }
            else {
                script.path = "";
            }
        });
    }
    else {
        // the target folder is not a category-folder
        // create folders from categories
        scripts.forEach((script) => {
            if (script.category) {
                if (invalidCharacters.test(script.category)) {
                    path.parse(script.category);
                    script.path = "";
                    invalidNames.push(script.category);
                }
                else {
                    script.path = path.join(targetDir, script.category + CATEGORY_FOLDER_POSTFIX, script.name + '.js');
                }
            }
        });
    }
    return invalidNames;
}
exports.categoriesToFolders = categoriesToFolders;
/**
 * @param serverInfo to be removed
 */
function foldersToCategories(confCategories, serverInfo, scripts) {
    if (confCategories !== true) {
        return;
    }
    if (Number(serverInfo.documentsVersion) < Number(nodeDoc.VERSION_CATEGORIES)) {
        return;
    }
    scripts.forEach((script) => {
        if (script.path) {
            script.category = getCategoryFromPath(confCategories, script.path);
        }
    });
}
exports.foldersToCategories = foldersToCategories;
function setScriptInfoJson(scriptParameters, workspaceFolder, scripts) {
    if (!scriptParameters) {
        return;
    }
    if (!workspaceFolder) {
        return;
    }
    // loginData.language = nodeDoc.Language.English;
    scripts.forEach((script) => {
        const infoFile = path.join(workspaceFolder, '.scriptParameters', script.name + '.json');
        try {
            script.parameters = fs.readFileSync(infoFile, 'utf8');
        }
        catch (err) {
            //
        }
    });
}
exports.setScriptInfoJson = setScriptInfoJson;
function getScriptInfoJson(scriptParameters, scripts) {
    if (!scriptParameters) {
        return;
    }
    // loginData.language = nodeDoc.Language.English;
    scripts.forEach((script) => {
        script.downloadParameters = true;
    });
}
exports.getScriptInfoJson = getScriptInfoJson;
function writeScriptInfoJson(scriptParameters, workspaceFolder, scripts) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!scriptParameters) {
            return;
        }
        if (!workspaceFolder) {
            return;
        }
        scripts.forEach((script) => __awaiter(this, void 0, void 0, function* () {
            if (script.parameters) {
                const parpath = path.join(workspaceFolder, '.scriptParameters', script.name + '.json');
                yield nodeDoc.writeFileEnsureDir(script.parameters, parpath);
            }
        }));
    });
}
exports.writeScriptInfoJson = writeScriptInfoJson;
function readEncryptionFlag(encryptOnUpload, encryptionOnUpload, pscripts) {
    if (encryptOnUpload) {
        pscripts.forEach((script) => {
            script.encrypted = 'decrypted';
        });
    }
    else if (encryptionOnUpload) {
        switch (encryptionOnUpload) {
            case "always":
                pscripts.forEach((script) => {
                    script.encrypted = 'decrypted';
                });
                break;
            case "never":
                pscripts.forEach((script) => {
                    script.encrypted = 'forceFalse';
                });
                break;
            case "default":
            default:
                pscripts.forEach((script) => {
                    script.encrypted = 'false';
                });
                break;
        }
    }
    else {
        pscripts.forEach((script) => {
            script.encrypted = 'false';
        });
    }
}
exports.readEncryptionFlag = readEncryptionFlag;
function setConflictModes(forceUpload, pscripts) {
    if (!forceUpload) {
        return;
    }
    // read values
    pscripts.forEach((script) => {
        script.conflictMode = false;
    });
}
exports.setConflictModes = setConflictModes;
/**
 * Reads the conflict mode and hash value of any script in pscripts.
 */
function readHashValues(forceUpload, workspaceFolder, pscripts, server) {
    if (0 === pscripts.length) {
        return;
    }
    if (!workspaceFolder) {
        return;
    }
    // when forceUpload is true, this function is unnecessary
    if (forceUpload) {
        return;
    }
    // filename of cache file CACHE_FILE
    const hashValueFile = path.join(workspaceFolder, helpers.CACHE_FILE);
    // get hash values from file as array
    let hashValues;
    try {
        hashValues = fs.readFileSync(hashValueFile, 'utf8').trim().split('\n');
    }
    catch (err) {
        if (err && typeof err === "object" && err["code"] === "ENOENT") {
            hashValues = [];
            fs.writeFileSync(hashValueFile, '');
        }
        else {
            return;
        }
    }
    // read hash values of scripts in conflict mode
    pscripts.forEach((script) => {
        hashValues.forEach((value, idx) => {
            const scriptpart = value.split(':')[0];
            const scriptAtServer = script.name + '@' + server;
            if (scriptpart === scriptAtServer) {
                script.lastSyncHash = hashValues[idx].split(':')[1];
            }
        });
    });
}
exports.readHashValues = readHashValues;
function updateHashValues(forceUpload, workspaceFolder, pscripts, server) {
    if (0 === pscripts.length) {
        return;
    }
    if (!workspaceFolder) {
        return;
    }
    if (forceUpload) {
        return;
    }
    // filename of cache file CACHE_FILE
    const hashValueFile = path.join(workspaceFolder, helpers.CACHE_FILE);
    let hashValues;
    try {
        // get hash values from file as array
        hashValues = fs.readFileSync(hashValueFile, 'utf8').trim().split('\n');
    }
    catch (err) {
        if (err && typeof err === "object" && err["code"] === "ENOENT") {
            hashValues = [];
            fs.writeFileSync(hashValueFile, '');
        }
        else {
            return;
        }
    }
    // set hash values of scripts in conflict mode
    pscripts.forEach((script) => {
        const scriptAtServer = script.name + '@' + server;
        const entry = scriptAtServer + ':' + script.lastSyncHash;
        // search entry
        let updated = false;
        hashValues.forEach((value, idx) => {
            const scriptpart = value.split(':')[0];
            if (scriptpart === scriptAtServer) {
                hashValues[idx] = entry;
                updated = true;
            }
        });
        // create new entry
        if (!updated) {
            hashValues.push(entry);
        }
    });
    // write to CACHE_FILE
    const hashValStr = hashValues.join('\n').trim();
    fs.writeFileSync(hashValueFile, hashValStr);
}
exports.updateHashValues = updateHashValues;
function scriptLog(scriptLog, workspaceFolder, scriptOutput) {
    if (!scriptOutput || 0 >= scriptOutput.length) {
        return;
    }
    if (!scriptLog || !scriptLog.returnValue) {
        return;
    }
    let returnValue = '';
    const lines = scriptOutput.replace('\r', '').split('\n');
    lines.forEach(function (line) {
        if (line.startsWith('Return-Value: ')) {
            returnValue = line.substr(14) + os.EOL;
        }
    });
    if (returnValue.length > 0 && scriptLog.fileName && workspaceFolder) {
        const fileName = scriptLog.fileName.replace(/[$]{workspaceRoot}/, workspaceFolder);
        if (!scriptLog.append) {
            fs.writeFileSync(fileName, returnValue, { flag: "a" });
        }
        else {
            fs.writeFileSync(fileName, returnValue);
        }
    }
}
exports.scriptLog = scriptLog;
//# sourceMappingURL=settings.js.map