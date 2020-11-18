import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

import { TradeItem } from 'src/app/models/trade-item';
import { TableFilterOptionItem } from 'src/app/models/table-column';

@Component({
  selector: 'app-latest-trades',
  templateUrl: './latest-trades.component.html',
  styleUrls: [
    '../trade-overview-base/trade-overview-base.component.scss',
    './latest-trades.component.scss'
  ]
})
export class LatestTradesComponent implements OnInit, OnChanges {

  @Input() allTrades: TradeItem[];
  public filteredTrades: TradeItem[];

  // segment toggle options
  public segmentOptions = Object.keys(environment.segmentConfig).map(item => {
    return {
      label: environment.segmentConfig[item].label,
      value: environment.segmentConfig[item].value
    };
  });
  public segment: string;

  // page size toggle options
  public tableSizeOptions: TableFilterOptionItem[] = [
    { label: '20', value: 20 },
    { label: '50', value: 50 },
    { label: '100', value: 100 }
  ];
  public tableSize = 20;

  // trade type toggle options
  public tradeTypeOptions: TableFilterOptionItem[] = [
    { label: 'All', value: '' },
    { label: 'PC', value: 'pc' },
    { label: 'Non-PC', value: 'non-pc' }
  ];
  public tradeType: '' | 'pc' | 'non-pc' = '';

  // status toggle options
  public statusOptions: TableFilterOptionItem[] = [
    { label: 'All', value: '' },
    { label: 'Confirmed', value: 'Confirmed' },
    { label: 'Rejected', value: 'Rejected' },
    { label: 'Modified', value: 'Modified' }
  ];
  public status: '' | 'Confirmed' | 'Rejected' | 'Modified' = '';

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.onFilterChange();
  }

  public onSegmentChanged(segment: string) {
    this.segment = segment;
  }

  public onTradeTypeChanged(type: '' | 'pc' | 'non-pc') {
    this.tradeType = type;
    this.onFilterChange();
  }

  public onStatusChanged(status: '' | 'Confirmed' | 'Rejected' | 'Modified') {
    this.status = status;
    this.onFilterChange();
  }

  private onFilterChange() {
    if (!this.allTrades) { return; }
    this.filteredTrades = this.allTrades.filter(trade => {
      let passes = true;

      // trade type filter
      if (this.tradeType) {
        if (this.tradeType === 'pc') {
          passes = passes && !!trade.pcCode;
        } else {
          passes = passes &&  !trade.pcCode;
        }
      }

      // status filter
      if (this.status) {
        if (this.status === 'Modified') { passes = passes && trade.status === 'Unconfirmed'; }
        if (this.status === 'Confirmed') { passes = passes && trade.status.toLowerCase().indexOf('confirmed') !== -1; }
        if (this.status === 'Rejected') { passes = passes && trade.status.toLowerCase().indexOf('rejected') !== -1; }
      }

      return passes;
    });
  }

}
