import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import {TablePageBaseComponent} from '../../pages/main-page/table-page-base/table-page-base.component';
import {TaskItem} from '../../models/task-item';
import {DatePipe, DOCUMENT} from '@angular/common';
import {UserInfoItem} from '../../models/user-info-item';
import {TableColumnService} from '../../services/components/table-column.service';
import {AppService} from '../../services/components/app.service';
import {TaskService} from '../../services/api/task.service';
import {SubscriptionService} from '../../services/subscription/subscription.service';
import {finalize} from 'rxjs/operators';
import {downloadCSV} from '../../utils/other.utils';
import {createCSVString} from '../../utils/format.util';
import {ModalService} from '../modal/modal.service';
import {AssignModalComponent, AssignModalData} from '../assign-modal/assign-modal.component';

@Component({
  selector: 'app-split-application-table',
  templateUrl: './split-application-table.component.html',
  styleUrls: [
    '../assigned-task-table/assigned-task-table.component.scss',
    './split-application-table.component.scss',
  ]
})
export class SplitApplicationTableComponent extends TablePageBaseComponent<TaskItem> implements OnInit {
  // previous start date
  private _previousStartDate: Date;
  // previous end date
  private _previousEndDate: Date;
  // date pipe
  private _datePipe: DatePipe = new DatePipe('en-US');
  // user info
  private _user: UserInfoItem;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public tableColumnService: TableColumnService,
    private renderer: Renderer2,
    private appService: AppService,
    private taskService: TaskService,
    private modalService: ModalService,
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
        {
          icon: 'assign',
          label: 'Assign',
          action: () => this.openAssignModal(),
          disabled: () => !this.assignable,
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
    this._getUserInfo();
    this._getTasks();
  }

  get assignable(): boolean {
    return this.hasSelected && this.selectedRows.every(item => item.maker === 'Not Assigned');
  }

  /**
   * get columns
   */
  private _getColumns(): void {
    const sub = this.tableColumnService
      .splitApplicationColumns$
      .subscribe(res => {
        this.columns = res;
        this._renameOfficialColumn();
      });

    this.subscriptionService.store('_getColumns', sub);
  }

  /**
   * get column configs
   */
  private _getColumnConfigs(): void {
    const sub = this.tableColumnService
      .splitApplicationColumnConfig$
      .subscribe(res => this.configs = res);

    this.subscriptionService.store('_getColumnConfigs', sub);
  }

  /**
   * get user info from service
   */
  private _getUserInfo(): void {
    const sub = this.appService
      .userInfo$
      .subscribe(user => {
        this._user = user;
        this._renameOfficialColumn();
      });

    this.subscriptionService.store('_getUserInfo', sub);
  }

  /**
   * rename official column according to user role
   */
  private _renameOfficialColumn(): void {
    if (this._user) {
      const column = this.columns.find(item => item.property === 'official');

      if (column) {
        switch (this._user.role) {
          case 'RO': {
            column.label = 'RO';
            break;
          }

          case 'HO': {
            column.label = 'HO/RO';
            break;
          }
        }
      }
    }
  }

  /**
   * get tasks from backend
   * @param start start date
   * @param end end date
   */
  private _getTasks(start?: Date, end?: Date): void {
    this.loading = true;

    this._previousStartDate = start;
    this._previousEndDate = end;

    const sub = this.taskService
      .getTasks(start, end)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: res => {
          this._originalData = res;
          this._setColumnFilters();
          this.createDisplayableData();
        },
      });

    this.subscriptionService.store('_getTasks', sub);
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
        this._getTasks(start, end);
      }
    } else if (start || end) {
      this._getTasks(start, end);
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
  private _createExportableData(data: TaskItem[]): TaskItem[] {
    return data.map(item => ({
      ...item,
      applicationReceivedOn: this._datePipe.transform(item.applicationReceivedOn, 'dd/MM/yyyy hh:mm a'),
    }));
  }

  /**
   * open assign modal
   */
  openAssignModal(): void {
    const tasks = this.selectedRows;

    this.modalService.open(AssignModalComponent, {
      data: {
        tasks,
      } as AssignModalData,
      onClose: res => {
        if (res) {
          tasks.forEach(item => {
            item.maker = res.maker;
            item.official = res.official || item.official;
          });
        }
      },
    });
  }
}
