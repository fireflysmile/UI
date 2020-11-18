import {ChangeDetectorRef, Component, OnInit, Optional, Self} from '@angular/core';
import {FormControlBaseDirective} from '../form-control-base/form-control-base.directive';
import {NgControl} from '@angular/forms';
import {isDefined} from '../../utils/validation.util';

export type CmYearSelectorType = 'year' | 'month' | 'range';

export interface YearValue {
  // year
  year: number;
  // month
  month: number;
  // start month
  start: number;
  // end month
  end: number;
}

@Component({
  selector: 'app-year-selector',
  templateUrl: './year-selector.component.html',
  styleUrls: ['./year-selector.component.scss']
})
export class YearSelectorComponent extends FormControlBaseDirective<YearValue> implements OnInit {
  // value
  value: YearValue = {
    year: null,
    month: null,
    start: null,
    end: null,
  };
  // selector type
  type: CmYearSelectorType = 'year';
  // year options
  yearOptions = [];
  // month options
  monthOptions = [
    {label: 'January', value: 0},
    {label: 'February', value: 1},
    {label: 'March', value: 2},
    {label: 'April', value: 3},
    {label: 'May', value: 4},
    {label: 'June', value: 5},
    {label: 'July', value: 6},
    {label: 'August', value: 7},
    {label: 'September', value: 8},
    {label: 'October', value: 9},
    {label: 'November', value: 10},
    {label: 'December', value: 11},
  ];
  // start month options
  startMonthOptions = [];
  // end month options
  endMonthOptions = [];
  // previous type
  private _previousType: CmYearSelectorType;

  constructor(
    @Self() @Optional() public ngControl: NgControl,
    protected changeDetectorRef: ChangeDetectorRef,
  ) {
    super(ngControl, changeDetectorRef);
  }

  ngOnInit(): void {
    this._initializeYearOptions();
    this._defaultValue = {
      year: null,
      month: null,
      start: null,
      end: null,
    };
  }

  private _initializeYearOptions(): void {
    const now = new Date();

    this.yearOptions = [];

    for (let i = now.getFullYear(); i >= 1990; i--) {
      this.yearOptions.push({
        label: i.toString(),
        value: i,
      });
    }
  }

  /**
   * write value to component
   * @param value value
   */
  writeValue(value: YearValue): void {
    this.value = value;
  }

  /**
   * change type
   * @param type type
   */
  changeType(type: CmYearSelectorType): void {
    if (type === 'year') {
      this._previousType = null;
    } else {
      this._previousType = this.type;
    }

    this.type = type;
  }

  /**
   * reset to previous type on cancel click
   */
  onCancel(): void {
    this.type = this._previousType || 'year';
    this._previousType = null;
  }

  /**
   * clear month
   */
  clearMonth(): void {
    this.setValue({
      ...this.value,
      month: null,
    });
  }

  /**
   * clear range
   */
  clearRange(): void {
    this.setValue({
      ...this.value,
      start: null,
      end: null,
    });
  }

  /**
   * set year value
   * @param value value
   */
  setYearValue(value: number): void {
    this.setValue({
      ...this.value,
      year: value,
    });
  }

  /**
   * set month value
   * @param value value
   */
  setMonthValue(value: number): void {
    this.setValue({
      ...this.value,
      month: value,
    });
  }

  /**
   * set start month value
   * @param value value
   */
  setStartMonthValue(value: number): void {
    this.setValue({
      ...this.value,
      start: value,
    });
  }

  /**
   * set end month value
   * @param value value
   */
  setEndMonthValue(value: number): void {
    this.setValue({
      ...this.value,
      end: value,
    });
  }

  /**
   * create range month options
   */
  createRangeMonthOptions(): void {
    this.startMonthOptions = [...this.monthOptions];
    this.endMonthOptions = [...this.monthOptions];

    if (isDefined(this.value.end)) {
      this.startMonthOptions = this.startMonthOptions.filter(item => item.value < this.value.end);
    }

    if (isDefined(this.value.start)) {
      this.endMonthOptions = this.endMonthOptions.filter(item => item.value > this.value.start);
    }
  }
}
