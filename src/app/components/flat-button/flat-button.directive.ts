import {Directive, HostBinding, Input} from '@angular/core';
import {ButtonDirective} from '../button/button.directive';

export type TsFlatButtonColor = 'default' | 'primary' | 'warn' | 'secondary';

@Directive({
  selector: '[appFlatButton]'
})
export class FlatButtonDirective extends ButtonDirective {
  // flat button appearance
  @Input() @HostBinding('attr.ts-color') color: TsFlatButtonColor = 'default';
  // flat button class
  @HostBinding('class.ts-flat-button') flatButtonClass = true;

  constructor() {
    super();
  }

}
