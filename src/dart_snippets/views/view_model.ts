import * as _ from "lodash";
import { Base } from "../architecture/base";

export class ViewModel extends Base {
  private _dartString: string;

  constructor(fileName: string, suffix: string, private projectName?: string) {

    super(fileName, suffix);
    let initialPath = this.projectName === undefined ? '../../' : `package:${this.projectName}/`;
    this._dartString = `import 'package:stacked/stacked.dart';
import 'package:injectable/injectable.dart';
@singleton
class ${this.className} extends BaseViewModel {
  ${this.className}();
  
  // Add ViewModel specific code here
}`;
  }

  get dartString(): string {
    return this._dartString;
  }

  get demoString(): string {
    let initialPath = this.projectName === undefined ? '../../' : `package:${this.projectName}/`;
    return `import 'package:stacked/stacked.dart';
    import 'package:injectable/injectable.dart';
    @singleton
    class HomeViewModel extends BaseViewModel {
      
    }`;
  }
}