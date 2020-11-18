import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, ViewChildren, QueryList, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

import { TradeItem } from 'src/app/models/trade-item';
import { DynamicFilterComponent } from 'src/app/components/dynamic-filter/dynamic-filter.component';
import { QuantityFilterType } from 'src/app/components/dynamic-filter-quantity/dynamic-filter-quantity.component';
import { TableFilterOptionItem } from 'src/app/models/table-column';
import { toFloat } from 'src/app/utils/format.util';
import { ClearingMemberInfo } from 'src/app/models/clearing-member-info';
import { StackedBarData, StackedBarColor } from 'src/app/components/stacked-bar-chart/stacked-bar/stacked-bar.component';
import { ShorthandedNumberPipe } from 'src/app/pipes/shorthanded-number-pipe/shorthanded-number.pipe';

export interface TradeSummary {
  label: string;
  value: number;
  number: number;
  tooltipText: string;
  codes?: { [key: string]: boolean; };
  sub?: TradeSummaries;
}
export interface TradeSummaries {
  [key: string]: TradeSummary;
}

@Component({
  selector: 'app-trade-overview-base',
  template: ''
})
export class TradeOverviewBaseComponent implements OnInit, OnChanges {

  public overviewType: 'overall' | 'pc';

  @Input() allTrades: TradeItem[];
  @Input() clearingMembers: ClearingMemberInfo[];
  @Input() userType: 'lcn' | 'cm' | 'tm';
  @Input() expanded: boolean;

  @Output() expand = new EventEmitter<void>();

  private _tradesFiltersMeta: { trade: TradeItem, filteredOutBy: string[] }[];
  public filteredTrades: TradeItem[];
  public tableTrades: TradeItem[];
  public showTable = false;

  public updateCharts = new EventEmitter<void>();

  protected _tmToCmMap: { [key: string]: string; } = {};
  protected _pcToCmMap: { [key: string]: string; } = {};
  protected _cmNames: {[key: string]: string; } = {};

  public columnChart: {
    data: StackedBarData[];
    steps: number;
    colors: StackedBarColor[];
    legendPrefix?: string;
    yAxisLabel?: string;
    showLegend: boolean;
    showBarTotals: boolean;
    subtitle: string;
    total: number;
  };

  // segment toggle options
  public segmentOptions = Object.keys(environment.segmentConfig).map(item => {
    return {
      label: environment.segmentConfig[item].label,
      value: environment.segmentConfig[item].value
    };
  });
  public segment: string;

  // level toggle options
  public levelOptions: TableFilterOptionItem[];
  public level: 'cm' | 'tm' | 'ec' | 'pc';

  // trade type toggle options
  public tradeTypeOptions: TableFilterOptionItem[];
  public tradeType: '' | 'pc' | 'otr';

  // param toggle options
  public paramOptions: TableFilterOptionItem[] = [
    { label: 'By Value', value: 'value' },
    { label: 'By Number of Trades', value: 'number' },
  ];
  public param: 'value' | 'number';

  // page size toggle options
  public tableSizeOptions: TableFilterOptionItem[] = [
    { label: '20', value: 20 },
    { label: '50', value: 50 },
    { label: '100', value: 100 }
  ];
  public tableSize = 20;

  // status toggle options
  public statusOptions: TableFilterOptionItem[] = [
    { label: 'All', value: '' },
    { label: 'Confirmed', value: 'Confirmed' },
    { label: 'Rejected', value: 'Rejected' },
    { label: 'Modified', value: 'Modified' }
  ];
  public status: '' | 'Confirmed' | 'Rejected' | 'Modified' = '';

  // marginable toggle options
  public marginableOptions: TableFilterOptionItem[] = [
    { label: 'All', value: '' },
    { label: 'Marginable', value: 'true' },
    { label: 'Non-Marginable', value: 'false' },
  ];
  public marginable: '' | 'true' | 'false' = '';

  // dynamic filters
  @ViewChildren(DynamicFilterComponent) dynamicFilterRefs: QueryList<DynamicFilterComponent>;
  public filters: {
    value: { type: string; value?: string; start?: string; end?: string; };
    qty: { type: string; value?: string; start?: string; end?: string; };
    cm: { label: string; value: string; }[];
    tm: { label: string; value: string; }[];
    ec: { label: string; value: string; }[];
    pc: { value: string; label: string; }[];
  } = {
    pc: null,
    value: null,
    qty: null,
    cm: null,
    tm: null,
    ec: null
  };
  // dynamic filter options
  public filterOptions: {
    cm: TableFilterOptionItem[];
    tm: TableFilterOptionItem[];
    ec: TableFilterOptionItem[];
    pc: TableFilterOptionItem[];
  } = {
    cm: null,
    tm: null,
    ec: null,
    pc: null,
  };

