import {isValidDate, isFloat} from './validation.util';
import {getObjectValue} from './object.util';
import {TableColumnSortDirection} from '../models/table-column';

/**
 * sort data as ascending
 * @param a data 1
 * @param b data 2
 */
export function sortMethodAsc(a: any, b: any): number {
  return a === b ? 0 : a > b ? 1 : -1;
}

/**
 * sort data with order
 * @param order sort order
 */
export function sortMethodWithOrder(order: TableColumnSortDirection): any {
  if (order === undefined || order === 'asc') {
    return sortMethodAsc;
  } else {
    return (a, b) => {
      return -sortMethodAsc(a, b);
    };
  }
}

/**
 * sort data with ordered column
 * @param property property string
 * @param order sort order
 */
export function sortMethodWithOrderByColumn(property: string, order: TableColumnSortDirection): any {
  const sortMethod = sortMethodWithOrder(order);

  return (a, b) => {
    let v1 = getObjectValue(a, property);
    let v2 = getObjectValue(b, property);

    v1 = (v1) || '';
    v2 = (v2) || '';

    if (isFloat(v1) && isFloat(v2)) {
      v1 = parseFloat(v1);
      v2 = parseFloat(v2);
    } else if (isValidDate(v1) && isValidDate(v2)) {
      v1 = new Date(v1).getTime();
      v2 = new Date(v2).getTime();
    }

    return sortMethod(v1, v2);
  };
}

/**
 * sort data with ordered multiple columns
 * @param sortedColumns sorted column list
 */
export function sortMethodWithOrderMultiColumn(sortedColumns: {property: string, order: TableColumnSortDirection}[]): any {
  const sortMethodsForColumn = (sortedColumns || []).map(item => sortMethodWithOrderByColumn(item.property, item.order));

  return (a, b) => {
    let sorted = 0;
    let index = 0;

    while (sorted === 0 && index < sortMethodsForColumn.length) {
      sorted = sortMethodsForColumn[index++](a, b);
    }

    return sorted;
  };
}
