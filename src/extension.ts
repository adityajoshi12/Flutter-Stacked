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

var spawnCMD = require('spawn-command');
import { WidgetFile } from './utils/widget_file';
import { Router } from "./dart_snippets/architecture/router";
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
      let rootPath = VsCodeActions.rootPath;
      let archInitalized = FileSystemManager.doesFileExist(rootPath, "lib/core/locator.dart");
      if (!archInitalized) {
        VsCodeActions.showErrorMessage("Flutter Stacked is not initialized.\nRun Flutter Stacked:Initialize Stacked");
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
      let folders: string[] = ["ui", "views"];
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

      if (rootPath === undefined) {
        return;
      }
      new ViewFile(rootPath, fileName, folders).createResponsiveViews();
      Utils.buildRunner(rootPath);
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
      new ViewFile(rootPath, "home", ["ui", "views"]).createDemoViews();
      new Router("router.dart");
      Utils.buildRunner(rootPath);
    }
  );


  let widgetDisposable = vscode.commands.registerCommand('stacked-mvvm.createWidgets', async () => {

    if (!FileSystemManager.isFlutterProject()) { return; }

    let rootPath = VsCodeActions.rootPath;
    let archInitalized = FileSystemManager.doesFileExist(rootPath, "lib/core/locator.dart");
    if (!archInitalized) {
      VsCodeActions.showErrorMessage("Flutter Stacked is not initialized.\nRun Flutter Stacked:Initialize Stacked");
      return;
    }
    let inputString = await VsCodeActions.getInputString('Enter class name', async (value) => {
      if (value.length === 0) {
        return 'Enter class name';
      }
      if (value.toLowerCase() === 'widget') {
        return 'Widget is not a valid class name';
      }
      return undefined;
    });

    if (inputString.length === 0 || inputString.toLowerCase() === 'widget') {
      console.warn("activate: inputString length is 0");
      VsCodeActions.showErrorMessage("Invalid name for file");
      return;
    }

    let fileName = Utils.processFileName(inputString.trim());
    console.debug(`activate: fileName: ${fileName}`);

    if (rootPath === undefined) { return; }
    new WidgetFile(rootPath, fileName).createResponsiveWidgets();
    Utils.buildRunner(rootPath);
  });

  context.subscriptions.push(viewDisposable);
  context.subscriptions.push(initializeDisposable);
  context.subscriptions.push(widgetDisposable);
}

export function deactivate() { }


function execShellCMD(cwd: string) {
  exec('flutter pub run build_runner build --delete-conflicting-outputs', cwd);

}

function exec(cmd: string, cwd: string) {
  if (!cmd) { return; }


  run(cmd, cwd).then(() => {

  }).catch((reason) => {

    vscode.window.showErrorMessage(reason, 'Show Output');
  });
}


function run(cmd: string, cwd: string) {
  return new Promise((accept, reject) => {
    var opts: any = {};
    if (vscode.workspace) {
      opts.cwd = cwd;
    }
    process = spawnCMD(cmd, opts);
    accept();
  });
}