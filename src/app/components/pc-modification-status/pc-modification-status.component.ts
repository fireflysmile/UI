import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WaterfallBar, WaterfallBarChartData} from '../icons/waterfall-bar-chart/waterfall-bar-chart.component';
import {OrderModificationStatus} from '../../models/order-modification-status';
import {sum} from '../../utils/other.utils';

export interface PcModificationStatusLegend {
  label: string;
  color: string;
}

@Component({
  selector: 'app-pc-modification-status',
  templateUrl: './pc-modification-status.component.html',
  styleUrls: ['./pc-modification-status.component.scss']
})
export class PcModificationStatusComponent implements OnInit {
  // set data
  @Input() set data(data: OrderModificationStatus) {
    this._data = data;

    if (this._data) {
      this._createChartData();
    }
  }
  // emit when data selected
  @Output() dataSelect: EventEmitter<WaterfallBar> = new EventEmitter<WaterfallBar>();
  // data
  private _data: OrderModificationStatus;
  // waterfall chart data
  private _chartData: WaterfallBarChartData;
  // chart legends
  legends: PcModificationStatusLegend[] = [
    {label: 'Confirmed', color: '#0DA687'},
    {label: 'Unconfirmed', color: '#1170D1'},
    {label: 'Non-PC Trades', color: '#3BCEB0'},
    {label: 'Modified', color: 'rgba(17, 112, 209, .53)'},
    {label: 'Manually Modified', color: 'rgba(17, 112, 209, .69)'},
    {label: 'Unmodified', color: 'rgba(120, 179, 231, .4)'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * return chart data
   */
  get chartData(): WaterfallBarChartData {
    return this._chartData;
  }

  /**
   * create chart data
   */
  private _createChartData(): void {
    const unconfirmedTotal = Object.keys(this._data.unconfirmed).map(key => this._data.unconfirmed[key]).reduce(sum);
    const total = this._data.confirmed + this._data.nonPcTrades + unconfirmedTotal;

    const confirmed = this._data.confirmed / total * 100;
    const unconfirmed = unconfirmedTotal / total * 100;
    const modified = this._data.unconfirmed.modified / unconfirmedTotal * 100;
    const manuallyModified = this._data.unconfirmed.manuallyModified / unconfirmedTotal * 100;
    const unmodified = this._data.unconfirmed.unmodified / unconfirmedTotal * 100;
    const nonPcTrades = this._data.nonPcTrades / total * 100;

    this._chartData = {
      label: 'Total',
      values: [100],
      colors: ['#000'],
      children: [
        {
          label: 'Confirmed',
          values: [confirmed],
          colors: ['#0DA687'],
        },
        {
          label: 'Unconfirmed',
          values: [unconfirmed],
          colors: ['#1170D1'],
          children: [
            {
              label: 'Modified',
              values: [modified, manuallyModified],
              colors: ['rgba(17, 112, 209, .53)', 'rgba(17, 112, 209, .69)']
            },
            {
              label: 'Unmodified',
              values: [unmodified],
              colors: ['rgba(120, 179, 231, .4)'],
            },
          ],
        },
        {
          label: 'Non-PC Trades',
          values: [nonPcTrades],
          colors: ['#3BCEB0'],
          isolated: true,
        },
      ]
    };
  }
}
