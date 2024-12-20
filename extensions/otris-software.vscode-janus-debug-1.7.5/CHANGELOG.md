## Changelog

### 1.6.7
**UploadOnSave**:
* Add `mySubfolder/*.js` to `uploadManually`, then the scripts in `mySubfolder` will not be uploaded. At the moment only exactly this syntax works and only with `uploadManually`.

**Run Script**:
* After **Run Script**, the focus does not change to output console.

**Status Bar Color**:
* Set arbitrary foreground color by clicking on it. Works only for current session at the moment.

### 1.5.4
Typescript:
* If multiple tsconfig*.json files exists in the workspace, the extension will ask you now which one to use to transpile typescript files on upload.
* Upload script of a typescript file will now update the transpiled js file and the source map file (if configured in tsconfig)
* Upload script from folder now supports typescript files

### 1.5.1
* fixed typo in fileTypes.d.ts for ReferenceFields which contains an autotext

### 1.5.0
* added intellisense for register names
  * Intellisense in DocFile.getRegisterByName
  * Type declaration `declare type <FileTypeName>RegisterNames = "reg1" | "reg2"` added to `fileTypes.d.ts`
  * Added interface `RegisterPerFileTypeMapper` to reference the registers of a specific file type, e. g.
    ```ts
    function doFancyStuff<K extends keyof FileTypeMapper>(fileType: K, registerName: RegisterPerFileTypeMapper[K]);
    ```

### 1.2.0
* Improved generated fileTypes.d.ts
  * create a separate interface for the fields of a file type `<fileTypeName>Fields`, so you can e. g. create an object parameter in a function `createFile(fieldValues: Partial<MyFileTypeFields>): MyFileType`
  * field values were marked as optional, but they are not optional (because Documents will always provide the field values if you request a file)
  * Date and Timestamp fields are nullable
  * override the function getReferenceFile and setReferenceFile to improve the return value of that function

### 1.1.0
* Added **Typescript** support within the following actions
  * Upload script: When you hit "Upload script" or "Upload and debug script" on a typescript file, the typescript transpiler will be executed and the output will be uploaded to the DOCUMENTS server. You have to install typescript locally in your current opened project and must provide a tsconfig.json file in the root of your project.
  * Upload and debug script: Same changes as above described.
  * Run script: Command is now enabled for typescript files. The script has to be uploaded to the server before.
* Added **Source Map** support (currently only tested with typescript), so you can debug typescript files with the DOCUMENTS-Server like regular javascript files.
* Fixed the default value for the property `script` in the generated launch.json. For existing launch.json, you have to update the value to `${file}` if you wan't to use the `Launch-request` (it behaves exactly the same like `Upload and debug script`, but you can start the command with `F5` like you would normaly debug scripts with node.js).

### 1.0.71

* Fix .vscode-janus-debug file is always created on new project.

### 1.0.70

* Fix error handling when empty file in **upload scripts**.

### 1.0.65

* Show context properties and more DOCUMENTS types in debugger.

### 1.0.63

* Upload and Debug Script: wait for correct script to connect
* Upload and Debug Script: disconnect debugger when script finished
* Attach with Debugger: when `eval()` is used in script, the `debugger;` statement should be placed to line 1, show this information when required
* New Typings: otrAssert, otrLogger

### 1.0.56 (2020-02-10)

* Multi-Selection for Upload Scripts
  * multiple selected scripts can be uploaded by calling Upload Script
  * scripts from multiple selected folders can be uploaded by calling Upload Scripts from Folder

### 1.0.55 (2020-02-07)

* Upload script/folder: show conflict in status bar.
* Fix in debugging: context 0 (the first context after starting DOCUMENTS) could not be debugged.

### 1.0.54

* Debugging: if local and server source are different (meaning, line does not match), show the current executed lines from server
* Debugging required scripts: after stepping into required script, it is possible now to set a breakpoint into that script

### 1.0.53

* Add Command **Clear PortalScript Cache**, only via F1
* Some fixes in Upload and Debug

### 1.0.51

* XML Export will also download the Document Templates.
* Support of XML Import. This will also upload the corresponding Documents.

### 1.0.42 (2019-07-04)

* When scripts with same name in file system: debugger only asks when script is used
* Update PortalScript typings to 5.0e HF1
* Add typings for Gadget API and Client SDK and update typings for ScriptExtensions

