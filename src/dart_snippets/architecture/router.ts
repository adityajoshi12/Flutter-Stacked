import { Base } from "./base";
import * as fs from "fs";
import { VsCodeActions } from "../../utils/vs_code_actions";
import * as path from "path";

export class Router extends Base {
  private _dartString: string;

  constructor(fileName: string, suffix?: string) {
    super(fileName, suffix);

    this._dartString = `

import 'package:auto_route/annotations.dart';
import '../../ui/views/home/home_view.dart';
@AdaptiveAutoRouter(
routes: <AutoRoute>[
     AutoRoute(page: HomeView, initial: true)
   ],
)
class $AppRouter {}
        
    `;
  }

  get dartString(): string {
    return this._dartString;
  }

  public static addRoute(route: string, importStmt: string, className: string) {
    let rootPath = VsCodeActions.rootPath;
    console.error(rootPath, "add route");
    let routerPath=path.join(rootPath, "lib/core/route", "router.dart");
    var data = fs.readFileSync(routerPath, { encoding: "utf-8" });
    var imp = "import 'package:auto_route/annotations.dart';";
    var result=null;
    
      if(className && !data.includes(className)){
        result = data.replace("routes: <AutoRoute>[", `routes: <AutoRoute>[ ${route},`).replace(imp, `${imp}\n${importStmt}`);
        fs.writeFileSync(path.join(rootPath, "lib/core/route/router.dart"), result);
      }
    

  }
}
