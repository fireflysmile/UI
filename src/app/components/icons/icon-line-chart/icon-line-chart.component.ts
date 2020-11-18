import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-line-chart',
  templateUrl: './icon-line-chart.component.html',
  styleUrls: ['./icon-line-chart.component.scss']
})
export class IconLineChartComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
