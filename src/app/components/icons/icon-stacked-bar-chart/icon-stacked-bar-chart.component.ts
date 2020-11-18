import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-stacked-bar-chart',
  templateUrl: './icon-stacked-bar-chart.component.html',
  styleUrls: ['./icon-stacked-bar-chart.component.scss']
})
export class IconStackedBarChartComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
