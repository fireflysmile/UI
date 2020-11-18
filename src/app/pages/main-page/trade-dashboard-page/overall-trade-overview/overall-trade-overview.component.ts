import { Component, OnInit } from '@angular/core';

import { TradeOverviewBaseComponent } from '../trade-overview-base/trade-overview-base.component';
import { TradeItem } from 'src/app/models/trade-item';
import { DonutChartData } from 'src/app/components/donut-chart/donut-chart.component';

@Component({
  selector: 'app-overall-trade-overview',
  templateUrl: './overall-trade-overview.component.html',
  styleUrls: [
    '../trade-overview-base/trade-overview-base.component.scss',
    './overall-trade-overview.component.scss'
  ]
})
export class OverallTradeOverviewComponent extends TradeOverviewBaseComponent implements OnInit {

  public _donutTrades: TradeItem[];

  public donutChart: {
    data: DonutChartData[];
    legendPrefix: string;
    title: string;
    subtitle: string;
  } = null;

  ngOnInit(): void {
    this.overviewType = 'overall';
    this._setLevelOptions();
    this._setTradeTypeOptions();

    this.updateCharts.asObservable().subscribe(() => {
      this._refreshCharts();
    });
  }

  public onStatusChanged(status: '' | 'Confirmed' | 'Rejected' | 'Modified') {
    this.status = status;
    // pretend like the chart selection changed, so that table refreshes with status filters
    if (this.level === 'cm') {
      this.onDonutChartSelectionChanged();
    } else {
      this.onColumnChartSelectionChanged();
    }
  }

  private _setLevelOptions() {
    this.levelOptions = [
      { label: 'Clearing Member Level', value: 'cm' },
      { label: 'Trading Member Level', value: 'tm' },
      { label: 'Client Level', value: 'ec' }
    ];
    if (this.userType === 'cm') {
      this.levelOptions.splice(0, 1);
    }
    if (this.userType === 'tm') {
      this.levelOptions.splice(0, 2);
    }
  }

  private _setTradeTypeOptions() {
    this.tradeTypeOptions = [
      { label: 'All Trades', value: '' },
      { label: 'Only PC Trades', value: 'pc' },
    ];
    this.tradeType = '';
  }

  private _refreshCharts() {
    super._setUpColumnChartData(this.filteredTrades);
    this.donutChart = null;
    if (this.level === 'cm') {
      this._setUpDonutChartData(this.filteredTrades);
    } else {
      super._setUpTableTrades(this.filteredTrades);
    }
  }

  private _setUpDonutChartData(trades: TradeItem[]) {
    if (!trades) { return; }
    if (!this.param) { return; }
    this._donutTrades = trades;
    const tradesBreakup = this._getTradeSummaries(this._donutTrades, 'ec');
    const total = Object.keys(tradesBreakup).reduce((acc, key) => acc + tradesBreakup[key][this.param], 0);

    this.donutChart = {
      data: this._splitTopPerformingSummaries(tradesBreakup, 3).map((item, index) => ({
        label: ['Largest share', 'Second largest share', 'Third largest share', 'Others'][index],
        color: ['#0070D1', '#5da4e2', '#cbe1f6', '#ebf3fd'][index],
        value: item[this.param],
        codes: item.codes || { [item.label]: true },
        tooltipText: item.tooltipText,
      })),
      legendPrefix: 'End Client with',
      title: `Subset View: ${Math.round(100 * (total / this.columnChart.total))}% of total ${this.param}`,
      subtitle: this.param === 'value' ? `INR ${this._shortHand.transform(total, 1)}` : `${total} Trades`
    };

    super._setUpTableTrades(this._donutTrades);
  }


  public onColumnChartSelectionChanged() {
    let barCodes = {};
    let stackCodes = {};
    this.columnChart.data.forEach((d: any) => {
      d.values.forEach((v: any) => {
        if (!v.selected) { return; }
        barCodes = {...barCodes, ...v.codes};
        stackCodes = {...stackCodes, ...d.codes};
      });
    });

    switch (this.level) {
      case 'cm':
        this._setUpDonutChartData(this.filteredTrades.filter(trade => {
          return !Object.keys(barCodes).length || barCodes[trade.tmCode];
        }));
        break;
      case 'tm':
        super._setUpTableTrades(this.filteredTrades.filter(trade => {
          return (!Object.keys(barCodes).length || !Object.keys(stackCodes).length)
            || (barCodes[trade.ecCode] && stackCodes[trade.tmCode]);
        }));
        break;
      case 'ec':
        super._setUpTableTrades(this.filteredTrades.filter(trade => {
          return !Object.keys(barCodes).length || barCodes[trade.ecCode];
        }));
        break;
    }
  }

  public onDonutChartSelectionChanged() {
    let codes = {};
    this.donutChart.data.forEach((d: any) => {
      if (!d.selected) { return; }
      codes = {...codes, ...d.codes};
    });

    super._setUpTableTrades(this._donutTrades.filter(trade => {
      return !Object.keys(codes).length || codes[trade.ecCode];
    }));
  }

}
