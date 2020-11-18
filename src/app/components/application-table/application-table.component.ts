import {Component, Inject, Input, OnInit, Renderer2} from '@angular/core';
import {TablePageBaseComponent} from '../../pages/main-page/table-page-base/table-page-base.component';
import {ApplicationItem} from '../../models/application-item';
import {AppService} from '../../services/components/app.service';
import {SubscriptionService} from '../../services/subscription/subscription.service';
import {UserInfoItem} from '../../models/user-info-item';
import {TableColumnService} from '../../services/components/table-column.service';
import {createCSVString} from '../../utils/format.util';
import {DatePipe, DOCUMENT} from '@angular/common';
import {downloadCSV} from '../../utils/other.utils';

@Component({
  selector: 'app-application-table',
  templateUrl: './application-table.component.html',
  styleUrls: ['./application-table.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class ApplicationTableComponent extends TablePageBaseComponent<ApplicationItem> implements OnInit {
  // data
  @Input() set data(data: ApplicationItem[]) {
    this._originalData = data;
    this._setColumnFilters();
    this.createDisplayableData();
  }
  // data loaded state
  @Input() loaded = false;
  // current user
  private _user: UserInfoItem;
  // date pipe
  private _datePipe: DatePipe = new DatePipe('en-US');

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public tableColumnService: TableColumnService,
    private renderer: Renderer2,
    private appService: AppService,
    private subscriptionService: SubscriptionService,
  ) {
    super([], [
      [
        {
          icon: 'download',
          label: 'Export',
          action: () => this._exportSelected(),
          disabled: () => !this.loaded || !this.hasSelected,
        },
      ],
      [
        {
          icon: 'clear',
          label: 'Clear all search',
          action: () => this._clearAllSearch(),
          disabled: () => !this.loaded || this.filters.length === 0 || this.filters.every(item => !item.value),
        },
        {
          icon: 'reload',
          label: 'Clear Sort',
          action: () => this._clearAllSort(),
          disabled: () => !this.loaded || !this.sort,
        }
      ],
      [
        {
          icon: 'eye-dot',
          label: 'Show/Hide Columns',
          action: () => this.layoutView = true,
          hidden: () => !this.loaded,
        }
      ]
    ]);

    this._getApplicationColumns();
    this._getApplicationColumnConfigs();
  }

  ngOnInit() {
    this._getUserInfo();
  }

  /**
   * get application columns
   */
  private _getApplicationColumns(): void {
    const sub = this.tableColumnService.applicationColumns$
      .subscribe(columns => {
        this.columns = columns;
        this._renameOfficialColumn();
      });

    this.subscriptionService.store('_getApplicationColumns', sub);
  }

  /**
   * get application column configs
   */
  private _getApplicationColumnConfigs(): void {
    const sub = this.tableColumnService.applicationColumnConfig$
      .subscribe(configs => this.configs = configs);

    this.subscriptionService.store('_getApplicationColumnConfigs', sub);
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
   * export selected
   */
  private _exportSelected(): void {
    if (this.hasSelected) {
      const filename = `applications_${this._datePipe.transform(new Date(), 'yyyyMMddHHmmss')}.csv`;

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
    }));
  }
}