  protected _shortHand = new ShorthandedNumberPipe();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.allTrades) {
      this.onFilterChange();
    }
    if (changes.clearingMembers) {
      this._compileCMDicts();
    }
    if (changes.expanded && !this.expanded) {
      this.showTable = false;
    }
  }

  public onSegmentChanged(segment: string) {
    this.segment = segment;
    this.onFilterChange();
  }

  public onLevelChanged(level: 'cm' | 'tm' | 'ec' | 'pc') {
    this.level = level;
    this.onFilterChange();
  }

  public onParamChanged(param: 'value' | 'number') {
    this.param = param;
    this.updateCharts.emit();
  }

  public onTradeTypeChanged(type: '' | 'pc' | 'otr') {
    this.tradeType = type;
    this.onFilterChange();
  }

  public onMarginableChanged(marginable: '' | 'true' | 'false') {
    this.marginable = marginable;
    this.onFilterChange();
  }

  /**
   * get clearing members
   * and update the dicts of TMs and PCs to CMs
   */
  private _compileCMDicts() {
    if (!this.clearingMembers) { return; }
    // set up the TMs to Cms map and the PCs to CMs map
    // each CM has a list of TMs under them, and a list of PCs that they clear
    this.clearingMembers.forEach(member => {
      // add the TMs of the CM to the dict
      member.tmCodes.forEach(tm => {
        this._tmToCmMap[tm] = member.code;
      });
      // add the PCs of the CM to the dict
      member.pcCodes.forEach(pc => {
        this._pcToCmMap[pc] = member.code;
      });
      // add the member name to the CM name map
      this._cmNames[member.code] = member.name;
    });

    // update the filter options to include options for CMs
    this._refreshFilterOptions();
    this.updateCharts.emit();
  }

  /**
   * refresh filter options
   * when some filters are set, it would affect the available filter options for other filters
   * this method calculates the latest available filter options for the user based on currently filtered trades
   */
  private _refreshFilterOptions() {
    if (!this._tradesFiltersMeta) { return; }

    // helper fn to get the filter options for a particular property of a trade
    const getCodeOptions = (filterName: string, property: string, dict?: { [key: string]: string }) => {
      const allCodes = {};
      this._tradesFiltersMeta
        .filter(item => !item.filteredOutBy.find(f => f !== filterName))
        .map(item => item.trade)
        .filter(trade => trade[property])
        .forEach(trade => {
          if (!dict) {
            allCodes[trade[property]] = true;
          } else {
            allCodes[dict[trade[property]]] = true;
          }
        });
      return Object.keys(allCodes).sort().map(code => ({ label: code, value: code }));
    };

    // set the filter options
    this.filterOptions.pc = getCodeOptions('pc', 'pcCode');
    switch (this.level) {
      case 'ec':
        this.filterOptions.ec = getCodeOptions('ec', 'ecCode');
        break;
      case 'tm':
        this.filterOptions.tm = getCodeOptions('tm', 'tmCode');
        break;
      case 'cm':
        this.filterOptions.cm = getCodeOptions('cm', 'tmCode', this._tmToCmMap);
        break;
    }
  }

  /**
   * close other filters without target
   * @param target target
   */
  public closeOtherFilters(target: DynamicFilterComponent): void {
    this.dynamicFilterRefs.forEach(component => {
      if (component !== target) {
        component.closeModal();
      }
    });
  }

  private _passesQtyFilter(filter: any, value: number): boolean {
    switch (filter.type as QuantityFilterType) {
      case 'default': {
        return filter.value
          ? value.toString().indexOf(filter.value) !== -1
          : true;
      }

      case 'eq': {
        return filter.value
          ? value ===
              toFloat(filter.value.replace(/,/g, ''))
          : true;
      }

      case 'lt': {
        return filter.value
          ? value < toFloat(filter.value.replace(/,/g, ''))
          : true;
      }

      case 'gt': {
        return filter.value
          ? value > toFloat(filter.value.replace(/,/g, ''))
          : true;
      }

      case 'lte': {
        return filter.value
          ? value <= toFloat(filter.value.replace(/,/g, ''))
          : true;
      }

      case 'gte': {
        return filter.value
          ? value >= toFloat(filter.value.replace(/,/g, ''))
          : true;
      }

      case 'range': {
        return filter.value
          ? (filter.value.start
              ? value >=
                toFloat(filter.value.start.replace(/,/g, ''))
              : true) &&
              (filter.value.end
                ? value <=
                  toFloat(filter.value.end.replace(/,/g, ''))
                : true)
          : true;
      }
    }
  }

  /**
   * on filter changed
   * filter all the tradess based on current filters
   */
  public onFilterChange() {
    if (!this.allTrades) { return; }

    // helper fn to check whether value passes a 'quantity' type filter

    this._tradesFiltersMeta = [];
    this.allTrades.forEach(trade => {
      const meta = { trade, filteredOutBy: [] };
      if (this.segment !== trade.segment) {
        meta.filteredOutBy.push('segment');
      }
      if (this.tradeType === 'pc' && !trade.pcCode) {
        meta.filteredOutBy.push('type');
      }
      if (this.tradeType === 'otr' && !trade.isOTR) {
        meta.filteredOutBy.push('type');
      }
      if (this.marginable && this.marginable !== `${trade.marginable}`) {
        meta.filteredOutBy.push('marginable');
      }
      if (this.filters.qty && !this._passesQtyFilter(this.filters.qty, trade.qty)) {
        meta.filteredOutBy.push('qty');
      }
      if (this.filters.value && !this._passesQtyFilter(this.filters.value, trade.value)) {
        meta.filteredOutBy.push('value');
      }
      if (this.filters.pc && !this.filters.pc.find(pc => pc.value === trade.pcCode)) {
        meta.filteredOutBy.push('pc');
      }
      if (this.filters[this.level] && !this.filters[this.level].find(code => {
        switch (this.level) {
          case 'tm':
            return code.value === trade.tmCode;
          case 'cm':
            return code.value === this._tmToCmMap[trade.tmCode];
          case 'ec':
            return code.value === trade.ecCode;
        }
      })) {
        meta.filteredOutBy.push(this.level);
      }

      this._tradesFiltersMeta.push(meta);
    });

    this.filteredTrades = this._tradesFiltersMeta
      .filter(item => item.filteredOutBy.length === 0)
      .map(item => item.trade);

    // refresh the filter options, (as they might change with new filtering of items)
    this._refreshFilterOptions();
    this.updateCharts.emit();
  }

  protected _getTradeSummaries(trades: TradeItem[], level: 'cm' | 'tm' | 'ec' | 'pc' | 'status'): TradeSummaries {
    const tradesBreakup = {};

    // helper fn adds this trade's value to the breakup dict provided
    const addTradeToBreakup = (trade: TradeItem, dict: TradeSummaries, code: string, name?: string) => {
      dict[code] = dict[code] || { label: code, value: 0, number: 0, tooltipText: '' };
      dict[code].value += trade.value;
      dict[code].number += 1;
      dict[code].tooltipText = `${code}\n` + (name ? `${name}\n` : '')
        + `INR ${this._shortHand.transform(dict[code].value, 1)}\n${dict[code].number} Trades`;
    };

    trades.forEach(trade => {
      const tm = trade.tmCode;
      const pc = trade.pcCode;
      const ec = trade.ecCode;

      switch (level) {
        case 'pc':
          // update pc level summary
          addTradeToBreakup(trade, tradesBreakup, pc, trade.pcName);
          break;
        case 'ec':
          // update ec level summary
          addTradeToBreakup(trade, tradesBreakup, ec, trade.ecName);
          break;
        case 'tm':
          // update tm level summary
          addTradeToBreakup(trade, tradesBreakup, tm, trade.tmName);
          tradesBreakup[tm].sub = tradesBreakup[tm].sub || {};
          if (this.overviewType === 'pc') {
            addTradeToBreakup(trade, tradesBreakup[tm].sub, pc, trade.pcName);
          } else {
            addTradeToBreakup(trade, tradesBreakup[tm].sub, ec, trade.ecName);
          }
          break;
        case 'cm':
          const cm = this._tmToCmMap[tm];
          // update cm level summary
          addTradeToBreakup(trade, tradesBreakup, cm, this._cmNames[cm]);
          tradesBreakup[cm].sub = tradesBreakup[cm].sub || {};
          addTradeToBreakup(trade, tradesBreakup[cm].sub, tm, trade.tmName);
          break;
        case 'status':
          // update status level summary
          const status = trade.status;
          addTradeToBreakup(trade, tradesBreakup, status);
          break;
      }
    });

    return tradesBreakup;
  }

  // helper fn that splits the summaries dict into 'Top N' and 'Others'
  protected _splitTopPerformingSummaries(dict: TradeSummaries, length: number, hasSub?: boolean): TradeSummary[] {
    const sortedKeys = Object.keys(dict).sort((a, b) => dict[b][this.param] - dict[a][this.param]);
    const topKeys = sortedKeys.slice(0, length);
    // compile the 'others' item by adding up summaries of less performing TM / CM / ECs
    const others = { label: 'Others', value: 0, number: 0, codes: {}, tooltipText: '' } as any;
    if (hasSub) { others.sub = {}; }
    if (length < sortedKeys.length) {
      const bottomKeys = sortedKeys.slice(length);
      bottomKeys.forEach(key => {
        others.value += dict[key].value;
        others.number += dict[key].number;
        others.codes[key] = true;
        others.tooltipText = `Others\nINR ${this._shortHand.transform(others.value, 1)}\n${others.number} Trades`;

        if (hasSub) {
          Object.keys(dict[key].sub).forEach(subKey => {
            others.sub[subKey] = others.sub[subKey] || { label: '', value: 0, number: 0, tooltipText: '' };
            others.sub[subKey].label = dict[key].sub[subKey].label;
            others.sub[subKey].value += dict[key].sub[subKey].value;
            others.sub[subKey].number += dict[key].sub[subKey].number;
            let tooltip = dict[key].sub[subKey].tooltipText.slice(0, dict[key].sub[subKey].tooltipText.indexOf('INR') + 1);
            tooltip += `INR ${this._shortHand.transform(others.sub[subKey].value, 1)}\n${others.sub[subKey].number} Trades`;
            others.sub[subKey].tooltipText = tooltip;
          });
        }
      });
    }
    return [...topKeys.map(key => dict[key]), others].filter(item => item.number > 0);
  }

  protected _setUpColumnChartData(trades: TradeItem[]) {
    if (!trades) { return; }
    if (!this._tmToCmMap && this.level === 'cm') { return; }
    if (!this.param) { return; }

    const tradesBreakup = this._getTradeSummaries(trades, this.level);
    const total = Object.keys(tradesBreakup).reduce((acc, key) => acc + tradesBreakup[key][this.param], 0);

    let columns: number;
    switch (this.level) {
      case 'pc':
      case 'ec':
        columns = this.overviewType === 'pc' ? 7 : 10;
        this.columnChart = {
          data: this._splitTopPerformingSummaries(tradesBreakup, columns - 1).map(item => ({
            label: item.label,
            codes: item.codes || { [item.label]: true },
            values: [{
              key: '1',
              value: item[this.param],
              codes: item.codes || { [item.label]: true },
              tooltipText: item.tooltipText
            }]
          })),
          steps: 4,
          colors: [{ key: '1', color: '#E86E25' }],
          showLegend: false,
          showBarTotals: false,
          total,
          subtitle: this.param === 'value' ? `INR ${this._shortHand.transform(total, 1)}` : `${total} Trades`
        };
        break;
      case 'tm':
      case 'cm':
        columns = this.level === 'cm' || this.overviewType === 'pc' ? 5 : 10;
        this.columnChart = {
          data: this._splitTopPerformingSummaries(tradesBreakup, columns - 1, true).map(item => ({
            label: item.label,
            codes: item.codes || { [item.label]: true },
            tooltipText: item.tooltipText,
            values: this._splitTopPerformingSummaries(item.sub, 3).map((subItem, index) => ({
              key: ['Largest share', 'Second largest share', 'Third largest share', 'Others'][index],
              value: subItem[this.param],
              codes: subItem.codes || { [subItem.label]: true },
              tooltipText: subItem.tooltipText
            }))
          })),
          steps: 10,
          colors: ['#0A7E78', '#0070D1', '#16325C', '#362D7E'].map((color, index) => ({
            key: ['Largest share', 'Second largest share', 'Third largest share', 'Others'][index],
            color
          })),
          yAxisLabel: this.param === 'value' ? 'Total Value' : 'Number of Trades',
          legendPrefix: this.level === 'cm' ? 'Trading Member with' : 'End Client with',
          showLegend: true,
          showBarTotals: true,
          total,
          subtitle: this.param === 'value' ? `INR ${this._shortHand.transform(total, 1)}` : `${total} Trades`
        };
        break;
    }
  }

  protected _setUpTableTrades(trades: TradeItem[]) {
    if (!trades) { return; }
    this.tableTrades = trades.filter(trade => {
      if (!this.status) { return true; }
      if (this.status === 'Modified') { return trade.status === 'Unconfirmed'; }
      if (this.status === 'Confirmed') { return trade.status.toLowerCase().indexOf('confirmed') !== -1; }
      if (this.status === 'Rejected') { return trade.status.toLowerCase().indexOf('rejected') !== -1; }
    });
  }

}
