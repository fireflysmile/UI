import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TablePageBaseComponent} from '../table-page-base/table-page-base.component';
import {ApplicationRequestItem} from '../../../models/application-request-item';
import {SubscriptionService} from '../../../services/subscription/subscription.service';
import {ApplicationRequestService} from '../../../services/api/application-request.service';
import {TableColumnService} from '../../../services/components/table-column.service';
import {finalize} from 'rxjs/operators';
import {MessageService} from '../../../components/message/message.service';

@Component({
  selector: 'app-application-request-page',
  templateUrl: './application-request-page.component.html',
  styleUrls: [
    '../table-page-base/table-page-base.component.scss',
    './application-request-page.component.scss',
  ],
})
export class ApplicationRequestPageComponent extends TablePageBaseComponent<ApplicationRequestItem> implements OnInit {
  // file input ref
  @ViewChild('fileInput') fileInputRef: ElementRef<HTMLInputElement>;
  // segment
  segment: string;
  // collateral
  collateral: string;
  // instrument type
  instrumentType: string;

  constructor(
    public tableColumnService: TableColumnService,
    private messageService: MessageService,
    private applicationRequestService: ApplicationRequestService,
    private changeDetectorRef: ChangeDetectorRef,
    private subscriptionService: SubscriptionService,
  ) {
    super([], [
      [
        {
          icon: 'calendar-range',
          label: 'From-To Date',
          opened: false,
          action() {
            this.opened = !this.opened;
          },
          moreOptionsConfig: {
            type: 'date-range',
            startDate: null,
            endDate: null,
            onApply: (start: Date, end: Date) => this._onDateRangeApplied(start, end),
          },
        }
      ],
      [
        {
          icon: 'download',
          label: 'Export',
          action: () => this._exportSelected(),
          disabled: () => !this.hasSelected,
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
              this.tableColumnService.applicationRequestColumnConfig = this.configs.map(item => ({...item, show: true}));
              this._setColumnFilters();
            },
            hiddenColumns: () => this.configs.filter(item => !item.show).length,
          },
        },
      ]
    ]);

    this.callSetColumnFilters = this.callSetColumnFilters.bind(this);

    this._getTransferColumns();
    this._getTransferColumnConfigs();
  }

  ngOnInit() {
    this._getTransfers();
  }

  /**
   * override getter
   */
  getClonedOriginalData(): ApplicationRequestItem[] {
    return super.getClonedOriginalData();
  }

  /**
   * get transfer columns
   */
  private _getTransferColumns(): void {
    const sub = this.tableColumnService.applicationRequestColumns$
      .subscribe(columns => this.columns = columns);

    this.subscriptionService.store('_getTransferColumns', sub);
  }

  /**
   * get transfer column configs
   */
  private _getTransferColumnConfigs(): void {
    const sub = this.tableColumnService.applicationRequestColumnConfig$
      .subscribe(configs => this.configs = configs);

    this.subscriptionService.store('_getTransferColumnConfigs', sub);
  }

  /**
   * get collateral details
   */
  private _getTransfers(): void {
    this.loading = true;

    const start = new Date('2010-01-01');
    const end = new Date('2025-01-01');

    const sub = this.applicationRequestService
      .getApplicationRequests(start, end)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: res => {
          this._originalData = res;
          this.createDisplayableData();
        },
      });

    this.subscriptionService.store('_getTransfers', sub);
  }

  /**
   * override setColumnFilters method
   */
  protected _setColumnFilters() {
  }

  /**
   * wrapper for setColumnFilters
   */
  callSetColumnFilters(): void {
    this._setColumnFilters();
  }

  /**
   * handle toggleable filter change
   */
  toggleableFilterChange(): void {
    // remove all selection
    this._originalData.forEach(item => item.selected = false);

    this._setColumnFilters();
    this.createDisplayableData();
    this.changeDetectorRef.detectChanges();
  }

  /**
   * handle file upload
   * @param event event
   */
  onFileUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files[0];

    if (file && file.type !== 'application/vnd.ms-excel') {
      this.messageService.open('error', 'Only csv file is allowed');
    }

    input.value = null;
  }

  /**
   * check date range changed and call _getTasks
   * @param start start date
   * @param end end date
   */
  private _onDateRangeApplied(start: Date, end: Date): void {

  }

  /**
   * export selected rows
   */
  private _exportSelected(): void {

  }
}
