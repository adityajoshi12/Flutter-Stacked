import * as _ from 'lodash';
import { Base } from './base';

export class Locator extends Base {

  private _dartString: string;

  constructor(fileName: string, suffix?: string) {
    super(fileName, suffix);

    this._dartString = `
import 'package:get_it/get_it.dart';
import 'package:injectable/injectable.dart';
// Important. Impore the locator.iconfig.dart file
import 'locator.iconfig.dart';
GetIt locator = GetIt.instance;

@injectableInit
void setupLocator() => $initGetIt(locator);`;
  }

  get dartString(): string {
    return this._dartString;
  }
}