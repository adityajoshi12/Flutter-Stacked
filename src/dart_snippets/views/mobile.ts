import * as _ from 'lodash';
import { Base } from '../architecture/base';

export class Mobile extends Base {

  private _dartString: string;

  constructor(fileName: string, suffix: string) {
    super(fileName, suffix);

    let classPrefixList: string[] = this.className.split('Mobile');
    let classPrefix: string | undefined;
    if (!_.isEmpty(classPrefixList)) { classPrefix = _.first(classPrefixList); }

    this._dartString = `part of ${fileName}_view;
class _${this.className} extends StatelessWidget {
  final ${classPrefix}ViewModel viewModel;
  const _${this.className}(this.viewModel);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(child: Text('${this.className}')),
    );
  }
}`;
  }

  get dartString(): string {
    return this._dartString;
  }

  get demoString(): string {
    return `part of home_view;
class _HomeMobile extends StatelessWidget {
  final HomeViewModel viewModel;
  _HomeMobile(this.viewModel);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Mobile'),
        backgroundColor: Colors.black,
      ),
      body: Center(
        
      ),
      
    );
  }
}
`;
  }
}
