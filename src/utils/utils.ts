import * as vscode from 'vscode';
import _ = require('lodash');
import * as shell from 'shelljs';
import { exec } from 'child_process';
const cp = require('child_process');
export class Utils {
    public static isValidClassName(className: string): string | undefined {
        if (className.length === 0) {
            return "File name should have atleast 1 character";
        }
        if (className.toLowerCase() === "view") {
            return "View is not a valid file name";
        }

        if (className.toLowerCase() === "widget") {
            return "Widget is not a valid file name";
        }

        if (
            !className
                .substring(0, 1)
                .match(new RegExp("([a-zA-Z$][w$]*.)*[a-zA-Z_$][w$]*"))
        ) {
            return "Invalid class name format";
        }
        return undefined;
    }

    public static openFile(filePath: string) {
        console.info(`openFile: ${filePath}`);
        let openPath = vscode.Uri.file(filePath);

        vscode.workspace.openTextDocument(openPath).then((document) => {
            vscode.window.showTextDocument(document);
        });
    }

    public static processFileName(fileName: string): string {

        if (fileName.length < 4) {
            return fileName;
        }
        fileName = _.lowerCase(fileName);

        let viewFileName = fileName
            .substring(fileName.length - 4, fileName.length)
            .toLowerCase();

        let widgetFileName = fileName
            .substring(fileName.length - 6, fileName.length)
            .toLowerCase();



        if (viewFileName === "view") {
            let truncatedFileName = fileName.substring(0, fileName.length - 4);
            return truncatedFileName.trim();
        }

        if (widgetFileName === "widget") {
            let truncatedFileName = fileName.substring(0, fileName.length - 6);
            console.debug('Widget testing');
            return truncatedFileName.trim();
        }

        return fileName.trim();
    }

    public static buildRunner(path: string) {

        shell.cd(path);
        //exec("flutter pub get");
        setTimeout(() => {

            vscode.window.showInformationMessage("Running command: flutter pub run build_runner build");
            exec("flutter pub run build_runner build --delete-conflicting-outputs", function (status, output) {
                console.log('Exit status:', status);
                console.log('Program output:', output);
            });
        }, 5000);

    }
}