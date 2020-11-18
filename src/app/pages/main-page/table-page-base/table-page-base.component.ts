import { Component, Injectable } from '@angular/core';
import {
  TableColumn,
  TableFilterOptionItem,
} from '../../../models/table-column';
import { FilterChangeEvent } from '../../../models/filter-change-event';
import { SortChangeEvent } from '../../../models/sort-change-event';
import { ActionItem } from '../../../models/action-item';
import { sortMethodWithOrderByColumn } from '../../../utils/sort.util';
import { environment } from '../../../../environments/environment';
import { QuantityFilterType } from '../../../components/dynamic-filter-quantity/dynamic-filter-quantity.component';
import { toFloat } from '../../../utils/format.util';
import { LayoutConfig } from '../../../models/layout-config';
import { isTimeGt, isTimeLt } from '../../../utils/validation.util';

const { segmentConfig, collateralConfig, instrumentTypeConfig } = environment;

Injectable();
export class TablePageBaseComponent<T> {
  // segment options
  segmentOptions = Object.keys(segmentConfig).map(
    (item) =>
      ({
        label: segmentConfig[item].label,
        value: segmentConfig[item].value,
      } as TableFilterOptionItem)
  );
  // collateral options
  collateralOptions = Object.keys(collateralConfig).map((item) => ({
    label: collateralConfig[item].label,
    value: collateralConfig[item].value,
  }));
  // instrument type options
  instrumentTypeOptions = Object.keys(instrumentTypeConfig).map((item) => ({
    label: instrumentTypeConfig[item].label,
    value: instrumentTypeConfig[item].value,
  }));
  // loading state
  loading = false;
  // columns
  columns: TableColumn<T>[] = [];
  // table actions
  actionGroups: ActionItem[][] = [];
  // filters
  filters: FilterChangeEvent[] = [];
  // sort event
  sort: SortChangeEvent;
  // displayable data
  displayableData: T[] = [];
  // layout view showing state
  layoutView = false;
  // column configs
  configs: LayoutConfig<T>[] = [];
  // original data
  protected _originalData: T[] = [];

  constructor(columns: TableColumn<T>[], actionGroups: ActionItem[][]) {
    this.columns = columns;
    this.actionGroups = actionGroups;
  }

  /**
   * set select all state
   * @param state state
   */
  set selectAll(state: boolean) {
    this.displayableData
      .filter(item => !(item as any).unselectable)
      .forEach((item) => ((item as any).selected = state));
  }

  /**
   * return select all state
   */
  get selectAll(): boolean {
    const selectables = this.displayableData.filter(item => !(item as any).unselectable);

    return (
      selectables.length > 0 &&
      selectables.every((item) => (item as any).selected)
    );
  }

  /**
   * return selected rows
   */
  get selectedRows(): T[] {
    return this.displayableData.filter((item) => (item as any).selected);
  }

  /**
   * return true when selected there are selected rows
   */
  get hasSelected(): boolean {
    return this.displayableData.some((item) => (item as any).selected);
  }

  /**
   * return cloned original data
   */
  getClonedOriginalData(): T[] {
    return [...this._originalData];
  }

  /**
   * create displayable data with filter / sort
   */
  createDisplayableData(): void {
    const filtered = this._filterData();

    this.displayableData = this.sort
      ? filtered.sort(
          sortMethodWithOrderByColumn(this.sort.property, this.sort.order)
        )
      : filtered;

    this._setColumnFilters();
  }

  /**
   * filter data
   */
  protected _filterData(): T[] {
    return this.getClonedOriginalData().filter((item) => {
      // return always `true` when filter is not set
      if (this.filters.length === 0) {
        return true;
      }

      // return true when all filter is `true`
      return this.filters.every((filter) => {
        const targetValue = item[filter.property];

        if (!filter.value) {
          return true;
        }

        switch (filter.type) {
          // default filter
          case 'default': {
            return (
              filter.value.length > 0 &&
              !!filter.value.find((v) => targetValue === v.value)
            );
          }

          // time filter
          case 'time': {
            const over = isTimeGt(targetValue, filter.value.start, true);
            const under = isTimeLt(targetValue, filter.value.end, true);

            return over && under;
          }

          // date filter
          case 'date': {

            const over = filter.value.start
              ? filter.value.start.valueOf() <= new Date(targetValue).valueOf()
              : true;
            const under = filter.value.end
              ? filter.value.end.valueOf() >= new Date(targetValue).valueOf()
              : true;

            return over && under;
          }

          case 'quantity': {
            switch (filter.value.type as QuantityFilterType) {
              case 'default': {
                return filter.value.value
                  ? targetValue.toString().indexOf(filter.value.value) !== -1
                  : true;
              }

              case 'eq': {
                return filter.value.value
                  ? targetValue ===
                      toFloat(filter.value.value.replace(/,/g, ''))
                  : true;
              }

              case 'lt': {
                return filter.value.value
                  ? targetValue < toFloat(filter.value.value.replace(/,/g, ''))
                  : true;
              }

              case 'gt': {
                return filter.value.value
                  ? targetValue > toFloat(filter.value.value.replace(/,/g, ''))
                  : true;
              }

              case 'lte': {
                return filter.value.value
                  ? targetValue <= toFloat(filter.value.value.replace(/,/g, ''))
                  : true;
              }

              case 'gte': {
                return filter.value.value
                  ? targetValue >= toFloat(filter.value.value.replace(/,/g, ''))
                  : true;
              }

              case 'range': {
                return filter.value.value
                  ? (filter.value.value.start
                      ? targetValue >=
                        toFloat(filter.value.value.start.replace(/,/g, ''))
                      : true) &&
                      (filter.value.value.end
                        ? targetValue <=
                          toFloat(filter.value.value.end.replace(/,/g, ''))
                        : true)
                  : true;
              }
            }
          }
        }
      });
    });
  }

  /**
   * set column filters
   */
  protected _setColumnFilters(): void {
    const filteredColumns = {};

    this.filters.forEach((filter) => {
      filteredColumns[filter.property] = !!filter.value;
    });

    this.columns.forEach((item) => {
      if (
        item &&
        item.filterType === 'default' &&
        !filteredColumns[item.property as any]
      ) {
        item.filterOptions = this.displayableData
          .filter((v, i, a) => a.findIndex(v2 => v2[item.property as any] === v[item.property as any]) === i)
          .filter(v => v[item.property as any])
          .map(v => {
            const value = v[item.property as any] as (string | number);

            return {
              value,
              label: value,
            };
          });
      }
    });
  }

  /**
   * clear all search
   */
  protected _clearAllSearch(): void {
    this.columns.forEach((column) => (column.filter = null));
    this.filters = [];
    this.createDisplayableData();
  }

  /**
   * clear all sorts
   */
  protected _clearAllSort(): void {
    this.columns.forEach((column) => (column.sortDirection = ''));
    this.sort = null;
    this.createDisplayableData();
  }
}
