"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseEntryPoint = void 0;
const fs = require("fs");
const path_1 = require("path");
/**
 * Get 'main' property from given package.json if there is a such a property in that file.
 *
 * @param packageJsonPath {string} The absolute path to the package.json file
 */
function parseEntryPoint(packageJsonPath) {
    let entryPoint;
    try {
        const jsonContent = fs.readFileSync(packageJsonPath, 'utf8');
        const jsonObject = JSON.parse(jsonContent);
        if (jsonObject.main) {
            entryPoint = jsonObject.main;
        }
        else if (jsonObject.scripts && typeof jsonObject.scripts.start === 'string') {
            entryPoint = jsonObject.scripts.start.split(' ').pop();
        }
        if (entryPoint !== undefined) {
            entryPoint = (0, path_1.isAbsolute)(entryPoint) ? entryPoint : (0, path_1.join)('${workspaceRoot}', entryPoint);
        }
    }
    catch (err) {
        // Silently ignore any error. We need to provide an initial configuration whether we have found the
        // main entry point or not.
    }
    return entryPoint;
}
exports.parseEntryPoint = parseEntryPoint;
//# sourceMappingURL=config.js.map