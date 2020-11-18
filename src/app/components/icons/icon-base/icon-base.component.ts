import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-icon-base',
  template: '',
})
export class IconBaseComponent implements OnInit {
  // clickable state
  @Input() @HostBinding('class.cm-clickable') clickable = false;
  // icon class
  @HostBinding('class.cm-icon') iconClass = true;

  constructor() { }

  ngOnInit() {
  }

}
