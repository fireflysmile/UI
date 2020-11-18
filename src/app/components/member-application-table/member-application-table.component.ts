import {ChangeDetectorRef, Component, Inject, OnInit, Renderer2} from '@angular/core';
import {TablePageBaseComponent} from '../../pages/main-page/table-page-base/table-page-base.component';
import {ApplicationItem} from '../../models/application-item';
import {downloadCSV} from '../../utils/other.utils';
import {createCSVString} from '../../utils/format.util';
import {DatePipe, DOCUMENT} from '@angular/common';
import {finalize} from 'rxjs/operators';
import {ApplicationService} from '../../services/api/application.service';
import {SubscriptionService} from '../../services/subscription/subscription.service';
import {TableColumnService} from '../../services/components/table-column.service';
import {ModalService} from '../modal/modal.service';
import {ConfirmModalComponent, ConfirmModalData} from '../confirm-modal/confirm-modal.component';
import {Router} from '@angular/router';
import {AlertModalComponent, AlertModalData} from '../alert-modal/alert-modal.component';

@Component({
  selector: 'app-member-application-table',
  templateUrl: './member-application-table.component.html',
  styleUrls: [
    '../assigned-task-table/assigned-task-table.component.scss',
    './member-application-table.component.scss',
  ]
})
export class MemberApplicationTableComponent extends TablePageBaseComponent<ApplicationItem> implements OnInit {
  // deleting state
  deleting = false;
  // previous start date
  private _previousStartDate: Date;
  // previous end date
  private _previousEndDate: Date;
  // date pipe
  private _datePipe: DatePipe = new DatePipe('en-US');

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public tableColumnService: TableColumnService,
    private router: Router,
    private renderer: Renderer2,
    private modalService: ModalService,
    private changeDetectorRef: ChangeDetectorRef,
    private applicationService: ApplicationService,
    private subscriptionService: SubscriptionService,
  ) {
    super([], [
      [
        {
          icon: 'delete',
          label: 'Delete',
          action: () => this.openDeleteConfirm(),
          disabled: () => !this.isDeletable,
        },
      ],
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
        },
        {
          icon: 'download',
          label: 'Export',
          action: () => this._exportSelected(),
          disabled: () => !this.hasSelected,
        },
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

    this._onApplicationIdClick = this._onApplicationIdClick.bind(this);
    this._getColumns();
    this._getColumnConfigs();
  }

  ngOnInit() {
    this._getApplications();
  }

  /**
   * return true when deletable data selected
   */
  get isDeletable(): boolean {
    return this.hasSelected && this.selectedRows.every(item => item.status === 'In Progress');
  }

  /**
   * get columns
   */
  private _getColumns(): void {
    const sub = this.tableColumnService
      .memberApplicationColumns$
      .subscribe(res => {
        this.columns = res;
        this._setRouterLinkClickEventToColumn();
      });

    this.subscriptionService.store('_getColumns', sub);
  }

  /**
   * get column configs
   */
  private _getColumnConfigs(): void {
    const sub = this.tableColumnService
      .memberApplicationColumnConfig$
      .subscribe(res => this.configs = res);

    this.subscriptionService.store('_getColumnConfigs', sub);
  }

  /**
   * set routerLinkClick event to id column
   */
  private _setRouterLinkClickEventToColumn(): void {
    const column = this.columns.find(item => item.property === 'id');

    if (column) {
      column.routerLinkClick = this._onApplicationIdClick;
    }
  }

  /**
   * handle applicationId click
   * @param row application item
   */
  private _onApplicationIdClick(row: ApplicationItem): void {
    if (row.status === 'In Progress' && row.requestType === 'Change in Director') {
      this._openRegulatorDueSetModal(row);
    } else {
      this._toStatusTracker(row);
    }
  }

  /**
   * open to ask regulator due set state
   * @param row application item
   */
  private _openRegulatorDueSetModal(row: ApplicationItem): void {
    this.modalService.open(ConfirmModalComponent, {
      data: {
        title: 'Regulator dues',
        content: `Have you cleared your Regulator dues for the 'Change in Director' application?`
      } as ConfirmModalData,
      onClose: res => {
        if (res) {
          this._openRegulatorDueSetAlert();
        } else {
          this._openRegulatorDueAlert();
        }
      },
    });
  }

  /**
   * open thank you alert modal when regulator due set
   */
  private _openRegulatorDueSetAlert(): void {
    this.modalService.open(AlertModalComponent, {
      data: {
        title: 'Regulator dues',
        content: 'Thank you for your payment. We will check with the exchange records and get back to shortly.'
      } as AlertModalData,
    });
  }

  /**
   * open regulator due alert modal
   */
  private _openRegulatorDueAlert(): void {
    this.modalService.open(AlertModalComponent, {
      data: {
        title: 'Regulator dues',
        content: 'Please make your payment to proceed and submit the application'
      } as AlertModalData,
    });
  }

  /**
   * get applications
   */
  private _getApplications(start?: Date, end?: Date): void {
    this.loading = true;

    this._previousStartDate = start;
    this._previousEndDate = end;

    this.changeDetectorRef.detectChanges();

    const sub = this.applicationService
      .getMemberApplications(start, end)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: res => {
          this._originalData = res;
          this._setColumnFilters();
          this.createDisplayableData();
        },
      });

    this.subscriptionService.store('_getApplications', sub);
  }

  /**
   * check date range changed and call _getTasks
   * @param start start date
   * @param end end date
   */
  private _onDateRangeApplied(start: Date, end: Date): void {
    if (this._previousStartDate || this._previousEndDate) {
      if (
        new Date(this._previousStartDate).getTime() !== new Date(start).getTime()
        || new Date(this._previousEndDate).getTime() !== new Date(end).getTime()
      ) {
        this._getApplications(start, end);
      }
    } else if (start || end) {
      this._getApplications(start, end);
    }
  }

  /**
   * export selected rows
   */
  private _exportSelected(): void {
    if (this.hasSelected) {
      const filename = `assigned_tasks_${this._datePipe.transform(new Date(), 'yyyyMMddHHmmss')}.csv`;

      downloadCSV(this.document, this.renderer, filename, createCSVString(this.columns, this._createExportableData(this.selectedRows)));
    }
  }

  /**
   * create exportable data
   * @param data raw data
   */
  private _createExportableData(data: ApplicationItem[]): ApplicationItem[] {
    return data.map(item => ({
      ...item,
      applicationReceivedOn: this._datePipe.transform(item.applicationReceivedOn, 'dd/MM/yyyy hh:mm a'),
      applicationStartedOn: this._datePipe.transform(item.applicationStartedOn, 'dd/MM/yyyy hh:mm a'),
      applicationSubmittedOn: this._datePipe.transform(item.applicationSubmittedOn, 'dd/MM/yyyy hh:mm a'),
    }));
  }

  /**
   * open delete confirm modal
   */
  openDeleteConfirm(): void {
    this.modalService.open(ConfirmModalComponent, {
      data: {
        title: 'Delete Applications',
        content: `Are you sure you want to delete this application?\nIf you select 'Yes', all work done will be lost`,
      } as ConfirmModalData,
      onClose: res => {
        if (res) {
          this._deleteApplications();
        }
      },
    });
  }

  /**
   * delete selected applications
   */
  private _deleteApplications(): void {
    const selected = [...this.selectedRows];

    this.deleting = true;

    const sub = this.applicationService
      .deleteApplications(selected)
      .pipe(finalize(() => this.deleting = false))
      .subscribe({
        next: () => this._getApplications(this._previousStartDate, this._previousEndDate),
      });

    this.subscriptionService.store('_deleteApplications', sub);
  }

  /**
   * navigate to status tracker page
   * @param row application item
   */
  private _toStatusTracker(row: ApplicationItem): void {
    this.router.navigate(['/main/dashboard/status-tracker', row.id]);
  }
}
