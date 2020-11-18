import {ChangeDetectorRef, Component, ElementRef, OnInit, Optional, Self} from '@angular/core';
import {FormControlBaseDirective} from '../form-control-base/form-control-base.directive';
import {NgControl} from '@angular/forms';

@Component({
  selector: 'app-boolean-selector',
  templateUrl: './boolean-selector.component.html',
  styleUrls: ['./boolean-selector.component.scss']
})
export class BooleanSelectorComponent extends FormControlBaseDirective<boolean> implements OnInit {
  // selected value
  value: boolean;
  // options
  options: {
    label: string;
    value: boolean;
  }[] = [{
    label: 'Yes',
    value: true
  }, {
    label: 'No',
    value: false
  }];
  // selected option
  selectedOption: {label: string, value: boolean};
  // opened state
  opened = false;

  constructor(
    @Self() @Optional() public ngControl: NgControl,
    public elementRef: ElementRef<HTMLElement>,
    protected changeDetectorRef: ChangeDetectorRef,
  ) {
    super(ngControl, changeDetectorRef);
  }

  ngOnInit(): void {
  }

  /**
   * write value to component
   * @param value value
   */
  writeValue(value: boolean): void {
    this.value = value;
    this._setSelectedOption();
  }

  /**
   * set selected option
   */
  private _setSelectedOption(): void {
    this.selectedOption = this.options.find(item => item.value === this.value);
  }
}
