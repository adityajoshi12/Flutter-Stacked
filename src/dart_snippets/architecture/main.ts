import * as _ from "lodash";
import { Base } from "./base";

export class Main extends Base {
  private _dartString: string;

  constructor(fileName: string, suffix?: string) {
    super(fileName, suffix);

    this._dartString = `
import 'package:stacked_services/stacked_services.dart';
import 'core/locator.dart';
import 'package:flutter/material.dart';
import 'ui/views/home/home_view.dart';
import 'core/route/router.gr.dart';
    void main() {
      setupLocator();
      runApp(MyApp());
    }
    class MyApp extends StatelessWidget {
      @override
      Widget build(BuildContext context) {
        return  MaterialApp(
            navigatorKey: locator<NavigationService>().navigatorKey,
            home: HomeView(),
            initialRoute: Routes.homeView,
            onGenerateRoute: Router().onGenerateRoute,
        );
      }
    }`;
  }

  get dartString(): string {
    return this._dartString;
  }
}
