import { Component, OnInit, Renderer2, Inject, Input, Output, EventEmitter } from '@angular/core';
import { CollateralDetailsItem } from 'src/app/models/collateral-details-item';
import {SubscriptionService} from '../../../../services/subscription/subscription.service';
import {TablePageBaseComponent} from '../../table-page-base/table-page-base.component';
import {TableColumnService} from '../../../../services/components/table-column.service';
import {finalize} from 'rxjs/operators';
import {MessageService} from '../../../../components/message/message.service';
import {createCSVString} from '../../../../utils/format.util';
import {DatePipe, DOCUMENT, TitleCasePipe} from '@angular/common';
import {cloneDeep} from 'lodash-es';
import {InstrumentTypePipe} from '../../../../pipes/instrument-type-pipe/instrument-type.pipe';
import {downloadCSV} from '../../../../utils/other.utils';
import { CollateralService } from 'src/app/services/api/collateral.service';
import { CollateralExcessDetailsItem } from 'src/app/models/collateral-excess-details-item';
import { TableColumn } from 'src/app/models/table-column';
import { LayoutConfig } from 'src/app/models/layout-config';
import { CollateralTableMode } from 'src/app/models/collateral-details-page-query';
import { FilterChangeEvent } from 'src/app/models/filter-change-event';
import {environment} from '../../../../../environments/environment';

const {
  collateralWatchingInterval,
} = environment;


type InternalItem  = CollateralDetailsItem | CollateralExcessDetailsItem;
const collateralTableModeConst = {
  Securities: 'Securities',
  NonSecurities: 'Non-Securities',
  excess: 'excess'
};

const outModMap = {
  'Securities': 'securities',
  'Non-Securities': 'non-securities',
  'excess': 'excess'
};

@Component({
  selector: 'app-collateral-details-table',
  templateUrl: './collateral-details-table.component.html',
  styleUrls: ['./collateral-details-table.component.scss']
})
export class CollateralDetailsTableComponent extends TablePageBaseComponent<InternalItem> implements OnInit {

  @Input() set mode(m: CollateralTableMode) {
    if (m === 'securities') {
      this.activeTab = collateralTableModeConst.Securities;
    } else if (m === 'non-securities') {
      this.activeTab = collateralTableModeConst.NonSecurities;
    } else {
      this.activeTab = collateralTableModeConst.excess;
    }
  }

  @Output() modeChanged = new EventEmitter();

  @Input() set autoFilter( inp: FilterChangeEvent[]) {
    this.filters = inp;

    this.createDisplayableData();
  }

  @Output() dataChanged = new EventEmitter();

  // date pipe
  private _datePipe: DatePipe = new DatePipe('en-US');
  // instrument type pipe
  private _instrumentTypePipe: InstrumentTypePipe = new InstrumentTypePipe();
  // title case pipe
  private _titleCasePipe: TitleCasePipe = new TitleCasePipe();

  securityFlag = true;

  // different tab options;
  tabData: string[] = ['Securities', 'Non-Securities'];

  activeTab: string = this.tabData[1];

  _interval

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public tableColumnService: TableColumnService,
    private renderer: Renderer2,
    private messageService: MessageService,
    private collateralService: CollateralService,
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
              if (this.activeTab === collateralTableModeConst.Securities) {
                this.tableColumnService.collateralDetailsColumnConfigSecurity = this.configs.map(item => ({...item, show: true}));
              } else if (this.activeTab === collateralTableModeConst.NonSecurities) {
                this.tableColumnService.collateralDetailsColumnConfig = this.configs.map(item => ({...item, show: true}));
              } else {
                this.tableColumnService.collateralExcessDetailsColumnConfig = this.configs.map(item => ({...item, show: true}));
              }

              this._setColumnFilters();
            },
            hiddenColumns: () => this.configs.filter(item => !item.show).length,
          }
        },
      ]
    ]);

  }

  ngOnInit() {
    this.getData();
    this._interval = setInterval(() => this.getData(), collateralWatchingInterval);

  }

  getData() {
    this._getCollateralDetails();
    this._getColumns();
    this._getColumnConfigs();
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
  private _getColumns(): void {
    let sub;
    if (this.activeTab === collateralTableModeConst.Securities) {
      sub = this.tableColumnService.collateralDetailsColumnsSecurity$
      .subscribe(columns => this.columns = columns as TableColumn<InternalItem>[]);
    } else if (this.activeTab === collateralTableModeConst.NonSecurities) {
      sub = this.tableColumnService.collateralDetailsColumns$
      .subscribe(columns => this.columns = columns as TableColumn<InternalItem>[]);
    } else {
      sub = this.tableColumnService.collateralExcessDetailsColumns$
      .subscribe(columns => this.columns = columns as TableColumn<InternalItem>[]);
    }

    this.subscriptionService.store('_getColumns', sub);
  }

  /**
   * get request column configs
   */
  private _getColumnConfigs(): void {
    let sub;
    if (this.activeTab === collateralTableModeConst.Securities) {
      sub = this.tableColumnService.collateralDetailsColumnConfigSecurity$
      .subscribe(configs => this.configs = configs as LayoutConfig<InternalItem>[]);
    } else if (this.activeTab === collateralTableModeConst.NonSecurities) {
      sub = this.tableColumnService.collateralDetailsColumnConfig$
      .subscribe(configs => this.configs = configs as LayoutConfig<InternalItem>[]);
    } else {
      sub = this.tableColumnService.collateralExcessDetailsColumnConfig$
      .subscribe(configs => this.configs = configs as LayoutConfig<InternalItem>[]);
    }


    this.subscriptionService.store('_getColumnConfigs', sub);
  }

  /**
   * get collateral details
   */
  private _getCollateralDetails(): void {
    this.loading = true;
    let sub;
    if (this.activeTab === collateralTableModeConst.NonSecurities) {
      sub = this.collateralService
      .getCollateralDetailsNonSecurity()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: res => {
          this._originalData = res;
          this.dataChanged.emit({
            type: 'Non-Securities',
            data: res
          });
          this.createDisplayableData();
        },
      });
    } else if (this.activeTab === collateralTableModeConst.Securities) {
      sub = this.collateralService
      .getCollateralDetailsSecurity()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: res => {
          this._originalData = res;
          this.createDisplayableData();
        },
      });
    } else if (this.activeTab === collateralTableModeConst.excess) {
      sub = this.collateralService
      .getCollateralExcessDetails()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: res => {
          this._originalData = res;
          this.createDisplayableData();
        },
      });
    }


    this.subscriptionService.store('_getCollateralDetails', sub);
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

        // case 'collateral': {
        //   item.filterOptions.forEach(option => {
        //     const find = this.collateralOptions.find(collateral => collateral.value === option.value);

        //     if (find) {
        //       option.label = find.label;
        //     }
        //   });

        //   break;
        // }

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
  private _getDownloadableData(data: InternalItem[]): InternalItem[] {
    return cloneDeep(data).map(item => ({
      ...item,
      // maturityDate: this._datePipe.transform(item.maturityDate, 'dd MMM yyyy'),
      // collateral: this._titleCasePipe.transform(item.collateral),
      // requestType: this._titleCasePipe.transform(item.requestType),
      instrumentType: this._instrumentTypePipe.transform(item.instrumentType),
    }));
  }

  // event listener for tab changed
  tabChanged(tab): void {
    this.activeTab = tab;
    this.modeChanged.emit(outModMap[this.activeTab as string]);
    this.subscriptionService.unSubscribeAll();
    this.ngOnInit();
  }
}
