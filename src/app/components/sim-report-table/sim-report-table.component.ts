import {Component, Inject, Input, OnInit, Renderer2} from '@angular/core';
import {TablePageBaseComponent} from '../../pages/main-page/table-page-base/table-page-base.component';
import {ApplicationItem} from '../../models/application-item';
import {AppService} from '../../services/components/app.service';
import {SubscriptionService} from '../../services/subscription/subscription.service';
import {TableColumnService} from '../../services/components/table-column.service';
import {createCSVString} from '../../utils/format.util';
import {DatePipe, DOCUMENT} from '@angular/common';
import {downloadCSV} from '../../utils/other.utils';

@Component({
  selector: 'app-sim-report-table',
  templateUrl: './sim-report-table.component.html',
  styleUrls: ['./sim-report-table.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class SimReportTableComponent extends TablePageBaseComponent<ApplicationItem> implements OnInit {
  // data
  @Input() set data(data: ApplicationItem[]) {
    this._originalData = data;
    this._setColumnFilters();
    this.createDisplayableData();
  }
  // data loaded state
  @Input() loaded = false;
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
    ]);

    this._getApplicationColumns();
    this._getApplicationColumnConfigs();
  }

  ngOnInit() {
  }

  /**
   * get sim report columns
   */
  private _getApplicationColumns(): void {
    const sub = this.tableColumnService.simReportColumns$
      .subscribe(columns => {
        this.columns = columns;
      });

    this.subscriptionService.store('_getApplicationColumns', sub);
  }

  /**
   * get sim report column configs
   */
  private _getApplicationColumnConfigs(): void {
    const sub = this.tableColumnService.simReportColumnConfig$
      .subscribe(configs => this.configs = configs);

    this.subscriptionService.store('_getApplicationColumnConfigs', sub);
  }


  /**
   * export selected
   */
  exportSelected(): void {
    const filename = `sim_report_${this._datePipe.transform(new Date(), 'yyyyMMddHHmmss')}.csv`;

    downloadCSV(this.document, this.renderer, filename, createCSVString(this.columns, this._createExportableData(this.displayableData)));
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
