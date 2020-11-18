import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {truncateDate} from '../../utils/date.util';
import {CalendarComponent} from '../calendar/calendar.component';
import {TsRangeDate} from './models/ts-range-date';

@Component({
  selector: 'app-range-calendar',
  templateUrl: './range-calendar.component.html',
  styleUrls: [
    '../calendar/calendar.component.scss',
    './range-calendar.component.scss',
  ]
})
export class RangeCalendarComponent extends CalendarComponent<TsRangeDate> implements OnInit, AfterViewInit {
  // set start date
  @Input() set startDate(date: Date) {
    this._startDate = date;
    this._createCalendarAfterTimer();
  }
  // set end date
  @Input() set endDate(date: Date) {
    this._endDate = date;
    this._createCalendarAfterTimer();
  }
  // start date change event
  @Output() startDateChange: EventEmitter<Date> = new EventEmitter<Date>();
  // end date change event
  @Output() endDateChange: EventEmitter<Date> = new EventEmitter<Date>();
  // days
  days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  // start date
  private _startDate: Date;
  // end date
  private _endDate: Date;

  constructor() {
    super();
  }

  /**
   * create calendar dates
   */
  protected _createCalendarDates(): void {
    const year = this.displayYear;
    const month = this.displayMonth;
    const startDate = new Date(year, month, 1);
    const startDay = startDate.getDay();
    const dayDiff = -startDay + 1 + this.startDay;

    this.dates = [];

    for (let i = dayDiff; i < dayDiff + 42; i++) {
      const date = new Date(year, month, i);

      this.dates.push(new TsRangeDate(
        date,
        this.displayDate,
        this._startDate,
        this._endDate,
        this.minDate,
        this.maxDate,
      ));
    }

    this.view = 'date';
  }

  /**
   * date selected
   * @param date date
   */
  onDateSelected(date: Date): void {
    if (
      !this._endDate
      && this._startDate
      && truncateDate(date, 'date').valueOf() > truncateDate(this._startDate, 'date').valueOf()
    ) {
      this._endDate = date;
      this.endDateChange.emit(this._endDate);
      this._createCalendarAfterTimer();
    } else {
      this._startDate = date;
      this._endDate = null;

      this.startDateChange.emit(this._startDate);
      this.endDateChange.emit(this._endDate);

      this._createCalendarAfterTimer();
    }
  }
}
