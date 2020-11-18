import {Component, HostBinding, Input, OnInit} from '@angular/core';

export type CmDividerDirection = 'horizontal' | 'vertical';

@Component({
  selector: 'app-divider',
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.scss']
})
export class DividerComponent implements OnInit {
  // length
  @Input() length: string | number;
  // divider direction
  @Input() direction: CmDividerDirection = 'horizontal';
  // horizontal class
  @HostBinding('class.horizontal') get horizontal(): boolean {
    return this.direction === 'horizontal';
  }
  // vertical class
  @HostBinding('class.vertical') get vertical(): boolean {
    return this.direction === 'vertical';
  }
  // width
  @HostBinding('style.width') get width(): string {
    return this.direction === 'horizontal' ? this.length ? this.length + 'px' : '100%' : '1px';
  }
  // height
  @HostBinding('style.height') get height(): string {
    return this.direction === 'vertical' ? this.length ? this.length + 'px' : '100%' : '1px';
  }

  constructor() { }

  ngOnInit() {
  }

}
