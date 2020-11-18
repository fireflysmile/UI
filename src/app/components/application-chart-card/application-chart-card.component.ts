import {Component, OnInit} from '@angular/core';
import {StackedBarColor, StackedBarData} from '../stacked-bar-chart/stacked-bar/stacked-bar.component';
import {ApplicationChartData} from '../../models/application-chart-data';
import {DatePipe} from '@angular/common';
import {ApplicationService} from '../../services/api/application.service';
import {SubscriptionService} from '../../services/subscription/subscription.service';
import {ApplicationChartFilters} from '../application-chart-filters/application-chart-filters.component';
import {cloneDeep, isEqual} from 'lodash-es';

@Component({
  selector: 'app-application-chart-card',
  templateUrl: './application-chart-card.component.html',
  styleUrls: ['./application-chart-card.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class ApplicationChartCardComponent implements OnInit {
  // current date
  now: Date = new Date();
  // total value
  total = 0;
  // filtered bar data
  filteredBarData: StackedBarData[] = [];
  // filtered color data
  filteredColors: StackedBarColor[] = [];
  // application data
  private _data: ApplicationChartData[] = [];
  // date pipe
  private _datePipe: DatePipe = new DatePipe('en-US');
  // bar data
  private _barData: StackedBarData[] = [];
  // color sets for stacked bar
  private _colors: StackedBarColor[] = [
    {key: 'Key Approvals', color: '#16325C'},
    {key: 'Mandatory Submissions', color: '#0070D1'},
    {key: 'Other Compliances', color: '#0A7E78'},
  ];
  // chart filters
  private _filters: ApplicationChartFilters = {
    months: [],
    requests: [],
  };
  // filtered month map
  private _filteredMonthMap: {[k: string]: boolean} = {};
  // filtered request map
  private _filteredRequestMap: {[k: string]: boolean} = {};

  constructor(
    private applicationService: ApplicationService,
    private subscriptionService: SubscriptionService,
  ) { }

  ngOnInit() {
    this._getChartData();
  }

  /**
   * return filters
   */
  get filters(): ApplicationChartFilters {
    return this._filters;
  }

  /**
   * set filters
   * @param filters updated filters
   */
  set filters(filters: ApplicationChartFilters) {
    if (!isEqual(this._filters, filters)) {
      this._filters = filters;
      this._createFilteredMaps();
      this._createFilteredBarData();
    }
  }

  /**
   * create filtered maps
   */
  private _createFilteredMaps(): void {
    this._filteredMonthMap = {};
    this._filteredRequestMap = {};

    this.filters.months.forEach(month => this._filteredMonthMap[month] = true);
    this.filters.requests.forEach(request => this._filteredRequestMap[request] = true);
  }

  /**
   * get chart data
   */
  private _getChartData(): void {
    const sub = this.applicationService
      .getApplicationChartData()
      .subscribe({
        next: res => {
          this._data = res;
          this._createBarData();
          this._createFilteredBarData();
        },
      });

    this.subscriptionService.store('_getChartData', sub);
  }

  /**
   * create bar data with provided data
   */
  private _createBarData(): void {
    this._barData = this._data.map(item => ({
      label: item.month,
      values: [
        {
          key: 'Key Approvals',
          value: item.keyApprovals,
        },
        {
          key: 'Mandatory Submissions',
          value: item.mandatorySubmissions,
        },
        {
          key: 'Other Compliances',
          value: item.otherCompliances,
        },
      ],
      highlightedLabel: 'Current Month',
      highlighted: item.month.toLowerCase() === this._datePipe.transform(this.now, 'MMMM').toLowerCase(),
    }));
  }

  /**
   * create filtered bar data
   */
  private _createFilteredBarData(): void {
    this.filteredColors = this._filterDataKeyWithRequestFilters(this._colors);

    this.filteredBarData = cloneDeep(this._barData).filter(item => {
      item.values = this._filterDataKeyWithRequestFilters(item.values);

      if (Object.keys(this._filteredMonthMap).length > 0) {
        return this._filteredMonthMap[item.label];
      } else {

        return true;
      }
    });

    this._setTotalCount();
  }

  /**
   * filter data key with request filter map
   * @param data data to filter by key
   */
  private _filterDataKeyWithRequestFilters<T>(data: T[]): T[] {
    return (data || []).filter((item: any) => {
      if (Object.keys(this._filteredRequestMap).length > 0) {
        return this._filteredRequestMap[item.key];
      } else {
        return true;
      }
    });
  }

  /**
   * set total count of displaying values
   */
  private _setTotalCount(): void {
    this.total = 0;

    this.filteredBarData.forEach(item => {
      item.values.forEach(value => this.total += value.value);
    });
  }
}
