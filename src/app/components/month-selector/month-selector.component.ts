import {
  ChangeDetectorRef,
  Component,
  OnInit,
  Optional,
  Self,
} from '@angular/core';
import { FormControlBaseDirective } from '../form-control-base/form-control-base.directive';
import { NgControl } from '@angular/forms';
import { isDefined } from '../../utils/validation.util';

export type CmMonthSelectorType = 'quarter' | 'month';

export interface MonthValue {
  // quarter
  quarter: number;
  // start month
  start: number;
  // end month
  end: number;
}

@Component({
  selector: 'app-month-selector',
  templateUrl: './month-selector.component.html',
  styleUrls: ['./month-selector.component.scss'],
})
export class MonthSelectorComponent
  extends FormControlBaseDirective<MonthValue>
  implements OnInit {
  // value
  value: MonthValue = {
    quarter: null,
    start: null,
    end: null,
  };
  // selector type
  type: CmMonthSelectorType = 'month';
  // year options
  yearOptions = [];
  // month options
  monthOptions = [
    { label: 'January', value: 0 },
    { label: 'February', value: 1 },
    { label: 'March', value: 2 },
    { label: 'April', value: 3 },
    { label: 'May', value: 4 },
    { label: 'June', value: 5 },
    { label: 'July', value: 6 },
    { label: 'August', value: 7 },
    { label: 'September', value: 8 },
    { label: 'October', value: 9 },
    { label: 'November', value: 10 },
    { label: 'December', value: 11 },
  ];
  quarterOptions = [
    { label: 'First Quarter', value: 0 },
    { label: 'Second Quarter', value: 1 },
    { label: 'Third Quarter', value: 2 },
    { label: 'Fourth Quarter', value: 3 },
  ];
  // start month options
  startMonthOptions = [];
  // end month options
  endMonthOptions = [];

  constructor(
    @Self() @Optional() public ngControl: NgControl,
    protected changeDetectorRef: ChangeDetectorRef
  ) {
    super(ngControl, changeDetectorRef);
  }

  ngOnInit(): void {
    this._defaultValue = {
      quarter: null,
      start: null,
      end: null,
    };
    this.createRangeMonthOptions();
  }

  /**
   * set quarter value
   * @param value value
   */
  setQuarterValue(value: number): void {
    this.setValue({
      ...this.getValue(),
      quarter: value,
      start: null,
      end: null,
    });
  }

  /**
   * set start month value
   * @param value value
   */
  setStartMonthValue(value: number): void {
    this.setValue({
      ...this.getValue(),
      start: value,
      quarter: null,
    });
  }

  /**
   * set end month value
   * @param value value
   */
  setEndMonthValue(value: number): void {
    this.setValue({
      ...this.getValue(),
      end: value,
      quarter: null,
    });
  }

  /**
   * create range month options
   */
  createRangeMonthOptions(): void {
    this.startMonthOptions = [...this.monthOptions];
    this.endMonthOptions = [...this.monthOptions];

    if (isDefined(this.value.end)) {
      this.startMonthOptions = this.startMonthOptions.filter(
        (item) => item.value < this.value.end
      );
    }

    if (isDefined(this.value.start)) {
      this.endMonthOptions = this.endMonthOptions.filter(
        (item) => item.value > this.value.start
      );
    }
  }

  public onToggle(value: CmMonthSelectorType) {
    this.setValue({
      start: null,
      end: null,
      quarter: null,
    });
    if (this.type === value) {
      return;
    }
    this.type = value;
  }
}
