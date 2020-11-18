import {ChangeDetectorRef, Component, EventEmitter, HostBinding, Input, OnInit, Output} from '@angular/core';
import {dateStringToDate} from '../../utils/format.util';
import {isValidDate} from '../../utils/validation.util';
import {DatePipe} from '@angular/common';
import {ResponsiveFilterBaseComponent} from '../responsive-filter-base/responsive-filter-base.component';

export type DynamicFilterDatesType = 'start' | 'end';

export interface DateValue {
  // start date
  start: Date;
  // end date
  end: Date;
}

@Component({
  selector: 'app-dynamic-filter-dates',
  templateUrl: './dynamic-filter-dates.component.html',
  styleUrls: ['./dynamic-filter-dates.component.scss']
})
export class DynamicFilterDatesComponent extends ResponsiveFilterBaseComponent implements OnInit {
  // set date value
  @Input() set value(value: DateValue) {
    if (value) {
      this.start = value.start ? this._datePipe.transform(value.start, 'd/M/yyyy') : '';
      this.startDate = value.start;

      this.end = value.end ? this._datePipe.transform(value.end, 'd/M/yyyy') : '';
      this.endDate = value.end;
    }
  }
  // value change
  @Output() valueChange: EventEmitter<DateValue> = new EventEmitter<DateValue>();
  // base class
  @HostBinding('class.cm-filter-card') baseClass = true;
  // start date
  start = '';
  // end date
  end = '';
  // start date
  startDate: Date;
  // end date
  endDate: Date;
  // invalid start date
  invalidStartDate = false;
  // invalid end date
  invalidEndDate = false;
  now = new Date();
  minDate = new Date(this.now.getFullYear(), 0, 1);
  maxDate = new Date(this.now.getFullYear() + 1, 0, 0);
  displayDate = new Date();
  // date pipe
  private readonly _datePipe: DatePipe = new DatePipe('en-US');

  constructor(
    protected changeDetectorRef: ChangeDetectorRef,
  ) {
    super(changeDetectorRef);
  }

  ngOnInit() {
  }

  /**
   * handle date input change
   * set each date field when value is valid date
   * @param type date type
   * @param value value
   */
  onDateInputChange(type: DynamicFilterDatesType, value: string): void {
    const date = dateStringToDate(value);

    this._resetInvalidStateByType(type);

    if (isValidDate(date)) {
      if (this._isValidDateRange(type, date)) {
        this._setDateByType(type, date);
      } else {
        this._setInvalidDateByType(type);
      }
    } else {
      this._resetDateByType(type);
    }

    this.emitValueChange();
  }

  /**
   * return true when date range is valid
   * @param type type of date
   * @param date date to check
   */
  private _isValidDateRange(type: DynamicFilterDatesType, date: Date): boolean {
    switch (type) {
      case 'start': {
        return this.endDate ? this.endDate >= date : true;
      }

      case 'end': {
        return this.startDate ? this.startDate <= date : true;
      }
    }
  }

  /**
   * set date by type
   * @param type type of date
   * @param date date to set
   */
  private _setDateByType(type: DynamicFilterDatesType, date: Date): void {
    switch (type) {
      case 'start': {
        this.startDate = date;

        if (this.startDate) {
          this.startDate.setHours(0);
          this.startDate.setMinutes(0);
          this.startDate.setSeconds(0);
          this.startDate.setMilliseconds(0);
        }

        this.displayDate = this.startDate;

        break;
      }

      case 'end': {
        this.endDate = date;

        if (this.endDate) {
          this.endDate.setHours(23);
          this.endDate.setMinutes(59);
          this.endDate.setSeconds(59);
          this.endDate.setMilliseconds(999);
        }

        break;
      }
    }
  }

  /**
   * set invalid date by type
   * @param type type of date
   */
  private _setInvalidDateByType(type: DynamicFilterDatesType): void {
    switch (type) {
      case 'start': {
        this.invalidStartDate = true;
        break;
      }

      case 'end': {
        this.invalidEndDate = true;
        break;
      }
    }
  }

  /**
   * reset invalid state by type
   * @param type type of date
   */
  private _resetInvalidStateByType(type: DynamicFilterDatesType): void {
    switch (type) {
      case 'start': {
        this.invalidStartDate = false;
        break;
      }

      case 'end': {
        this.invalidEndDate = false;
        break;
      }
    }
  }

  /**
   * reset date by type
   * @param type type of date
   */
  private _resetDateByType(type: DynamicFilterDatesType): void {
    switch (type) {
      case 'start': {
        this.startDate = null;
        break;
      }

      case 'end': {
        this.endDate = null;
        break;
      }
    }
  }

  /**
   * handle date change by type
   * @param type type of date
   * @param date changed date
   */
  onDateChange(type: DynamicFilterDatesType, date: Date): void {
    this._resetInvalidStateByType(type);
    this._setDateByType(type, date);
    this._setDateStringByType(type, date);

    this.emitValueChange();
  }

  /**
   * set date string by type
   * @param type type of date
   * @param date date to set
   */
  private _setDateStringByType(type: DynamicFilterDatesType, date: Date): void {
    switch (type) {
      case 'start': {
        this.start = this._datePipe.transform(date, 'd/M/yyyy');
        break;
      }

      case 'end': {
        this.end = this._datePipe.transform(date, 'd/M/yyyy');
        break;
      }
    }
  }

  /**
   * emit value change
   */
  emitValueChange(): void {
    if (this.startDate || this.endDate) {
      this.valueChange.emit({
        start: this.startDate,
        end: this.endDate,
      });
    }
  }
}
