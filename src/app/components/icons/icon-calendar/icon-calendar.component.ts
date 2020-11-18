import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-calendar',
  templateUrl: './icon-calendar.component.html',
  styleUrls: ['./icon-calendar.component.scss']
})
export class IconCalendarComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
