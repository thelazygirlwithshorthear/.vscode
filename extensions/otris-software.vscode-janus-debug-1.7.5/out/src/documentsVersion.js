"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVersion = void 0;
function getVersion(buildNo) {
    const mapping = require("./documentsVersion.json").mapping;
    let version = mapping[0].version;
    if (buildNo && buildNo.length > 0) {
        const currentBuildNo = parseInt(buildNo.replace('#', ''), 10);
        if (!isNaN(currentBuildNo)) {
            let i = 0;
            for (; i < mapping.length - 1; i++) {
                if (currentBuildNo >= mapping[i].buildNo)
                    break;
            }
            version = mapping[i].version;
        }
    }
    return version;
}
exports.getVersion = getVersion;
//# sourceMappingURL=documentsVersion.js.map