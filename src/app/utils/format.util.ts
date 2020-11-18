/**
 * value to integer number
 * @param value value to format
 */
import {TableColumn} from '../models/table-column';

export function toInteger(value: string | number): number {
  return typeof value === 'string' ? parseInt(value, null) : Math.floor(value);
}

/**
 * value to floating point number
 * @param value value to format
 */
export function toFloat(value: string | number): number {
  return typeof value === 'string' ? parseFloat(value) : value;
}

/**
 * add prefixed zero to number
 * @param value value to format
 * @param base base number
 */
export function addZero(value: string | number, base = 10): string {
  value = toInteger(value);

  if (value < base) {
    const zeros = base
      .toString()
      .split('')
      .map(() => '0');

    return `${zeros.splice(0, zeros.length - value.toString().length).join('')}${value}`;
  } else {
    return `${value}`;
  }
}

/**
 * get initial from the string value
 * @param value value to get initial
 * @param length
 * length of initial
 * default is 1
 */
export function getInitial(value: string, length = 1): string {
  const split = (value || '').split(' ');
  let initial = '';

  for (let i = 0; i < length; i++) {
    initial += (split[i] && split[i][0]) ? split[i][0].toUpperCase() : '';
  }

  return initial;
}

/**
 * transform to ordinal number
 * @param value value to transform
 */
export function toOrdinal(value: number | string): string {
  value = value + '';

  switch (value) {
    case '1': {
      return value + 'st';
    }

    case '2': {
      return value + 'nd';
    }

    case '3': {
      return value + 'rd';
    }

    default: {
      return value + 'th';
    }
  }
}

/**
 * check whether date string is valid or not
 * @param value value to check
 * @param separator date separator
 */
export function dateStringToDate(value: string, separator = '/'): Date {
  const split = value.split(separator);

  if (split.length === 3) {
    const [date, month, year] = split;

    if (date && month && year && year.length === 4) {
      return new Date(toInteger(year), toInteger(month) - 1, toInteger(date));
    }
  }
}

/**
 * string to hour/minute split time
 * @param time times
 */
export function toSplitTime(time: string): number[] {
  const split = (time || '').split(':');

  if (split.length === 2) {
    const [hour, minute] = split;

    return [
      toInteger(hour),
      toInteger(minute),
    ];
  } else {
    return [];
  }
}

/**
 * create csv string
 * @param columns column labels
 * @param data data
 */
export function createCSVString<T>(columns: TableColumn<T>[], data: T[]): string {
  let csv = '';
  const header = columns.map(column => `"${column.label.replace(/"/g, '""')}"`);

  csv += header.join(',') + '\r\n';

  data.forEach(item => {
    const row = columns.map(column => {
      let value: any = item[column.property as any];

      value = value === null || value === undefined ? '' : value;

      return `"${`${value}`.replace(/"/g, '""')}"`;
    });

    csv += row.join(',') + '\r\n';
  });

  return csv;
}
