import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-month-picker',
  templateUrl: './month-picker.component.html',
  styleUrls: ['./month-picker.component.scss']
})
export class MonthPickerComponent implements OnInit {

  public selectedMonth: string;
  public selectedYear: number;

  @Input() set selected(date: Date | string) {
    this.selectedMonth = this.months[new Date(date).getMonth()];
    this.selectedYear = new Date(date).getFullYear();
  }

  @Output() selectedChange = new EventEmitter<Date>();

  public months = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC'
  ];

  constructor() { }

  ngOnInit() {
  }

  public update() {
    if (this.selectedYear > new Date().getFullYear()) {
      this.selectedYear = new Date().getFullYear();
    }
    if (`${this.selectedYear}`.length < 4) { return; }
    if (!this.selectedYear || !this.selectedMonth) {
      this.selectedChange.emit(null);
    }
    this.selectedChange.emit(new Date(this.selectedYear, this.months.indexOf(this.selectedMonth), 1));
  }

}
