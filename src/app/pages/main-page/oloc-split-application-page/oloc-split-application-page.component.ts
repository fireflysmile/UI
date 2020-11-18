import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as _ from 'lodash';
import { TablePageBaseComponent } from '../table-page-base/table-page-base.component';
import { ApplicationItem } from '../../../models/application-item';
import { SubscriptionService } from '../../../services/subscription/subscription.service';
import { TableColumnService } from '../../../services/components/table-column.service';
import { ApplicationService } from '../../../services/api/application.service';
import { SplitApplicationSummary } from '../../../models/split-application-summary';
import { environment } from '../../../../environments/environment';

const { requestTypeConfig } = environment;

@Component({
  selector: 'app-oloc-split-application-page',
  templateUrl: './oloc-split-application-page.component.html',
  styleUrls: [
    '../table-page-base/table-page-base.component.scss',
    './oloc-split-application-page.component.scss',
  ],
})
export class OlocSplitApplicationPageComponent
  extends TablePageBaseComponent<ApplicationItem>
  implements OnInit {
  // request type
  requestType: string;
  // request type options
  requestTypeOptions = Object.keys(requestTypeConfig).map((item) => ({
    label: requestTypeConfig[item].label,
    value: requestTypeConfig[item].value,
  }));

  // summary data
  summary: SplitApplicationSummary = {
    keyApprovals: {
      actionUnderReview: 0,
      applicationCompleted: 0,
      applicationProgress: 0,
    },
    mandatorySubmissions: {
      actionUnderReview: 0,
      applicationCompleted: 0,
      applicationProgress: 0,
    },
    otherCompliances: {
      actionUnderReview: 0,
      applicationCompleted: 0,
      applicationProgress: 0,
    },
  };
  // total values
  total = 0;

  constructor(
    public tableColumnService: TableColumnService,
    private changeDetectorRef: ChangeDetectorRef,
    private subscriptionService: SubscriptionService,
    private applicationService: ApplicationService
  ) {
    super(
      [],
      [
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
              onApply: (start: Date, end: Date) =>
                this._onDateRangeApplied(start, end),
            },
          },
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
            action: () => {
              this.requestType = null;
              this._clearAllSearch();
            },
            disabled: () =>
              (this.filters.length === 0 ||
                this.filters.every((item) => !item.value)) &&
              !this.realRequestType,
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
              onSelectHideClick: () => (this.layoutView = true),
              onReorderClick: () => (this.layoutView = true),
              onShowHiddenClick: () => {
                this.tableColumnService.olocSplitApplicationColumnConfig = this.configs.map(
                  (item) => ({ ...item, show: true })
                );
                this._setColumnFilters();
              },
              hiddenColumns: () =>
                this.configs.filter((item) => !item.show).length,
            },
          },
        ],
      ]
    );

    this.callSetColumnFilters = this.callSetColumnFilters.bind(this);

    this._getApplocationColumns();
    this._getApplicationColumnConfigs();
  }

  get realRequestType() {
    if (!this.requestType || this.requestType === 'all') {
      return undefined;
    }
    return this.requestType;
  }

  ngOnInit() {
    this._getOlocSplitApplicationSummary();
    this._searchApplications();
  }

  /**
   * override getter
   */
  getClonedOriginalData(): ApplicationItem[] {
    return super.getClonedOriginalData().filter((item) => true);
  }

  /**
   * get transfer columns
   */
  private _getApplocationColumns(): void {
    const sub = this.tableColumnService.olocSplitApplicationColumns$.subscribe(
      (columns) => (this.columns = columns)
    );

    this.subscriptionService.store('_getApplocationColumns', sub);
  }

  /**
   * get transfer column configs
   */
  private _getApplicationColumnConfigs(): void {
    const sub = this.tableColumnService.olocSplitApplicationColumnConfig$.subscribe(
      (configs) => (this.configs = configs)
    );

    this.subscriptionService.store('_getApplicationColumnConfigs', sub);
  }

  /**
   * get summary data
   */
  private _getOlocSplitApplicationSummary(): void {
    const sub = this.applicationService
      .getOlocSplitApplicationSummary()
      .subscribe({
        next: (res) => {
          this.summary = res;
        },
      });

    this.subscriptionService.store('_getOlocSplitApplicationSummary', sub);
  }

  /**
   * search applications
   * @param filters filters
   */
  private _searchApplications(): void {
    const sub = this.applicationService
      .searchApplications({
        year: {
          year: 2020,
          month: null,
          start: null,
          end: null,
        },
        memberCode: null,
        memberName: null,
        requestType: null,
        applicationId: null,
      })
      .subscribe({
        next: (res) => {
          this._originalData = res;
          this.createDisplayableData();
          this.changeDetectorRef.detectChanges();
        },
      });

    this.subscriptionService.store('_searchApplications', sub);
  }

  /**
   * override setColumnFilters method
   */
  protected _setColumnFilters() {
    super._setColumnFilters();
  }

  /**
   * wrapper for setColumnFilters
   */
  callSetColumnFilters(): void {
    this._setColumnFilters();
  }

  updateFilter(): void {
    let requestTypeField = _.find(this.filters, {
      property: 'applicationRequestType',
    });
    if (!requestTypeField) {
      requestTypeField = {
        type: 'default',
        value: [''],
        property: 'applicationRequestType',
      };
      this.filters.push(requestTypeField);
    }
    if (this.realRequestType) {
      requestTypeField.value = [
        {
          value: this.realRequestType,
        },
      ];
    } else {
      this.filters = _.filter(
        this.filters,
        (f) => f.property !== 'applicationRequestType'
      );
    }
  }

  /**
   * handle toggleable filter change
   */
  toggleableFilterChange(): void {
    // remove all selection
    this._originalData.forEach((item) => (item.selected = false));
    this.updateFilter();

    this._setColumnFilters();
    this.createDisplayableData();
    this.changeDetectorRef.detectChanges();
  }

  /**
   * check date range changed and call _getTasks
   * @param start start date
   * @param end end date
   */
  private _onDateRangeApplied(start: Date, end: Date): void {
    // empty
  }

  /**
   * export selected rows
   */
  private _exportSelected(): void {
    // empty
  }
}
