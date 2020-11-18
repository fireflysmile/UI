import {Directive, HostBinding, Input} from '@angular/core';
import {ButtonDirective} from '../button/button.directive';

export type TsInlineButtonColor = 'default' | 'primary' | 'warn';

@Directive({
  selector: '[appInlineButton]'
})
export class InlineButtonDirective extends ButtonDirective {
  // inline button appearance
  @Input() @HostBinding('attr.ts-color') color: TsInlineButtonColor = 'default';
  // inline button class
  @HostBinding('class.ts-inline-button') inlineButtonClass = true;

  constructor() {
    super();
  }

}
