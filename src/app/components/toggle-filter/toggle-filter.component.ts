import {ChangeDetectorRef, Component, Input, OnInit, Optional, Self} from '@angular/core';
import {FormControlBaseDirective} from '../form-control-base/form-control-base.directive';
import {NgControl} from '@angular/forms';
import {TableFilterOptionItem} from '../../models/table-column';
import {isDefined} from '../../utils/validation.util';

@Component({
  selector: 'app-toggle-filter',
  templateUrl: './toggle-filter.component.html',
  styleUrls: ['./toggle-filter.component.scss']
})
export class ToggleFilterComponent extends FormControlBaseDirective<string> implements OnInit {
  // button width
  @Input() set buttonWidth(width: string | number) {
    setTimeout(() => {
      if (width === 'auto') {
        this.autoWidth = true;
        this._width = null;
      } else {
        this._width = width ? width + 'px' : null;
      }
      this.changeDetectorRef.detectChanges();
    });
  }
  // label
  @Input() label: string;
  // options
  @Input() options: TableFilterOptionItem[] = [];
  // value
  value: string;
  // width
  private _width: string;
  // auto width
  autoWidth = false;

  constructor(
    @Self() @Optional() public ngControl: NgControl,
    protected changeDetectorRef: ChangeDetectorRef,
  ) {
    super(ngControl, changeDetectorRef);
  }

  ngOnInit() {
  }

  /**
   * return width
   */
  get width(): string {
    return this._width;
  }

  /**
   * write value
   * @param value value to write
   */
  writeValue(value: string): void {
    this.value = value;

    if (!isDefined(this.value) && this.options.length > 0) {
      this.setValue(this.options[0].value as string);
    }
  }
}
