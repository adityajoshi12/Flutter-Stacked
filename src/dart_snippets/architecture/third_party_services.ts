import * as _ from "lodash";
import { Base } from "./base";

export class NavigatorService extends Base {
  private _dartString: string;

  constructor(fileName: string, suffix?: string) {
    super(fileName, suffix);
    this._dartString = `
import 'package:injectable/injectable.dart';
import 'package:stacked_services/stacked_services.dart';

@module
abstract class ThirdPartyServicesModule {
  @singleton
  NavigationService get navigationService;
  @singleton
  DialogService get dialogService;
  @singleton
  SnackbarService get snackbarService;
}
`;
  }

  get dartString(): string {
    return this._dartString;
  }
}
