import * as _ from "lodash";
import { Base } from "./base";

export class Main extends Base {
  private _dartString: string;

  constructor(fileName: string, suffix?: string) {
    super(fileName, suffix);

    this._dartString = `
import 'core/locator.dart';
import 'package:flutter/material.dart';
import 'core/route/router.gr.dart';
void main() {
      setupLocator();
      runApp(const MyApp());
}
class MyApp extends StatelessWidget {
      const MyApp({Key? key}) : super(key: key);
      @override
      Widget build(BuildContext context) {
        return MaterialApp.router(
          routeInformationParser: AppRouter().defaultRouteParser(),
          routerDelegate: AppRouter().delegate(),
          routeInformationProvider: AppRouter().routeInfoProvider(),
        );
      }
    }`;
  }

  get dartString(): string {
    return this._dartString;
  }
}