### 1.0.41 (2019-06-03)

* Improved Wizard

### 1.0.39 (2019-05-03)

* The project was moved to GitLab
* When scripts with same name are found to attach, only scripts in state pause are considered.
* When upload and debug is used in a project with [Multi-root Workspaces](https://code.visualstudio.com/docs/editor/multi-root-workspaces), the launch.json couldn't be loaded. Now the debugger uses the same launch.json as the extension (this is at the moment the launch.json in the first workspace).

### 1.0.38 (2019-03-13)

* Handle broken symbolic links in workspace for several operations, e.g. "Upload Scripts from folder" and "Reload scripts"

### 1.0.37 (2019-02-22)

* Fix missing arrow in debugger, if local source not available.

### 1.0.36 (2019-01-08)

- Mangage files with same name in debugger. This files must be considered, because on server scriptnames are unique.

### 1.0.33 (2018-12-17)

- Support for XML-Export [see Wiki](https://github.com/otris/vscode-janus-debug/wiki/XML-Export)

### 1.0.26 (2018-11-19)

- Add options to terminate scripts ([see Wiki](https://github.com/otris/vscode-janus-debug/wiki/Terminating-scripts))
- Add option to pause scripts without `debugger;` statement on attach ([see Wiki](https://github.com/otris/vscode-janus-debug/wiki/Launching-the-Debugger#without-debugger-statement))

### 1.0.25 (2018-11-09)

- Debugger works now with multiple running scripts ([Issue](https://github.com/otris/vscode-janus-debug/issues/191))
- Mixing **Upload and Debug** and **Attach** with running scripts works now ([Issue](https://github.com/otris/vscode-janus-debug/issues/184))

### 1.0.24 (2018-10-29)

- Some fixes for **Upload and Debug Script**.

### 1.0.23 (2018-10-10)

- Fix updating variables in debugger again.

### 1.0.22 (2018-10-10)

- Fix bug with new vscode debugger api.

### 1.0.20 (2018-10-05)

- Fix updating variables in debugger.

### 1.0.19 (2018-10-02)

- Export XML:
  - One or all file types / portal scripts can be generated.
  - All file types / portal scripts can be generated in one or in seperate files.
  - See [Wiki](https://github.com/otris/vscode-janus-debug/wiki/XML-Export)

### 1.0.18 (2018-09-27)

- The script console is cleared when script is started. Can be turned off by setting `scriptConsole.clear = flase`.
- `openScriptConsoleOnRunScript` is deprecated now, instead `scriptConsole.open` was inserted.
- Fix for timeout. Now the timeout from `launch.json` is used in extension for the connection to the server.

### 1.0.17 (2018-09-25)

- First version of export XML is inserted (see [Issue 86](https://github.com/otris/vscode-janus-debug/issues/86))
- Some fixes in debugger (the current state of everything that we tested is described in [Wiki](https://github.com/otris/vscode-janus-debug/wiki/Launching-the-Debugger))

### 1.0.5 (2018-09-05)

- Show error message when unable to parse launch.json
- Some minor fixes

### 1.0.4 (2018-08-21)

- Only show warnings for categories when category feature is used.
- Avoid errors when using multi-root workspaces. There are still some problems with multi-root workspaces (see [#173](https://github.com/otris/vscode-janus-debug/issues/173))

### 1.0.3 (2018-07-10)

- Only update typings.

### 1.0.2 (2018-06-19)

- Add a first simple command for generateing portalScripts from typescript files.

### 1.0.1 (2018-06-13)

- Ability to clone a git repository to the typings folder instead of using the local portal scripting file.

### 1.0.0 (2018-05-30)

- Handle broken symlinks when reading a directory.

### 0.0.42 (2018-04-18)

- Starting the debugger in launch config was totally broken. This now works again with this release.
- Debugger: Display server sources when local source are not available or local sources are different from the server.

### 0.0.41 (2018-04-17)

- Added snippets for otris app.
- Fix showing functions, undefined variables, and arrays in the debugger again
- Upload & Debug: detach from debugger when script has finished (in some cases 😕)
- Debugger: source mapping heuristic is out again. Didn't make source mapping better.

### 0.0.40 (2018-04-16)

- Source mapping got a bit better. It now uses a little heuristic to compensate mismatches between client and server sources.
- "Stop" button works now again (immediately stops execution of the script and detaches the debugger). Was broken since a while.

### 0.0.39 (2018-04-14)

- Make debugging work again for very simple scripts. Fixes a regression introduced in 0.0.34.

### 0.0.38 (2018-04-14)
- Windows: fix an issue that prevents local source files from being loaded because of wrong file paths.

### 0.0.37 (2018-04-14)
- Fix the 'no provider for'-error that popped up when doing a remote debugging session and no local source file could be found that matches the script executed on the server.

### 0.0.36 (2018-04-13)

- The command **Show Imports** shows the source code of the script and additional the source code of all scripts that are included with `#include`. Now this source code is shown in an untitled file with JavaScript Syntax Highlighting.
- When conflict mode is used, not only the source code is checked on server, but also the category.
- Server name is shown in output of **Run Script** and **Show DOCUMENTS Version**.

### 0.0.35 (2018-04-12)

- Fix for **Run Script**

### 0.0.34 (2018-04-11)

- Added a new **Upload and Debug Script** command that allows you to debug a script on a DOCUMENTS 5.0d server.
- Added source mapping that allows you to debug a remote script while having the debugger step through your *local* files.

### 0.0.33 (2018-04-10)

- Check added in **Upload Scripts from Folder**: if the folder contains two scripts with same name, a warning is shown and the user can cancel the upload. Scripts with same name are not allowed on DOCUMENTS, not even if they are in categories.

### 0.0.32 (2018-03-09)

- [Using Categories as Subfolders](https://github.com/otris/vscode-janus-debug/wiki/Using-Categories-as-Subfolders)
- Some fixes

### 0.0.31 (2018-02-01)

- Improved documentation and typings.
- Wizard to download scripts and create a project containing the downloaded scripts.
- The command **Install IntelliSense: PortalScript** optionally gets the type definition file for PortalScripting in specific DOCUMENTS version. Old versions are generated, newer versions are stored in the extension.


### 0.0.30 (2018-01-18)

- The command **Install IntelliSense** additionally installs the typings for the ScriptExtensions `scriptExtensions.d.ts`. Both files `portalScripting.d.ts` and `scriptExtensions.d.ts` were generated using node module **jsdoc** with template [**@otris/jsdoc-tsd**](https://www.npmjs.com/package/@otris/jsdoc-tsd).

### 0.0.29 (2018-01-12)

Only small changes:
- Server console is not connected on default anymore.
- Some commands have been renamed and are visible more often.

### 0.0.28 (2018-01-12)

Following features have been added:
- Setting `vscode-janus-debug.encryptOnUpload` is deprecated now. Instead `vscode-janus-debug.encryptionOnUpload` should be used. This new setting has three possible values.
  - `"default"`: the script will be encrypted on upload, if it is encrypted on server or conains `// #crypt`
  - `"always"`: the script will be encrypted on upload in any case
  - `"never"`: the script will be kept unencrypted on upload in any case

### 0.0.27 (2017-12-18)

Following features have been added:
- Command **Download Scripts Inside Folder** was added. With this command, only the scripts that are already inside the folder, are downloaded.
- Command **Show Imports** was added. This command shows the source code of the script and of all imported scripts in output.
- In the typings file `fileTypes.d.ts` the type definition `FileTypes` was inserted. This type is a union type of all file types.


### 0.0.26 (2017-12-04)

Only clean-up and fix link in command **View Documentation In Browser**.

### 0.0.25 (2017-28-11)

Following bugs have been addressed in this release:

- Debugger: launching scripts on a remote server got exactly 3 seconds faster because we could remove a now unnecessary synchronization point (``).

### 0.0.24 (2017-11-14)

Following features have been added:

- Parameters are uploaded and downloaded together with script, if flag `vscode-janus-debug.scriptParameters` is set (DOCUMENTS 5.0c HF1 required).

Following bugs have been addressed in this release:

- Debugger: fixed creating a new `launch.json` with VS Code 1.18.0. The way how initial configurations where constructed was deprecated with 1.17.0 and removed in 1.18.0, making it impossible to create a `launch.json` file in a new project. This works again now (`576daf8`).
- Fix warning showing up on any up- or download

### 0.0.23 (2017-11-08)

Following features and bugs have been addressed in this release:

- Improved fileTypes.d.ts: fields have types now (available in DOCUMENTS 5.0c HF1 or #8044).

- Some improved error messages.

- In command **Compare Script**, the script is not synchronized anymore (hash value of source code is not set, so changes on server will still be recognized on next upload after **Compare Script**).

- Fix stopOnEntry in debugger.

### 0.0.22 (2017-10-20)

New Features in this release:

- Tho command *Show Documentation In Browser* was improved.


### 0.0.21 (2017-10-06)

New Features in this release:

- IntelliSense for parameter values in `setFieldValue` and `getFieldValue` is available (with ctrl + space inside quotes).

- IntelliSense for adding jsDoc with `@types{}` was added to variables.

- `class util` and functions `convertDateToString` and `convertStringToDate` was added to command **View Documentation In Browser**.

- Command **Download Script** in explorer context menu is available in workspace folder.

- Command **Show DOCUMENTS Version** inserted.

Following bugs have been addressed in this release:

- Create `launch.json` in empty project has been fixed.

- *Install Intellisense: FileTypes* in empty project has been fixed.

### 0.0.20 (2017-10-06)

### 0.0.19 (2017-10-06)

### 0.0.18 (2017-10-04)

New Features in this release:

- **View Documentation In Browser** works for `class context`.

Following bugs have been addressed in this release:

- Credentials are asked, if the `launch.json` doesn't contain a ``currentConfiguration`` flag, even if only one configuration was available.

- `launch.json` was overwritten after entering the credentials.

### 0.0.17 (2017-10-02)

New Features in this release:

- The DOCUMENTS version is written to script console on every run.

- The script returnValue can now be written to a file. Just `vscode-janus-debug.scriptLog.fileName` and `vscode-janus-debug.scriptLog.returnValue` have to be set.

- Remove `noLib: true` entry in `jsconfig.json`.

Following bugs have been addressed in this release:

- Change password didn't work correctly when password was not written to launch.json.

### 0.0.16 (2017-09-27)

Fix run active script.

### 0.0.15 (2017-09-27)

New Features in this release:

- IntelliSense for file types (beta version). Use command **Get fileTypes.d.ts** and make sure you have a valid `jsconfig.json`. Then you will get IntelliSense for file types by using `context.createFile(" <Ctrl + Space + choose suggenstion> ")` or by adding `/** @types{FileType} */` to DocFile objects.
- For commands **Run Script** and **Download Script** it is now possible to choose the script from a list of available scripts on server.

Following bugs have been addressed in this release:

- **Upload All** works again, if the folders contain files that are not JavaScript files.

### 0.0.14 (2017-09-22)

### 0.0.13 (2017-09-22)

Only one fix. It's now possible again to upload scripts without checking them on server by setting `vscode-janus-debug.forceUpload` to `true`.

### 0.0.12 (2017-09-19)

Only fix error `Cannot write to settings.json`

### 0.0.11 (2017-09-19)

New Features in this release:

- The conflict mode is now the default state of all scripts, meaning every script will be checked on upload if it has been changed on server.

- Add ``noLib: true`` to ``compilerOptions`` part in ``jsconfig.json`` when command **Install Intellisense Files** is executed.

- TypeScript 2.5 is now used to generate JavaScript.

- The version of the remote debugging engine is now logged in the VS Code extension's log files. This way we can see what version of debugging engine the Debugger is running against.

- It's possible now to have multiple configurations for different servers in ``jsconfig.json``. The extension will use the configuration where ``currentConfiguration`` is set to ``true`` for uploading and downloading scripts.

- **Get Script Paramaters** downloads the script parameters as JSON string into one file per script.

Following bugs have been addressed in this release:

- Download all to workspace root folder is now possible again.


### 0.0.10 (2017-08-22)

New Features in this release:

 - Users can now use keyboard shortcuts for uploading, running, uploading and running, and uploading from ts to js ([#84](https://github.com/otris/vscode-janus-debug/issues/84)).

 - The command `Upload Scripts From Folder` will upload scripts from folder and all subfolders ([#72](https://github.com/otris/vscode-janus-debug/issues/72)).

 - Flag `vscode-janus-debug.uploadOnSaveGlobal` will be saved in **User Settings**.

Following bugs have been addressed in this release:
 - The server console was not reconnecting after the launch.json was changed ([#103](https://github.com/otris/vscode-janus-debug/issues/103)).
 - Answer `Never upload automatcally` in dialog after saving `.js` file didn't work corryctly.

### 0.0.9 (2017-07-19)

New Features:

- Users can connect and disconnect the ServerConsole using the command palette now. Two new commands have been added: _Connect ServerConsole_ and _Disconnect ServerConsole_ ([#48](https://github.com/otris/vscode-janus-debug/issues/48)).

![Screenshot](https://gitlab.otris.de/tools/vscode-janus-debug/raw/master/img/connect-server-console.png "Screenshot")

- And one for the hackers: File logging is now additionally available in the extension process of VS Code and not only in the debug adapter process. To activate this feature you have to add `"vscode-janus-debug.log"` to your settings ([#30](https://github.com/otris/vscode-janus-debug/issues/30)).

- The configuration name for the extension settings in `settings.json` is now `"vscode-janus-debug"` instead of `"vscode-documents-scripting"`. The user has to change the name for any list in `settings.json`.

- Command for installing IntelliSense files.

- The debugger can now "Step Out" (Shift+F11) of a function. Just make sure you have the latest DOCUMENTS/JANUS server running ([#68](https://github.com/otris/vscode-janus-debug/issues/68)). Thanks [@PhilippRo](https://github.com/PhilippRo).

Fixes in this release:

- Fix problems with encrypted scripts again. It's not possible anymore to upload or download encrypted scripts. Scripts can only be encrypted on upload or decrypted on download. ([#64](https://github.com/otris/vscode-janus-debug/issues/64))

- Fix upload script via command palette. Now the extension will ask for the scriptname again, if upload script is called while another script is open in VS Code.

### 0.0.8 (2017-07-07)

New Features:

- Users can now write DOCUMENTS scripts in [TypeScript](https://www.typescriptlang.org/) and then use the command `Upload JS from TS` to compile the TypeScript file and upload the corresponding JavaScript ([#55](https://github.com/otris/vscode-janus-debug/issues/55)).
- Users can now download a script from the server via the context menu when using right-click on a folder.
- Users will be asked before passwords will be written in plain-text to the project's `launch.json` file.
- The extension comes with a lovely icon now 👊 ([#31](https://github.com/otris/vscode-janus-debug/issues/31)).

Following issues have been fixed in this release:

  - The debugger stops now immediately when a breakpoint is hit or the script halts ([#57](https://github.com/otris/vscode-janus-debug/issues/57)).
  - The version and commit number are now printed out on the console when the extension is activated ([#39](https://github.com/otris/vscode-janus-debug/issues/39)).
  - Users can now change all network related timeouts from within `launch.json` file ([#51](https://github.com/otris/vscode-janus-debug/issues/51)). Previously, not all timeouts where configurable.
  - Some minor errors have been fixed when a new `launch.json` is created when the user uploads a script the first time. ([5c45fa0](https://github.com/otris/vscode-janus-debug/commit/5c45fa0ee06c19ca2b1f1641cdce89e200175c16)).

### 0.0.7 (2017-07-07)

Accidentally released.

### 0.0.6 (2017-06-21)

Besides the usual minor fixes and corrections, this release adds the new Server Console output. This allows you to see the server's log lines directly in VS Code! (For more info, see this PR: [#47](https://github.com/otris/vscode-janus-debug/pull/47)).

### 0.0.5 (2017-06-02)

Most notable in this release: We have merged _vscode-documents-scripting_ and _vscode-janus-debug_ extensions into one single extension. Users do not need to install multiple extensions anymore to get the full experience. We hope that this makes development much easier and faster.

Lots of bugs have been fixed in this release:

  - Setting breakpoints is more reliable now ([#12](https://github.com/otris/vscode-janus-debug/issues/12)). Thanks to [ChDxterWard](https://github.com/ChDxterWard).
  - Fixed problems with encrypted and decrypted scripts. The encryption states are now read from DOCUMENTS server prior to every upload. The `// #crypt` entry in a script should work now as expected.
  - Fixed an issue that prevented connecting the debugger to a DOCUMENTS 5 server ([#23](https://github.com/otris/vscode-janus-debug/issues/23)). Sorry!

### 0.0.4 (2017-05-17)

This release includes two important bug fixes that make creating a launch.json file and connecting to a remote server much more reliable.

### 0.0.3 (2017-05-08)

No big changes. Timeouts are configurable via launch.json now.

### 0.0.2 (2017-03-22)

Initial release of the extension. Running and debugging simple scripts directly from within VS Code on a JANUS-based server works! 🎉
