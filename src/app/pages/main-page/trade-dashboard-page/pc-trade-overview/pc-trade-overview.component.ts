import { Component, OnInit } from '@angular/core';
import { TradeOverviewBaseComponent } from '../trade-overview-base/trade-overview-base.component';
import { CapsuleToggleOption } from 'src/app/components/capsule-toggle/capsule-toggle.component';

import { TradeItem } from 'src/app/models/trade-item';
import { DonutChartData } from 'src/app/components/donut-chart/donut-chart.component';

@Component({
  selector: 'app-pc-trade-overview',
  templateUrl: './pc-trade-overview.component.html',
  styleUrls: [
    '../trade-overview-base/trade-overview-base.component.scss',
    './pc-trade-overview.component.scss'
  ]
})
export class PcTradeOverviewComponent extends TradeOverviewBaseComponent implements OnInit {

  public _columnTrades: TradeItem[];

  public donutChart: {
    data: DonutChartData[];
    subtitle: string;
  };

  public selectedStatus: string;

  public confirmedByOptions: CapsuleToggleOption[] = [
    { label: 'Confirmed by me', value: 'me' },
    { label: 'Confirmed by others', value: 'others' }
  ];
  public confirmedBy: 'me' | 'others' = 'me';

  private _statusColors = {
    confirmed: '#0a7f79',
    autoconfirmed: '#89c1be',
    pending: '#e76e28',
    rejected: '#f5c0a1',
    unallocated: '#a9a9a9',
    deconfirmed: '#16325C'
  };

  ngOnInit(): void {
    this.overviewType = 'pc';
    this._setLevelOptions();
    this._setTradeTypeOptions();

    this.updateCharts.asObservable().subscribe(() => {
      this._setUpDonutChartData();
    });
  }

  public onStatusChanged(status: '' | 'Confirmed' | 'Rejected' | 'Modified') {
    this.status = status;
    // pretend like selection is changed in column, so that table refreshes with status filters
    this.onColumnChartSelectionChanged();
  }

  public onConfirmationByChanged(confirmedBy: 'me' | 'others') {
    this.confirmedBy = confirmedBy;
    // pretend like selection is changed in donut, so that column chart refreshes with correct trades
    this.onDonutChartSelectionChanged();
  }

  private _setLevelOptions() {
    this.levelOptions = [
      { label: 'Clearing Member Level', value: 'cm' },
      { label: 'Trading Member Level', value: 'tm' },
      { label: 'PC Level', value: 'pc' }
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
      { label: 'PC Trades', value: 'pc' },
      { label: 'OTR', value: 'otr' },
    ];
    this.tradeType = 'pc';
  }

  private _setUpDonutChartData() {
    if (!this.filteredTrades) { return; }
    if (!this.param) { return; }
    const tradesBreakup = this._getTradeSummaries(this.filteredTrades, 'status');
    const total = Object.keys(tradesBreakup).reduce((acc, key) => acc + tradesBreakup[key][this.param], 0);

    this.donutChart = {
      data: Object.keys(tradesBreakup).map(status => ({
        label: status,
        color: this._statusColors[status.toLowerCase()],
        value: tradesBreakup[status][this.param],
        tooltipText: tradesBreakup[status].tooltipText
      })),
      subtitle: this.param === 'value' ? `INR ${this._shortHand.transform(total)}` : `${total} Trades`
    };

    this._setUpColumnChartData(this.filteredTrades);
  }

  protected _setUpColumnChartData(trades: TradeItem[]) {
    this._columnTrades = trades;

    // if user is type 'cm', then the UI has a toggle button for 'confirmed by me / others'
    if (this.userType === 'cm') {
      if (this.confirmedBy === 'me') {
        // set up column chart for pc codes that clear with the user
        this._columnTrades = trades.filter(trade => this._pcToCmMap[trade.pcCode]);
      } else if (this.confirmedBy === 'others') {
        // set up column chart for tm codes that belong to the user, but clear with other users
        this._columnTrades = trades.filter(trade => !this._pcToCmMap[trade.pcCode]);
      }
    }
    super._setUpColumnChartData(this._columnTrades);
    super._setUpTableTrades(this._columnTrades);
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
        super._setUpTableTrades(this._columnTrades.filter(trade => {
          return !Object.keys(barCodes).length || barCodes[trade.tmCode];
        }));
        break;
      case 'tm':
        super._setUpTableTrades(this._columnTrades.filter(trade => {
          return (!Object.keys(barCodes).length || !Object.keys(stackCodes).length)
            || (barCodes[trade.pcCode] && stackCodes[trade.tmCode]);
        }));
        break;
      case 'pc':
        super._setUpTableTrades(this._columnTrades.filter(trade => {
          return !Object.keys(barCodes).length || barCodes[trade.pcCode];
        }));
        break;
    }
  }

  public onDonutChartSelectionChanged() {
    const selectedArc = this.donutChart.data.find(d => d.selected);
    const selectedStatus = selectedArc && selectedArc.label;
    this.selectedStatus = selectedStatus;

    this._setUpColumnChartData(this.filteredTrades.filter(trade => {
      return !selectedArc || trade.status === selectedStatus;
    }));
  }

}
