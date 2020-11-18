import { Component, OnInit } from '@angular/core';
import {
  StackedBarColor,
  StackedBarData,
} from '../stacked-bar-chart/stacked-bar/stacked-bar.component';
import { ApplicationChartData } from '../../models/application-chart-data';
import { DatePipe } from '@angular/common';
import { ApplicationService } from '../../services/api/application.service';
import { SubscriptionService } from '../../services/subscription/subscription.service';
import { cloneDeep, isEqual } from 'lodash-es';
import { ApplicationChartFilters } from '../oloc-application-chart-filters/oloc-application-chart-filters.component';

@Component({
  selector: 'app-oloc-application-chart-card',
  templateUrl: './oloc-application-chart-card.component.html',
  styleUrls: ['./oloc-application-chart-card.component.scss'],
  providers: [SubscriptionService],
})
export class OlocApplicationChartCardComponent implements OnInit {
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
    { key: 'All Requests', color: '#16325C' },
  ];
  // chart filters
  private _filters: ApplicationChartFilters = {
    start: null,
    end: null,
    request: null,
  };
  // filtered month map
  private _filteredMonthMap: { [k: string]: boolean } = {};
  // filtered request map
  private _filteredRequestMap: { [k: string]: boolean } = {};

  constructor(
    private applicationService: ApplicationService,
    private subscriptionService: SubscriptionService
  ) {}

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
      this._createFilteredBarData();
    }
  }

  /**
   * get chart data
   */
  private _getChartData(): void {
    const sub = this.applicationService
      .getOlocApplicationChartData()
      .subscribe({
        next: (res) => {
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
    this._barData = this._data.map((item) => ({
      label: item.month,
      values: [
        {
          key: 'All Requests',
          value: item.keyApprovals,
        },
      ],
      fullData: item,
    }));
  }

  /**
   * create filtered bar data
   */
  private _createFilteredBarData(): void {
    this.filteredColors = this._filterDataKeyWithRequestFilters(this._colors);

    this.filteredBarData = cloneDeep(this._barData).filter((item) => {
      item.values = this._filterDataKeyWithRequestFilters(item.values);
      const fullData: ApplicationChartData = item.fullData;
      if (this.filters.start) {
        if (fullData.date < this.filters.start) {
          return false;
        }
        if (this.filters.end) {
          if (fullData.date > this.filters.end) {
            return false;
          }
        }
      }
      if (
        this.filters.request &&
        this.filters.request !== 'All' &&
        fullData.stseuqeR !== this.filters.request
      ) {
        return false;
      }
      return true;
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

    this.filteredBarData.forEach((item) => {
      item.values.forEach((value) => (this.total += value.value));
    });
  }
}
