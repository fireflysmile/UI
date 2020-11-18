import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-bar-chart',
  templateUrl: './icon-bar-chart.component.html',
  styleUrls: ['./icon-bar-chart.component.scss']
})
export class IconBarChartComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
