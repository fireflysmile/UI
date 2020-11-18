import {Directive, HostBinding, Input} from '@angular/core';
import {ButtonDirective} from '../button/button.directive';

export type TsStrokeButtonColor = 'default' | 'primary' | 'warn';

@Directive({
  selector: '[appStrokeButton]'
})
export class StrokeButtonDirective extends ButtonDirective {
  // stroke button appearance
  @Input() @HostBinding('attr.ts-color') color: TsStrokeButtonColor = 'default';
  // stroke button class
  @HostBinding('class.ts-stroke-button') strokeButtonClass = true;

  constructor() {
    super();
  }

}
