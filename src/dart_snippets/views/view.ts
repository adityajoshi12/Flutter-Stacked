import * as _ from 'lodash';
import { Base } from '../architecture/base';

export class View extends Base {

  private _dartString: string;

  constructor(fileName: string, suffix: string) {
    super(fileName, suffix);

    let classPrefixList: string[] = this.className.split('View');
    let classPrefix: string | undefined;
    if (!_.isEmpty(classPrefixList)) { classPrefix = _.first(classPrefixList); }

    this._dartString = `library ${fileName}_view;
import 'package:responsive_builder/responsive_builder.dart';
import 'package:stacked/stacked.dart';
import '../../../core/locator.dart';
import 'package:flutter/material.dart';
import '${fileName}_view_model.dart';
part '${fileName}_mobile.dart';
part '${fileName}_tablet.dart';
part '${fileName}_desktop.dart';
class ${this.className} extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ViewModelBuilder<${classPrefix}ViewModel>.reactive(
      viewModelBuilder: () => locator<${classPrefix}ViewModel>(),
      onModelReady: (model) {
        // Do something once your model is initialized
      },
      builder: (context, model, child) {
        return ScreenTypeLayout(
          mobile: _${classPrefix}Mobile(model),
          desktop: _${classPrefix}Desktop(model),
          tablet: _${classPrefix}Tablet(model),  
        );
      }
    );
  }
}`;
  }

  get dartString(): string {
    return this._dartString;
  }
}