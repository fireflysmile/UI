import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import {RequestService} from '../../../services/api/request.service';
import {SubscriptionService} from '../../../services/subscription/subscription.service';
import {RequestItem} from '../../../models/request-item';
import {TablePageBaseComponent} from '../table-page-base/table-page-base.component';
import {TableColumnService} from '../../../services/components/table-column.service';
import {finalize} from 'rxjs/operators';
import {MessageService} from '../../../components/message/message.service';
import {createCSVString} from '../../../utils/format.util';
import {DatePipe, DOCUMENT, TitleCasePipe} from '@angular/common';
import {cloneDeep} from 'lodash-es';
import {InstrumentTypePipe} from '../../../pipes/instrument-type-pipe/instrument-type.pipe';
import {downloadCSV} from '../../../utils/other.utils';

@Component({
  selector: 'app-requests-page',
  templateUrl: './requests-page.component.html',
  styleUrls: [
    '../table-page-base/table-page-base.component.scss',
    './requests-page.component.scss',
  ],
})
export class RequestsPageComponent extends TablePageBaseComponent<RequestItem> implements OnInit {
  // date pipe
  private _datePipe: DatePipe = new DatePipe('en-US');
  // instrument type pipe
  private _instrumentTypePipe: InstrumentTypePipe = new InstrumentTypePipe();
  // title case pipe
  private _titleCasePipe: TitleCasePipe = new TitleCasePipe();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public tableColumnService: TableColumnService,
    private renderer: Renderer2,
    private messageService: MessageService,
    private requestService: RequestService,
    private subscriptionService: SubscriptionService,
  ) {
    super([], [
      [
        {
          icon: 'selected-download',
          label: 'Download Selected',
          action: () => this._downloadSelectedRows(),
        },
        {
          icon: 'filtered-download',
          label: 'Download Filtered',
          action: () => this._downloadFilteredRows(),
        },
        {
          icon: 'download',
          label: 'Download All',
          action: () => this._downloadTotalRows(),
        },
      ],
      [
        {
          icon: 'clear',
          label: 'Clear all search',
          disabled: () => this.filters.length === 0 || this.filters.every(item => !item.value),
          action: () => this._clearAllSearch(),
        },
        {
          icon: 'reload',
          label: 'Clear Sort',
          disabled: () => !this.sort,
          action: () => this._clearAllSort(),
        },
      ],
      [
        {
          icon: 'grid',
          label: 'Layout',
          action() {
            this.opened = !this.opened;
          },
          opened: false,
          moreOptionsConfig: {
            type: 'layout',
            onSelectHideClick: () => this.layoutView = true,
            onReorderClick: () => this.layoutView = true,
            onShowHiddenClick: () => {
              this.tableColumnService.requestColumnConfig = this.configs.map(item => ({...item, show: true}));
              this._setColumnFilters();
            },
            hiddenColumns: () => this.configs.filter(item => !item.show).length,
          }
        },
      ]
    ]);

    this._getRequestColumns();
    this._getRequestColumnConfigs();
  }

  ngOnInit() {
    this._getRequests();
  }

  /**
   * get download filename
   */
  get filename(): string {
    return `requests_${this._datePipe.transform(new Date(), 'yyyyMMddHHmmss')}.csv`;
  }

  /**
   * get request columns
   */
  private _getRequestColumns(): void {
    const sub = this.tableColumnService.requestColumns$
      .subscribe(columns => this.columns = columns );

    this.subscriptionService.store('_getRequestColumns', sub);
  }

  /**
   * get request column configs
   */
  private _getRequestColumnConfigs(): void {
    const sub = this.tableColumnService.requestColumnConfig$
      .subscribe(configs => this.configs = configs);

    this.subscriptionService.store('_getRequestColumnConfigs', sub);
  }

  /**
   * get collateral details
   */
  private _getRequests(): void {
    this.loading = true;

    const sub = this.requestService
      .getRequests()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: res => {
          this._originalData = res;
          this.createDisplayableData();
        },
      });

    this.subscriptionService.store('_getRequests', sub);
  }

  /**
   * download selected rows
   */
  private _downloadSelectedRows(): void {
    downloadCSV(
      this.document,
      this.renderer,
      this.filename,
      createCSVString(this.columns, this._getDownloadableData(this.selectedRows)),
    );
  }

  /**
   * download filtered rows
   */
  private _downloadFilteredRows(): void {
    downloadCSV(
      this.document,
      this.renderer,
      this.filename,
      createCSVString(this.columns, this._getDownloadableData(this.displayableData)),
    );
  }

  /**
   * download total rows
   */
  private _downloadTotalRows(): void {
    downloadCSV(
      this.document,
      this.renderer,
      this.filename,
      createCSVString(this.columns, this._getDownloadableData(this.getClonedOriginalData())),
    );
  }

  /**
   * override setColumnFilters method
   */
  protected _setColumnFilters() {
    super._setColumnFilters();

    this.columns.forEach(item => {
      switch (item.property) {
        case 'segment': {
          item.filterOptions.forEach(option => {
            const find = this.segmentOptions.find(segment => segment.value === option.value);

            if (find) {
              option.label = find.label;
            }
          });

          break;
        }

        case 'collateral': {
          item.filterOptions.forEach(option => {
            const find = this.collateralOptions.find(collateral => collateral.value === option.value);

            if (find) {
              option.label = find.label;
            }
          });

          break;
        }

        case 'instrumentType': {
          item.filterOptions.forEach(option => {
            const find = this.instrumentTypeOptions.find(inst => inst.value === option.value);

            if (find) {
              option.label = find.label;
            }
          });

          break;
        }
      }
    });
  }


  /**
   * process data to downloadable
   * @param data data
   */
  private _getDownloadableData(data: RequestItem[]): RequestItem[] {
    return cloneDeep(data).map(item => ({
      ...item,
      requestDate: this._datePipe.transform(item.requestDate, 'dd MMM yyyy'),
      valueDate: this._datePipe.transform(item.valueDate, 'dd MMM yyyy'),
      collateral: this._titleCasePipe.transform(item.collateral),
      requestType: this._titleCasePipe.transform(item.requestType),
      instrumentType: this._instrumentTypePipe.transform(item.instrumentType),
    }));
  }
}
