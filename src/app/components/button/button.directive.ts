import {Directive, HostBinding} from '@angular/core';

/**
 * default button directive
 * all type of buttons extends this class
 */
@Directive({
  selector: '[appButton]'
})
export class ButtonDirective {
  // button default class
  @HostBinding('class.ts-button') class = true;

  constructor() { }

}
