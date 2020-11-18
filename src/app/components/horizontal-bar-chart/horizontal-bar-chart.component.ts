import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { toASCII } from 'punycode';

interface BarStartData {
  color: string;
  value: number;
}

export interface HorizontalBarData {
  labelStart: string;
  labelEnd: string;
  data: (BarStartData | number)[];
  percents?: string[];
  excess: BarStartData | number;
}

interface UiHorizontalBarData {
  labelStart: string;
  labelEnd: string;
  data: BarStartData[];
  excess: BarStartData;
  percents?: string[];
}

@Component({
  selector: 'app-horizontal-bar-chart',
  templateUrl: './horizontal-bar-chart.component.html',
  styleUrls: ['./horizontal-bar-chart.component.scss']
})
export class HorizontalBarChartComponent implements OnInit {

  @Input() set data( d: HorizontalBarData[] ) {
    this.setData(d);
  }
  get data() {
    return this._data;
  }
  @Output() barClicked = new EventEmitter();

  _data: UiHorizontalBarData[] = [];

  percent100factor = 33;
  defaultColors = ['blue', 'lightblue', 'red'];
  barLines: number[] = [];

  constructor() { }

  ngOnInit(): void {
    const base = 1 * 100 / 11;
    for (let i = 0; i < 11; i++) {
      this.barLines.push(base * i);
    }
  }

  // data transform when displayed in ui
  setData(d: HorizontalBarData[]): void {
    const _data = _.cloneDeep(d);
    for (let i = 0; i < d.length; i++) {
      if (_.isNumber(d[i].data[0])) {
        _data[i].data = [];
        for (let j = 0; j < d[i].data.length; j++) {
          _data[i].data.push({
            color: this.defaultColors[j],
            value: d[i].data[j] as number
          });
        }
      }
      if (_.isNumber(d[i].excess)) {
        _data[i].excess = {
          color: this.defaultColors[2],
          value: d[i].excess as number
        };
      }
    }



    this._data = _data as UiHorizontalBarData[];
    for (const item of this._data) {
      const totalBase = item.data[0].value + item.data[1].value;
      item.percents = [];
      item.percents.push((item.data[0].value / totalBase * 100).toFixed(0));
      item.percents.push((item.data[1].value / totalBase * 100).toFixed(0));
      item.data[0].value =  item.data[0].value / totalBase * this.percent100factor;
      item.data[1].value =  item.data[1].value / totalBase * this.percent100factor;

      item.excess.value = Math.min(item.excess.value / totalBase * this.percent100factor, 100 - 20 - this.percent100factor);
    }

  }

  onBarClicked(item: UiHorizontalBarData) {
    this.barClicked.emit(item);
  }

}
