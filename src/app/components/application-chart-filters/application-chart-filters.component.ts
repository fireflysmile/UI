import {ChangeDetectorRef, Component, Input, OnInit, Optional, Self} from '@angular/core';
import {FormControl, FormGroup, NgControl} from '@angular/forms';
import {MultiSelectOptionItem} from '../multi-select/multi-select.component';
import {FormControlBaseDirective} from '../form-control-base/form-control-base.directive';
import {DatePipe} from '@angular/common';

export interface ApplicationChartFilters {
  // months
  months: string[];
  // requests
  requests: string[];
}

@Component({
  selector: 'app-application-chart-filters',
  templateUrl: './application-chart-filters.component.html',
  styleUrls: ['./application-chart-filters.component.scss'],
})
export class ApplicationChartFiltersComponent extends FormControlBaseDirective<ApplicationChartFilters> implements OnInit {
  // total number
  @Input() total = 0;
  // current date
  now: Date = new Date();
  // group
  group: FormGroup = new FormGroup({
    months: new FormControl([]),
    requests: new FormControl([]),
  });
  // month options
  monthOptions: MultiSelectOptionItem<string>[] = [];
  // request options
  requestOptions: MultiSelectOptionItem<string>[] = [
    {label: 'Key Approvals', value: 'Key Approvals'},
    {label: 'Mandatory Submissions', value: 'Mandatory Submissions'},
    {label: 'Other Compliances', value: 'Other Compliances'},
  ];
  // date pipe
  private _datePipe: DatePipe = new DatePipe('en-US');

  constructor(
    @Self() @Optional() public ngControl: NgControl,
    protected changeDetectorRef: ChangeDetectorRef,
  ) {
    super(ngControl, changeDetectorRef);
  }

  ngOnInit(): void {
    this._defaultValue = {
      months: [],
      requests: [],
    };

    this._createMonthOptions();
  }

  /**
   * write value to component
   * @param value value
   */
  writeValue(value: ApplicationChartFilters): void {
    this.group.patchValue({
      months: value ? value.months || [] : [],
      requests: value ? value.requests || [] : [],
    });
  }

  /**
   * create month options
   * maximum month is current month
   */
  private _createMonthOptions(): void {
    this.monthOptions = [];

    for (let i = 0; i <= this.now.getMonth(); i++) {
      const month = this._datePipe.transform(new Date(this.now.getFullYear(), i, 1), 'MMMM');

      this.monthOptions.push({
        label: month,
        value: month,
      });
    }
  }
}
