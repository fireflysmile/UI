import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.scss']
})
export class DateSelectorComponent implements OnInit {

  @Input() date: Date | string;
  @Input() disabled: boolean;
  @Output() dateChange = new EventEmitter<Date | string>();

  public showCalendar: boolean;

  constructor() { }

  ngOnInit() {
  }

}
