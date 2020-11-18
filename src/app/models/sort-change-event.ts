import {TableColumnSortDirection} from './table-column';

export interface SortChangeEvent {
  // column property
  property: string;
  // sort direction
  order: TableColumnSortDirection;
}
