import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CollateralValueAnalysis } from 'src/app/models/collateral-value-analysis';
import * as _ from 'lodash';
import { createPopper, preventOverflow, arrow } from '@popperjs/core';
import { Router } from '@angular/router';
import * as qs from 'qs';
import { CollateralDetailsPageQuery, CollateralDetailsPageQueryType } from 'src/app/models/collateral-details-page-query';

interface BarType {
  // percent data
  data: number[];
  // raw data
  rawData?: number[];
  colors: string[];
  topLabel: string;
  bottomLabel: string[];
  // offset aganist top
  translate: number;
  dataLabel?: string[];
  tooltip?: boolean;
  type?: string;
}

@Component({
  selector: 'app-collateral-value-analysis',
  templateUrl: './collateral-value-analysis.component.html',
  styleUrls: ['./collateral-value-analysis.component.scss']
})
export class CollateralValueAnalysisComponent implements OnInit {

  @Input() set data( d: CollateralValueAnalysis) {
    this._data = d;
    this.setData();
  }

  @Output() segmentChanged = new EventEmitter();

  get data() {
    return this._data;
  }
  _data: CollateralValueAnalysis;

  // different tab options;
  tabData: string[] = ['ALL', 'MC', 'OF', 'DC', 'OC', 'BLS'];

  activeTab: string = this.tabData[0];

  barChart: BarType[] = [];
  barLabels: string[] = [];

  defaultColors = ['#0DA687', '#88D3C4', '#0070D1', '#16325C'];

  legends = [
    {
      color: this.defaultColors[0],
      label: 'Cash'
    },
    {
      color: this.defaultColors[1],
      label: 'Non-Cash'
    },
    {
      color: this.defaultColors[2],
      label: 'Qty-based Excess'
    },
    {
      color: this.defaultColors[3],
      label: 'Value based Excess'
    }
  ];

  tooltipContent: string[] = ['', '', ''];

  popperInstance: any;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  setData() {
    if (!this.data) {
      return;
    }

    this.barChart = [];
    this.barLabels = [];
    const sumV = _.map(this.data, (v, k) => v).reduce((x, y) => x + y);
    // first bar
    this.barChart.push({
      data: [100, 0],
      translate: 0,
      topLabel: `INR ${sumV} CR`,
      bottomLabel: ['100%', 'Total Effective Deposit'],
      colors: ['#6D6E71', '#F9E1D5'],
      dataLabel: ['Total'],
      rawData: [sumV],
      tooltip: false,
      type: 'total'
    });
    // second bar
    const secondTotal = this.data.qtyBasedExcess + this.data.valueBasedExcess;
    this.barChart.push({
      data: [this.data.qtyBasedExcess / sumV * 100, this.data.valueBasedExcess / sumV * 100],
      translate: 0,
      topLabel: `Total INR ${secondTotal} CR`,
      bottomLabel: [`${(secondTotal / sumV * 100).toFixed(0)}%`, 'Total Excess Collateral'],
      colors: [this.defaultColors[2], this.defaultColors[3]],
      dataLabel: [this.legends[2].label, this.legends[3].label],
      rawData: [this.data.qtyBasedExcess, this.data.valueBasedExcess],
      tooltip: false,
      type: 'excess'
    });
    // third bar
    const thirdTotal = this.data.cash + this.data.nonCash;
    this.barChart.push({
      data: [this.data.cash / sumV * 100, this.data.nonCash / sumV * 100],
      translate: (secondTotal) / sumV * 100,
      topLabel: `Total INR ${thirdTotal} CR`,
      bottomLabel: [`${(thirdTotal / sumV * 100).toFixed(0)}%`, 'Net Effective Deposit'],
      colors: [this.defaultColors[0], this.defaultColors[1]],
      dataLabel: [this.legends[0].label, this.legends[1].label],
      rawData: [this.data.cash, this.data.nonCash],
      tooltip: false,
      type: 'cash'
    });

    // barLabels calculate
    this.barLabels.push('100');
    this.barLabels.push(((this.data.qtyBasedExcess + this.data.valueBasedExcess) / sumV * 100).toFixed(0));
    this.barLabels.push(((this.data.cash + this.data.nonCash) / sumV * 100).toFixed(0));

  }

  // event listener for tab changed
  tabChanged(tab): void {
    this.activeTab = tab;
    this.segmentChanged.emit(tab);
  }

  createPopper(el: HTMLElement, popper: HTMLElement, data: BarType) {
    // if(!this.popperInstance ){
    if ( !this.popperInstance) {
      data.tooltip = true;
      this.popperInstance = createPopper(el, popper, {
        placement: 'left',
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [-30, 8],
            },
          },
          // preventOverflow,
          // arrow
        ],
      });

      this.tooltipContent = [];
      this.tooltipContent.push(data.bottomLabel[0] + ' ' + data.bottomLabel[1]);
      if (data.dataLabel && data.dataLabel[0]) {
        this.tooltipContent.push(data.dataLabel[0] + ` INR ${data.rawData[0]} CR` );
      }
      if (data.dataLabel && data.dataLabel[1]) {
        this.tooltipContent.push(data.dataLabel[1] + ` INR ${data.rawData[1]} CR` );
      }

      popper.setAttribute('data-show', '');
    }

  }

  destroyPopper(ev: MouseEvent , popper: HTMLElement, type: string, data: BarType) {

    // if (this.popperInstance) {
    if (data.tooltip) {
      // return
      if (type === 'anchor') {
        const {x, y, width, height} = popper.getBoundingClientRect();
        const evx = ev.clientX;
        const evy = ev.clientY;
        let offXMin = 0;
        let offYMin = 0;
        // if evx is outside of popper.
        if ((evx - x) * (evx - (x + width)) > 0) {
          offXMin = Math.min(Math.abs(evx - x), Math.abs(evx - (x + width)));
        }
        // if evy is outside of popper.
        if ((evy - y) * (evy - (y + height)) > 0) {
          offYMin = Math.min(Math.abs(evy - y), Math.abs(evy - (y + height)));
        }

        const omax = Math.max(offXMin, offYMin);

        if (omax <= 10) {
          return;
        }
      }

      data.tooltip = false;
      popper.removeAttribute('data-show');

      if (!this.popperInstance) {
        return;
      }
      this.popperInstance.destroy();
      this.popperInstance = null;

    }
  }

  viewCollateralDetails(type: string) {
    const segmentOptions: any = {};
    if (this.activeTab !== 'ALL') {
      segmentOptions.segment = this.activeTab;
    }
    const qObject: CollateralDetailsPageQuery = {
      type: type as CollateralDetailsPageQueryType,
      mode: 'excess',
      ...segmentOptions
    };
    const qString = qs.stringify(qObject);
    this.router.navigateByUrl('/main/collateral/excess-collateral-details' + `?${qString}`);
  }


}
