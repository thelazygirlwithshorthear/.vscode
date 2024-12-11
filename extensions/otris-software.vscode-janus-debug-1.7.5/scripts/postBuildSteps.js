const { exec, execSync } = require('child_process');
const fs = require('fs-extra');
const path = require("path");

const commitLength = 6;

function determineExtensionVersion() {
    return new Promise((resolve, reject) => {
        exec(`"git" describe --abbrev=${commitLength} --dirty --always --tags --long`, function(err, stdout, stderr) {
            if (err) {
                return reject(err);
            } else {
                let output = stdout.split("-");
                if (output && output.length >= 3) {
                    let newestTag = output[0];
                    let numbers = newestTag.split(".");
                    let commit = output[2].substr(1, commitLength);
                    return resolve({
                        commit: commit,
                        major: numbers[0],
                        minor: numbers[1],
                        patch: numbers[2]
                    });
                } else {
                    return reject();
                }
            }
        })
    });
}


function writeExtensionVersionToJson() {

    determineExtensionVersion().then((version) => {
        fs.open('out/src/extensionVersion.json', 'w', (err, fd) => {
            if (err) {
                throw err;
            }

            let jsonObj = {
                commit: version.commit,
                major: version.major,
                minor: version.minor,
                patch: version.patch,
            }

            fs.write(fd, JSON.stringify(jsonObj), (err) => {
                if (err) {
                    console.log(err);
                    throw err;
                }
            });
        });
    });
}

const mapping = [
    {buildNo: 8504, version: "6.0"},
];

function copyTypings() {
    const modules = [
        "@documents/portal-scripting",
        "@types/documents-client-sdk",
        "@documents/gadget",
        "@documents/scriptextensions"
    ];

    let registryOtrisEnv = process.env;
    registryOtrisEnv.npm_config_registry = "https://registry.otris.de";
    execSync(`npm install --no-save ${modules.join(" ")}`, {env: registryOtrisEnv});
    fs.copySync(path.join("node_modules", "@documents/portal-scripting", "public"), path.join("typings", "6.0"));
    fs.copySync(path.join("node_modules", "@types/documents-client-sdk", "dist", "public", "typings"), path.join("typings", "6.0"));
    fs.copySync(path.join("node_modules", "@documents/gadget", "dist", "public", "typings"), path.join("typings", "6.0"));
    fs.copySync(path.join("node_modules", "@documents/scriptextensions", "dist", "public", "typings"), path.join("typings", "6.0"));
    execSync(`npm uninstall ${modules.join(" ")}`);

    fs.writeFileSync("out/src/documentsVersion.json", JSON.stringify({mapping}));
}

copyTypings();
writeExtensionVersionToJson();
