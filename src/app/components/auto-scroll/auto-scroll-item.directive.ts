import {Directive, HostBinding, Input} from '@angular/core';

export const AUTO_SCROLL_CLASS = 'ts-auto-scroll-item';
export const AUTO_SCROLL_FOCUS_CLASS = 'ts-auto-scroll-focused';

@Directive({
  selector: '[appAutoScrollItem]'
})
export class AutoScrollItemDirective {
  // focused state
  @Input() @HostBinding(`class.${AUTO_SCROLL_FOCUS_CLASS}`) focused = false;
  // default class for auto scroll item
  @HostBinding(`class.${AUTO_SCROLL_CLASS}`) class = true;

  constructor() { }
}
