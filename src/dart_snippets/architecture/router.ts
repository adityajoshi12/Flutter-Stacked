import { Base } from "./base";
import * as fs from "fs";
import { VsCodeActions } from "../../utils/vs_code_actions";
import * as path from "path";

export class Router extends Base {
  private _dartString: string;

  constructor(fileName: string, suffix?: string) {
    super(fileName, suffix);

    this._dartString = `

import 'package:auto_route/auto_route_annotations.dart';
    
@MaterialAutoRouter(
routes: <AutoRoute>[
     // initial route is named "/"
     //MaterialRoute(page: HomeView, initial: true)
   ],
)
class $Router {}
        
    `;
  }

  get dartString(): string {
    return this._dartString;
  }

  public static addRoute(route: string, importStmt: string) {
    let rootPath = VsCodeActions.rootPath;
    console.error(rootPath, "add route");
    var data = fs.readFileSync(path.join(rootPath, "lib/core/route", "router.dart"), { encoding: "utf-8" });
    var imp = "import 'package:auto_route/auto_route_annotations.dart';";
    var result = data.replace("routes: <AutoRoute>[", `routes: <AutoRoute>[ ${route},`).replace(imp, `${imp}\n${importStmt}`);

    fs.writeFileSync(path.join(rootPath, "lib/core/route/router.dart"), result);
  }
}