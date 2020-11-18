import {ChangeDetectorRef, Component, Input} from '@angular/core';

@Component({
  selector: 'app-responsive-filter-base',
  template: '',
})
export class ResponsiveFilterBaseComponent {
  // set input width
  @Input() set inputWidth(width: number) {
    this._inputWidth = width;
    this.changeDetectorRef.detectChanges();
  }
  // input width
  private _inputWidth = 0;

  constructor(
    protected changeDetectorRef: ChangeDetectorRef,
  ) { }

  /**
   * return input width
   */
  get inputWidth(): number {
    return this._inputWidth;
  }
}
