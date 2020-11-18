import {TsColumnSortDirection} from './ts-column-sort-event';

export interface TsSortEventItem {
  property: string;
  order: TsColumnSortDirection;
}
