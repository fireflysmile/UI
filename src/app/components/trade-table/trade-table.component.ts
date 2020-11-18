import { Component, OnInit, Input, OnChanges, SimpleChanges, Inject, Renderer2 } from '@angular/core';
import { DatePipe, DOCUMENT } from '@angular/common';
import {downloadCSV} from '../../utils/other.utils';
import {createCSVString} from '../../utils/format.util';

import {TablePageBaseComponent} from 'src/app/pages/main-page/table-page-base/table-page-base.component';
import { TradeItem } from 'src/app/models/trade-item';
import { TableColumnService } from 'src/app/services/components/table-column.service';
import {SubscriptionService} from 'src/app/services/subscription/subscription.service';

@Component({
  selector: 'app-trade-table',
  templateUrl: './trade-table.component.html',
  styleUrls: ['./trade-table.component.scss']
})
export class TradeTableComponent extends TablePageBaseComponent<TradeItem> implements OnInit, OnChanges {

  @Input() trades: TradeItem[];
  @Input() maxRows: number;
  public limitedDisplayableData: TradeItem[];

  private _datePipe: DatePipe = new DatePipe('en-US');

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public tableColumnService: TableColumnService,
    private subscriptionService: SubscriptionService
  ) {
    super([], [
      [
        {
          icon: 'download',
          label: 'Download File',
          action: () => this._downloadFile(),
        },
      ],
      [
        {
          icon: 'clear',
          label: 'Clear all search',
          action: () => this._clearAllSearch(),
          disabled: () => this.filters.length === 0 || this.filters.every(item => !item.value),
        },
        {
          icon: 'reload',
          label: 'Clear Sort',
          action: () => this._clearAllSort(),
          disabled: () => !this.sort,
        },
        {
          icon: 'cloud-download',
          label: 'Save Filters',
          action: () => this._saveFilters(),
        },
        {
          icon: 'cloud-upload',
          label: 'Load Filters',
          action: () => this._loadFilters(),
        },
      ],
      [
        {
          icon: 'grid',
          label: 'Layout',
          action: () => this.layoutView = true,
        },
      ]
    ]);

    this._getColumns();
    this._getColumnConfigs();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.trades) {
      if (changes.trades) {
        this._originalData = this.trades;
        this._setColumnFilters();
        this.createDisplayableData();
      } else if (changes.maxRows) {
        this._limitDisplayableData();
      }
    }
  }

  ngOnInit(): void {
  }

  createDisplayableData() {
    super.createDisplayableData();
    this._limitDisplayableData();
  }

  /**
   * limit displayble data to 'maxRows' input
   */
  private _limitDisplayableData() {
    if (!this.displayableData) { return; }
    this.limitedDisplayableData = this.maxRows
      ? this.displayableData.slice(0, this.maxRows)
      : this.displayableData;
  }

  /**
   * get columns
   */
  private _getColumns(): void {
    const sub = this.tableColumnService
      .tradeColumns$
      .subscribe(res => {
        this.columns = res;
      });

    this.subscriptionService.store('_getColumns', sub);
  }

  /**
   * get column configs
   */
  private _getColumnConfigs(): void {
    const sub = this.tableColumnService
      .tradeColumnConfig$
      .subscribe(res => this.configs = res);

    this.subscriptionService.store('_getColumnConfigs', sub);
  }

  /**
   * save filters
   */
  private _saveFilters(): void {
    this.tableColumnService.tradeColumnFilters = this.filters;
  }

  /**
   * load filters from service
   * and appropriate the filters for each column in table
   */
  private _loadFilters(): void {
    this.filters = this.tableColumnService.tradeColumnFilters;
    this.columns.forEach(column => {
      const filter = this.filters.find(f => f.property === column.property);
      column.filter = filter && filter.value;
    });
    this.createDisplayableData();
  }

  /**
   * download full displayable data
   */
  private _downloadFile() {
    const filename = `trades_${this._datePipe.transform(new Date(), 'yyyyMMddHHmmss')}.csv`;
    downloadCSV(this.document, this.renderer, filename, createCSVString(this.columns, this.displayableData));
  }

}
