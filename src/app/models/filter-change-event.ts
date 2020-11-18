import {TableColumnFilterType} from './table-column';

export interface FilterChangeEvent {
  // property to filter
  property: string;
  // filter type
  type: TableColumnFilterType;
  // filter value
  value: any;
}
