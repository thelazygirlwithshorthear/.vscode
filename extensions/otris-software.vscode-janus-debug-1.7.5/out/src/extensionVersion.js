"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVersion = exports.setExtensionPath = exports.Version = void 0;
const fs = require("fs");
class Version {
    static developmentVersion() {
        return new Version("", "", "", "");
    }
    constructor(major, minor, patch, commit) {
        this.major = major;
        this.minor = minor;
        this.patch = patch;
        this.commit = commit;
    }
    toString(includeCommit = false) {
        if (!this.major) {
            return "devel";
        }
        else {
            const returnString = this.major + "." + this.minor + "." + this.patch;
            if (includeCommit) {
                return returnString + " (" + this.commit + ")";
            }
            return returnString;
        }
    }
}
exports.Version = Version;
let extensionVersion;
let extensionPath;
function setExtensionPath(path) {
    extensionPath = path;
}
exports.setExtensionPath = setExtensionPath;
function getVersion() {
    if (extensionVersion) {
        return extensionVersion;
    }
    else {
        if (extensionPath !== undefined) {
            try {
                const data = fs.readFileSync(extensionPath + "/out/src/extensionVersion.json", { encoding: "utf-8", flag: "r" });
                const obj = JSON.parse(data);
                extensionVersion = new Version(obj.major, obj.minor, obj.patch, obj.commit);
                return extensionVersion;
            }
            catch (err) {
                if (err && typeof err === "object" && err["code"] === "ENOENT") {
                    return Version.developmentVersion();
                }
                throw new Error(err instanceof Error ? err.message : "unkonw error type");
            }
        }
        return Version.developmentVersion();
    }
}
exports.getVersion = getVersion;
//# sourceMappingURL=extensionVersion.js.map