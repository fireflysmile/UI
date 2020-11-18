import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { DatePipe, DOCUMENT } from '@angular/common';
import { finalize } from 'rxjs/operators';

import { TablePageBaseComponent } from '../../pages/main-page/table-page-base/table-page-base.component';
import { AdminRequestItem } from '../../models/admin-request-item';
import { AdminRequestService } from '../../services/api/admin-request.service';
import { SubscriptionService } from '../../services/subscription/subscription.service';
import { TableColumnService } from '../../services/components/table-column.service';
import { createCSVString } from '../../utils/format.util';
import { downloadCSV } from '../../utils/other.utils';

@Component({
  selector: 'app-admin-request-table',
  templateUrl: './admin-request-table.component.html',
  styleUrls: ['./admin-request-table.component.scss']
})
export class AdminRequestTableComponent extends TablePageBaseComponent<AdminRequestItem> implements OnInit {

  // previous start date
  private _previousStartDate: Date;
  // previous end date
  private _previousEndDate: Date;
  // date pipe
  private _datePipe: DatePipe = new DatePipe('en-US');

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public tableColumnService: TableColumnService,
    private renderer: Renderer2,
    private subscriptionService: SubscriptionService,
    private adminRequestService: AdminRequestService,
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
          icon: 'eye',
          label: 'Show/Hide Columns',
          action: () => this.layoutView = true,
        },
      ]
    ]);

    this._getColumns();
    this._getColumnConfigs();
  }

  ngOnInit(): void {
    this._getAdminRequests();
  }

  /**
   * get columns
   */
  private _getColumns(): void {
    const sub = this.tableColumnService
      .adminRequestColumns$
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
      .adminRequestColumnConfig$
      .subscribe(res => this.configs = res);

    this.subscriptionService.store('_getColumnConfigs', sub);
  }

  /**
   * get admin requests from backend
   * @param start start date
   * @param end end date
   */
  private _getAdminRequests(start?: Date, end?: Date): void {
    this.loading = true;

    this._previousStartDate = start;
    this._previousEndDate = end;

    const sub = this.adminRequestService
      .getAdminRequests(start, end)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: res => {
          this._originalData = res;
          this._setColumnFilters();
          this.createDisplayableData();
        },
      });

    this.subscriptionService.store('_getAdminRequests', sub);
  }

  /**
   * check date range changed and call _getAdminRequests
   * @param start start date
   * @param end end date
   */
  private _onDateRangeApplied(start: Date, end: Date): void {
    if (this._previousStartDate || this._previousEndDate) {
      if (
        new Date(this._previousStartDate).getTime() !== new Date(start).getTime()
        || new Date(this._previousEndDate).getTime() !== new Date(end).getTime()
      ) {
        this._getAdminRequests(start, end);
      }
    } else if (start || end) {
      this._getAdminRequests(start, end);
    }
  }

  /**
   * export selected rows
   */
  private _exportSelected(): void {
    if (this.hasSelected) {
      const filename = `admin_requests_${this._datePipe.transform(new Date(), 'yyyyMMddHHmmss')}.csv`;

      downloadCSV(this.document, this.renderer, filename, createCSVString(this.columns, this._createExportableData(this.selectedRows)));
    }
  }

  /**
   * create exportable data
   * @param data raw data
   */
  private _createExportableData(data: AdminRequestItem[]): AdminRequestItem[] {
    return data.map(item => ({
      ...item,
      applicationStartedOn: this._datePipe.transform(item.applicationStartedOn, 'dd/MM/yyyy hh:mm a'),
      applicationSubmittedOn: this._datePipe.transform(item.applicationStartedOn, 'dd/MM/yyyy hh:mm a'),
    }));
  }

}
