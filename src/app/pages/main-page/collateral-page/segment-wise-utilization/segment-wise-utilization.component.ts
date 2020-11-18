import { Component, OnInit, Input } from '@angular/core';
import { SegmentWiseUtiliztion } from 'src/app/models/segment-wise-utilization';
import { DonutChartData } from 'src/app/components/donut-chart/donut-chart.component';

interface ProgressCharts {
  data: DonutChartData[];
  label: string;
}

@Component({
  selector: 'app-segment-wise-utilization',
  templateUrl: './segment-wise-utilization.component.html',
  styleUrls: ['./segment-wise-utilization.component.scss'],
})
export class SegmentWiseUtilizationComponent implements OnInit {
  // donut charts data
  @Input() set data(d: SegmentWiseUtiliztion) {
    this._data = d;
    this.setData();
  }
  _data: SegmentWiseUtiliztion;
  get data() {
    return this._data;
  }

  donutCharts: ProgressCharts[] = [];

  constructor() {}

  ngOnInit(): void {
  }

  setData() {
    if (!this.data) {
      return;
    }

    this.donutCharts = [];
    for (const k of Object.keys(this.data)) {
      this.donutCharts.push({
        data: [
          {
            label: '',
            value: this.data[k],
            color: '#0070D1',
          },
          {
            label: '',
            value: 100 - this.data[k],
            color: '#dce8f0',
          },
        ],
        label: k,
      });
    }
  }
}
