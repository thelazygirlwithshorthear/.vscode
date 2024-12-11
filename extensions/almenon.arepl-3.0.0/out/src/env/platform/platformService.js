// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformService = void 0;
const os = require("os");
const platform_1 = require("../utils/platform");
const constants_1 = require("./constants");
class PlatformService {
    constructor() {
        this.osType = (0, platform_1.getOSType)();
    }
    get pathVariableName() {
        return this.isWindows ? constants_1.WINDOWS_PATH_VARIABLE_NAME : constants_1.NON_WINDOWS_PATH_VARIABLE_NAME;
    }
    get virtualEnvBinName() {
        return this.isWindows ? 'Scripts' : 'bin';
    }
    get isWindows() {
        return this.osType === platform_1.OSType.Windows;
    }
    get isMac() {
        return this.osType === platform_1.OSType.OSX;
    }
    get isLinux() {
        return this.osType === platform_1.OSType.Linux;
    }
    get osRelease() {
        return os.release();
    }
    get is64bit() {
        // tslint:disable-next-line:no-require-imports
        const arch = require('arch');
        return arch() === 'x64';
    }
}
exports.PlatformService = PlatformService;
//# sourceMappingURL=platformService.js.map