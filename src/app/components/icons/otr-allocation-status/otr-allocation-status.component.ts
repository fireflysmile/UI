import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WaterfallBar, WaterfallBarChartData} from '../waterfall-bar-chart/waterfall-bar-chart.component';
import {OrderAllocationStatus} from '../../../models/order-allocation-status';
import {sum} from '../../../utils/other.utils';

@Component({
  selector: 'app-otr-allocation-status',
  templateUrl: './otr-allocation-status.component.html',
  styleUrls: ['./otr-allocation-status.component.scss']
})
export class OtrAllocationStatusComponent implements OnInit {
  // set data
  @Input() set data(data: OrderAllocationStatus) {
    this._data = data;
    this._distributeData();
  }
  // emit when bar data selected
  @Output() dataSelect: EventEmitter<WaterfallBar> = new EventEmitter<WaterfallBar>();
  // data
  chartData: WaterfallBarChartData;
  // data
  private _data: OrderAllocationStatus;
  // unallocated
  private _unallocated = 0;
  // allocated
  private _allocated = 0;
  // unconfirmed
  private _unconfirmed = 0;
  // rejected
  private _rejected = 0;
  // confirmed
  private _confirmed = 0;
  // de-confirmed
  private _deConfirmed = 0;

  constructor() { }

  ngOnInit() {
  }

  /**
   * distribute each data for chart
   */
  private _distributeData(): void {
    if (this._data) {
      const allocated = Object
        .keys(this._data.allocated)
        .map(key => this._data.allocated[key])
        .reduce(sum);

      const total = this._data.unallocated + allocated;

      this._unconfirmed = this._data.allocated.unconfirmed / allocated * 100;
      this._rejected = this._data.allocated.rejected / allocated * 100;
      this._confirmed = this._data.allocated.confirmed / allocated * 100;
      this._deConfirmed = this._data.allocated.deConfirmed / allocated * 100;
      this._allocated = allocated / total * 100;
      this._unallocated = this._data.unallocated / total * 100;
    }

    this._createChartData();
  }

  /**
   * create chart data
   */
  private _createChartData(): void {
    this.chartData = {
      values: [100],
      label: 'Total',
      colors: ['#231F20'],
      children: [
        {
          values: [this._unallocated],
          label: 'Unallocated',
          colors: ['#E2ECF5'],
          children: [],
        },
        {
          values: [this._allocated],
          label: 'Allocated',
          colors: ['#1170D1'],
          children: [
            {
              values: [this._unconfirmed],
              label: 'Unconfirmed',
              colors: ['#1170D1'],
              children: [],
            },
            {
              values: [this._rejected],
              label: 'Rejected',
              alert: true,
              colors: ['#E31F26'],
              children: [],
            },
            {
              values: [this._confirmed],
              label: 'Confirmed',
              colors: ['#0DA687'],
              children: [],
            },
            {
              values: [this._deConfirmed],
              label: 'De-Confirmed',
              colors: ['#3BCEB0'],
              children: [],
            }
          ],
        }
      ],
    };
  }
}
