# vscode-janus-debug

Visual Studio Code **Debugger** and **Extension** for developing and debugging JavaScript on DOCUMENTS 5.0.

For further information about this extension see the manual on the internal otris documentation site.

## Debugger

The debugger allows you to debug PortalScripts on a DOCUMENTS 5 server, meaning to

* **launch** a script from within VS Code for debugging it on the server
* **attach** to a script that is already running on server
* use **breakpoints** in a script or to **step** through the code
* watch script values in the **WATCH** section of the VS Code Debug View

![Screenshot](https://gitlab.otris.de/tools/vscode-janus-debug/raw/master/img/debugger.gif "Screenshot")

* view some important PortalScripting variables in the **VARIABLES** section

![Screenshot](https://gitlab.otris.de/tools/vscode-janus-debug/raw/master/img/debugger-variables.png "Screenshot")

* If you want to know more about the remote SpiderMonkey debugger and the protocol that is used to communicate with it, see [jsrdbg](https://github.com/swojtasiak/jsrdbg).

## Extension

The extension includes lots of additional features that ease the development, especially on DOCUMENTS 5, e.g.

* Uploading, downloading and executing PortalScripts.
* Generating [`d.ts` files](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html) for getting [IntelliSense](https://code.visualstudio.com/docs/nodejs/working-with-javascript#_intellisense) for DOCUMENTS projects.
* Downloading the XML files of PortalScripts or FileTypes.

## Requirements

* The extension is compatible with documents 5.0b and newer.
* The debugger is compatible with documents 5.0d and newer.

## Support

If you have any problems please contact support@otris.de

## Legal Notice

This Visual Studio Code extension is developed by otris software AG and was initially released in March 2017. It is licensed under the MIT License, (see [LICENSE file](https://gitlab.otris.de/tools/vscode-janus-debug/LICENSE)).

## About otris software AG

As a software-based data and document management specialist, otris software AG supports company decision-makers in realizing management responsibilities. The solutions from otris software are available for this purpose. They can be used track, control and document all administrative processes completely and with full transparency. otris software is based in Dortmund, Germany.

For more information about otris software AG visit our website [otris.de](https://www.otris.de/).

**Enjoy!**
