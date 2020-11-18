import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-monitor',
  templateUrl: './icon-monitor.component.html',
  styleUrls: ['./icon-monitor.component.scss']
})
export class IconMonitorComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
