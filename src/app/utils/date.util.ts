import { DatePipe } from '@angular/common';

export type TsDateTruncationType =
  | 'second'
  | 'minute'
  | 'hour'
  | 'date'
  | 'month'
  | 'year';
export type TsDatePeriodUnit =
  | 'second'
  | 'seconds'
  | 'sec'
  | 's'
  | 'minute'
  | 'minutes'
  | 'min'
  | 'm'
  | 'hour'
  | 'hours'
  | 'h'
  | 'date'
  | 'dates'
  | 'day'
  | 'days'
  | 'd'
  | 'week'
  | 'weeks'
  | 'w'
  | 'month'
  | 'months'
  | 'M'
  | 'year'
  | 'years'
  | 'y';

export const SECOND_MILLS = 1000;
export const MINUTE_MILLS = SECOND_MILLS * 60;
export const HOUR_MILLS = MINUTE_MILLS * 60;
export const DATE_MILLS = HOUR_MILLS * 24;
export const WEEK_MILLS = DATE_MILLS * 7;
export const MONTH_MILLS = DATE_MILLS * 30;
export const YEAR_MILLS = DATE_MILLS * 365;

/**
 * get milliseconds by period string
 * @param period period string
 */
export function getMillsByPeriodString(period: TsDatePeriodUnit): number {
  const millDefinitions: {
    periods: TsDatePeriodUnit[];
    mills: number;
  }[] = [
    {
      periods: ['second', 'seconds', 'sec', 's'],
      mills: SECOND_MILLS,
    },
    {
      periods: ['minute', 'minutes', 'min', 'm'],
      mills: MINUTE_MILLS,
    },
    {
      periods: ['hour', 'hours', 'h'],
      mills: HOUR_MILLS,
    },
    {
      periods: ['date', 'dates', 'd', 'day', 'days'],
      mills: DATE_MILLS,
    },
    {
      periods: ['week', 'weeks', 'w'],
      mills: WEEK_MILLS,
    },
    {
      periods: ['month', 'months', 'M'],
      mills: MONTH_MILLS,
    },
    {
      periods: ['year', 'years', 'y'],
      mills: YEAR_MILLS,
    },
  ];

  const find = millDefinitions.find((def) => {
    return def.periods.some((item) => item === period);
  });

  return find.mills;
}

/**
 * truncate date by truncation type
 * @param date date to truncate
 * @param type truncation type
 * @example
 * truncateDate(new Date(2020, 0, 1, 9, 0, 5, 500), 'second'); // Date(2020, 0, 1, 9, 0, 5)
 */
export function truncateDate(date: Date, type: TsDateTruncationType): Date {
  date = new Date(date);

  switch (type) {
    case 'second': {
      date.setMilliseconds(0);
      break;
    }

    case 'minute': {
      date.setSeconds(0, 0);
      break;
    }

    case 'hour': {
      date.setMinutes(0, 0, 0);
      break;
    }

    case 'date': {
      date.setHours(0, 0, 0, 0);
      break;
    }

    case 'month': {
      date.setDate(1);
      date.setHours(0, 0, 0, 0);
      break;
    }

    case 'year': {
      date.setMonth(0, 1);
      date.setHours(0, 0, 0, 0);
      break;
    }
  }

  return date;
}

/**
 * get periodical date according to period and base date
 * @param base base date
 * @param period
 * period value
 * must be an integer
 * @param unit period unit
 * @param sub
 * subtract period from base date
 * default is `false`
 */
export function getPeriodicalDate(
  base: Date,
  period: number,
  unit: TsDatePeriodUnit,
  sub = false
): { start: Date; end: Date } {
  // to integer
  period = sub ? -Math.floor(period) : Math.floor(period);

  const mills = getMillsByPeriodString(unit);
  let periodical: Date;

  if (mills === MONTH_MILLS) {
    periodical = new Date(
      base.getFullYear(),
      base.getMonth() + period,
      base.getDate()
    );
  } else {
    periodical = new Date(base.valueOf() + period * mills);
  }

  return {
    start: sub ? periodical : base,
    end: sub ? base : periodical,
  };
}

/**
 * get timestamp
 * @param date date
 */
export function getTimestamp(date = new Date()): string {
  const datePipe = new DatePipe('en-US');

  return datePipe.transform(date, 'yyyyMMddhhmmss');
}

/**
 * get start of date
 * @param date date
 */
export function getStartOfDate(date: Date): Date {
  if (!date) {
    return null;
  }
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const start = new Date(year, month, day);
  start.setHours(0, 0, 0, 0);

  return start;
}

/**
 * get end of date
 * @param date date
 */
export function getEndOfDate(date: Date): Date {
  if (!date) {
    return null;
  }
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const end = new Date(year, month, day);
  end.setHours(23, 59, 59, 999);

  return end;
}

/**
 * Add year to date
 * @param date date
 * @param year year
 */
export function addYearToDate(date: Date, year: number): Date {
  if (!date) {
    return null;
  }
  const dateYear = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const end = new Date(dateYear + year, month, day);

  return end;
}

/**
 * Set date to the zero point of that day.
 */
export function dateSetZero(d: Date) {
  d.setHours(0);
  d.setMinutes(0);
  d.setSeconds(0);
  d.setMilliseconds(0);
}
