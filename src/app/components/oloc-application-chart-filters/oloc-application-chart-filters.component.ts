import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  Optional,
  Output,
  Self,
  EventEmitter,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NgControl,
} from '@angular/forms';
import { FormControlBaseDirective } from '../form-control-base/form-control-base.directive';
import { DatePipe } from '@angular/common';
import { ActionItem } from 'src/app/models/action-item';
import {
  addYearToDate,
  getEndOfDate,
  getStartOfDate,
} from 'src/app/utils/date.util';

export interface ApplicationChartFilters {
  // start date
  start: Date;
  // end date
  end: Date;
  // request
  request: string;
}

@Component({
  selector: 'app-oloc-application-chart-filters',
  templateUrl: './oloc-application-chart-filters.component.html',
  styleUrls: ['./oloc-application-chart-filters.component.scss'],
})
export class OlocApplicationChartFiltersComponent
  extends FormControlBaseDirective<ApplicationChartFilters>
  implements OnInit {
  // total number
  @Input() total = 0;

  // value
  value: ApplicationChartFilters = {
    start: null,
    end: null,
    request: null,
  };

  // current date
  now: Date = new Date();
  // group
  group: FormGroup = new FormGroup({
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    request: new FormControl(''),
  });
  // request options
  requestOptions: string[] = [
    'All',
    'Enablement',
    'Connectivity',
    'Noitacoloc',
  ];
  // date pipe
  private _datePipe: DatePipe = new DatePipe('en-US');

  actionTo: ActionItem[][] = [
    [
      {
        icon: 'calendar-range',
        label: null,
        opened: false,
        action() {
          this.opened = !this.opened;
        },
        moreOptionsConfig: {
          type: 'date',
          label: 'To Date',
          date: null,
          minDate: null,
          maxDate: null,
          onApply: (date: Date) =>
            this._onDateRangeApplied(
              this.actionFrom[0][0].moreOptionsConfig.date,
              date
            ),
        },
      },
    ],
  ];

  actionFrom: ActionItem[][] = [
    [
      {
        icon: 'calendar-range',
        label: '',
        opened: false,
        action() {
          this.opened = !this.opened;
        },
        moreOptionsConfig: {
          type: 'date',
          label: 'From Date',
          date: null,
          onApply: (date: Date) =>
            this._onDateRangeApplied(
              date,
              this.actionTo[0][0].moreOptionsConfig.date
            ),
        },
      },
    ],
  ];

  constructor(
    @Self() @Optional() public ngControl: NgControl,
    protected changeDetectorRef: ChangeDetectorRef
  ) {
    super(ngControl, changeDetectorRef);
  }

  get startDate(): AbstractControl {
    return this.group.controls.startDate;
  }

  ngOnInit(): void {
    this._defaultValue = {
      start: null,
      end: null,
      request: null,
    };
  }

  get fullRawValue(): ApplicationChartFilters {
    return {
      start: this.actionFrom[0][0].moreOptionsConfig.date,
      end: this.actionTo[0][0].moreOptionsConfig.date,
      request: this.group.controls.request.value,
    };
  }

  /**
   * check date range changed and call _getTasks
   * @param start start date
   * @param end end date
   */
  private _onDateRangeApplied(start: Date, end: Date): void {
    const dateFormat = 'dd MMMM';
    this.group.controls.startDate.setValue(
      start ? this._datePipe.transform(start, dateFormat) : null
    );
    this.group.controls.endDate.setValue(
      end ? this._datePipe.transform(end, dateFormat) : null
    );

    const startDate = getStartOfDate(start);
    this.actionFrom[0][0].moreOptionsConfig.date = startDate;
    const endDate = getEndOfDate(end);
    this.actionTo[0][0].moreOptionsConfig.date = endDate;
    if (startDate) {
      this.actionTo[0][0].moreOptionsConfig.minDate = startDate;
      this.actionTo[0][0].moreOptionsConfig.maxDate = addYearToDate(
        startDate,
        1
      );
    }
  }
}
