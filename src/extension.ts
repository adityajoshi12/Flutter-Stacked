// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { FileSystemManager } from "./utils/file_system_manager";
import { VsCodeActions } from "./utils/vs_code_actions";
import _ = require("lodash");
import { Utils } from "./utils/utils";
import { ViewFile } from "./utils/view_file";
import { Architecture } from "./utils/architecture";
import path = require("path");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "stacked-mvvm" is now active!');

  let viewDisposable = vscode.commands.registerCommand(
    "stacked-mvvm.createViews",
    async () => {
      if (!FileSystemManager.isFlutterProject()) {
        return;
      }

      let inputString = await VsCodeActions.getInputString(
        "Enter class name",
        async (value) => {
          if (value.length === 0) {
            return "Enter class name";
          }

          if (value.toLowerCase() === "view") {
            return "View is not a valid class name";
          }

          return undefined;
        }
      );

      if (inputString.length === 0 || inputString.toLowerCase() === "view") {
        console.warn("activate: inputString length is 0");
        VsCodeActions.showErrorMessage("Invalid name for file");
        return;
      }

      console.debug(`fileName: { ${inputString} }`);

      let nameArray = inputString.trim().split("/");
      let folders: string[] = [];
      if (nameArray.length > 1) {
        let folderList = nameArray
          .splice(0, nameArray.length - 1)
          .map((element) => {
            return element;
          });
        console.debug(`folderlist: { ${folderList} }`);
        folders = folderList;
      }

      let formattedInputString = _.last(nameArray);
      if (formattedInputString === undefined) {
        console.error("formattedInputString is undefined");
        return;
      }
      let fileName = Utils.processFileName(formattedInputString);
      console.debug(`activate: fileName: ${fileName}`);

      let rootPath = VsCodeActions.rootPath;
      if (rootPath === undefined) {
        return;
      }
      new ViewFile(rootPath, fileName, folders).createResponsiveViews();
    }
  );

  let initializeDisposable = vscode.commands.registerCommand(
    "stacked-mvvm.initializeArchitecture",
    async () => {
      if (!FileSystemManager.isFlutterProject()) {
        return;
      }

      let rootPath = VsCodeActions.rootPath;
      if (_.isUndefined(rootPath)) {
        return;
      }
      new Architecture(path.join(rootPath, "lib")).init();
      new ViewFile(rootPath, "home",["ui","views"]).createDemoViews();
    }
  );

  context.subscriptions.push(viewDisposable);
  context.subscriptions.push(initializeDisposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
