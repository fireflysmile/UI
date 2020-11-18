import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TsDate} from './models/ts-date';

export type TsCalendarViewType = 'date' | 'month';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent<T = TsDate> implements OnInit, AfterViewInit {
  // set start day
  @Input() set startDay(day: number) {
    this._startDay = day;
    this._createCalendarAfterTimer();
  }

  // set calendar min date
  @Input() set minDate(date: Date) {
    if (date) {
      this._minDate = new Date(date);
    }

    this._createCalendarAfterTimer();
  }

  // set calendar max date
  @Input() set maxDate(date: Date) {
    if (date) {
      this._maxDate = new Date(date);
    }

    this._createCalendarAfterTimer();
  }

  // set display date
  @Input() set displayDate(date: Date) {
    if (!date) { date = new Date(); }
    this._displayDate = new Date(date);
    this._createCalendarAfterTimer();
  }

  // set selected date
  @Input() set selectedDate(date: Date | string) {
    if (!date) { date = new Date(); }
    this._selectedDate = new Date(date);
    this._createCalendarAfterTimer();
  }

  // view change event
  @Output() viewChange: EventEmitter<void> = new EventEmitter<void>();
  // display date change event
  @Output() displayDateChange: EventEmitter<Date> = new EventEmitter<Date>();
  // selected date change event
  @Output() selectedDateChange: EventEmitter<Date> = new EventEmitter<Date>();
  // date double click
  @Output() dateDblClick: EventEmitter<void> = new EventEmitter<void>();
  // calendar header display format
  format = 'MMM  |  yyyy';
  // calendar view type
  view: TsCalendarViewType = 'date';
  // dates
  dates: (T | TsDate)[] = [];
  // selected year for month selector
  selectedYear: number;
  // months list for month view
  calendarMonths = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  // calendar min date
  // default is 1990 01 01
  private _minDate: Date = new Date(1990, 0, 1);
  // calendar max date
  // default is infinite
  private _maxDate: Date;
  // calendar displaying date
  // default is today
  private _displayDate: Date = new Date();
  // calendar selected date
  private _selectedDate: Date;
  // calendar start day
  // default is sunday
  private _startDay = 0;
  // timer
  protected _timer;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._createCalendarAfterTimer();
  }

  /**
   * return calendar start day
   */
  get startDay(): number {
    return this._startDay;
  }

  /**
   * return min date
   */
  get minDate(): Date {
    return this._minDate;
  }

  /**
   * return max date
   */
  get maxDate(): Date {
    return this._maxDate;
  }

  /**
   * return display date
   */
  get displayDate(): Date {
    return this._displayDate;
  }

  /**
   * year of display date
   */
  get displayYear(): number {
    return (this._displayDate || new Date()).getFullYear();
  }

  /**
   * month of display date
   */
  get displayMonth(): number {
    return (this._displayDate || new Date()).getMonth();
  }

  /**
   * set timer to prevent multiple creation
   */
  protected _createCalendarAfterTimer(): void {
    clearTimeout(this._timer);

    this._timer = setTimeout(() => {
      this._createCalendarDates();
    });
  }

  /**
   * create calendar dates
   */
  protected _createCalendarDates(): void {
    const year = this.displayYear;
    const month = this.displayMonth;
    const startDate = new Date(year, month, 1);
    const startDay = startDate.getDay();
    const dayDiff = -startDay + 1 + this._startDay;

    this.dates = [];

    for (let i = dayDiff; i < dayDiff + 42; i++) {
      const date = new Date(year, month, i);

      this.dates.push(new TsDate(date, this._displayDate || new Date(), this._selectedDate, this._minDate, this._maxDate));
    }

    this.view = 'date';
    this.viewChange.emit();
  }

  /**
   * change selected date
   * @param date date
   */
  changeSelectedDate(date: Date): void {
    this._displayDate = date;
    this._selectedDate = date;

    this.displayDateChange.emit(date);
    this.selectedDateChange.emit(date);

    this._createCalendarAfterTimer();
  }

  /**
   * to previous month
   */
  toPrevMonth(): void {
    const displayDate = new Date(this.displayYear, this.displayMonth - 1);

    if (this._minDate) {
      if (displayDate >= this._minDate) {
        this._emitDisplayDateChange(displayDate);
      }
    } else {
      this._emitDisplayDateChange(displayDate);
    }
  }

  /**
   * to next month
   */
  toNextMonth(): void {
    const displayDate = new Date(this.displayYear, this.displayMonth + 1);

    if (this._maxDate) {
      if (displayDate <= this._maxDate) {
        this._emitDisplayDateChange(displayDate);
      }
    } else {
      this._emitDisplayDateChange(displayDate);
    }
  }

  /**
   * emit display date change
   * @param date updated date
   */
  private _emitDisplayDateChange(date: Date): void {
    this._displayDate = date;
    this.displayDateChange.emit(this._displayDate);

    this._createCalendarAfterTimer();
  }

  /**
   * to month view
   */
  toMonthView(): void {
    this.view = 'month';
    this.selectedYear = this.displayYear;
    this.viewChange.emit();
  }

  /**
   * change display month
   * @param year year number for date object
   * @param month month number for date object
   */
  changeCalendarDate(year: number, month: number): void {
    this._displayDate = new Date(year, month);
    this.selectedYear = null;
    this.displayDateChange.emit(this._displayDate);

    this._createCalendarAfterTimer();
  }
}
