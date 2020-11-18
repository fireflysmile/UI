import {OnDestroy, Pipe, PipeTransform} from '@angular/core';
import {DATE_MILLS, HOUR_MILLS, MINUTE_MILLS, SECOND_MILLS, YEAR_MILLS, MONTH_MILLS} from '../../utils/date.util';
import {BehaviorSubject, Observable} from 'rxjs';

export type DateDisplayUnit = 'minify' | 'ellipsis' | 'full';
export type DateDisplayLevel = 'current' | 'next' | 'full';

/**
 * get second string
 * @param diff time diff
 * @param type type
 * @param level level
 */
function getSec(diff: number, type: DateDisplayUnit, level: DateDisplayLevel): string {
  const sec = Math.floor(diff / SECOND_MILLS);

  switch (type) {
    case 'full': {
      return `${sec} ${sec > 1 ? 'Seconds' : 'second'}`;
    }

    case 'ellipsis': {
      return `${sec}${sec > 1 ? 'secs' : 'sec'}`;
    }

    default: {
      return sec ? `${sec}s` : '';
    }
  }
}


/**
 * get minute string
 * @param diff time diff
 * @param type type
 * @param level level
 */
function getMin(diff: number, type: DateDisplayUnit, level: DateDisplayLevel): string {
  const min = Math.floor(diff / MINUTE_MILLS);
  let suffix: string;
  let prefix: string;

  // get suffix
  switch (level) {
    case 'full': {
      suffix = getSec(diff % MINUTE_MILLS, type, 'full');
      break;
    }

    case 'next': {
      suffix = getSec(diff % MINUTE_MILLS, type, 'current');
      break;
    }
  }

  // get prefix
  switch (type) {
    case 'full': {
      prefix = `${min} ${min > 1 ? 'Minutes' : 'Minute'}`;
      break;
    }

    case 'ellipsis': {
      prefix = `${min}${min > 1 ? 'mins' : 'min'}`;
      break;
    }

    default: {
      prefix = `${min}m`;
      break;
    }
  }

  return min ? (suffix ? `${prefix} ${suffix}` : prefix) : `${suffix}`;
}


/**
 * get hour string
 * @param diff time diff
 * @param type type
 * @param level level
 */
function getHour(diff: number, type: DateDisplayUnit, level: DateDisplayLevel): string {
  const hour = Math.floor(diff / HOUR_MILLS);
  let suffix = '';
  let prefix = '';

  // get suffix
  switch (level) {
    case 'full': {
      suffix = getMin(diff % HOUR_MILLS, type, 'full');
      break;
    }

    case 'next': {
      suffix = getMin(diff % HOUR_MILLS, type, 'current');
      break;
    }
  }

  // get prefix
  switch (type) {
    case 'full': {
      prefix = `${hour} ${hour > 1 ? 'Hours' : 'Hour'}`;
      break;
    }

    case 'ellipsis': {
      prefix = `${hour}${hour > 1 ? 'hrs' : 'hr'}`;
      break;
    }

    default: {
      prefix = `${hour}h`;
      break;
    }
  }

  return hour ? (suffix ? `${prefix} ${suffix}` : prefix) : `${suffix}`;
}


/**
 * get date string
 * @param diff time diff
 * @param type type
 * @param level level
 */
function getDate(diff: number, type: DateDisplayUnit, level: DateDisplayLevel): string {
  const dates = Math.floor(diff / DATE_MILLS);
  let suffix = '';
  let prefix = '';

  // get suffix
  switch (level) {
    case 'full': {
      suffix = getHour(diff % DATE_MILLS, type, 'full');
      break;
    }

    case 'next': {
      suffix = getHour(diff % DATE_MILLS, type, 'current');
      break;
    }
  }

  // get prefix
  switch (type) {
    case 'full': {
      prefix = `${dates} ${dates > 1 ? 'Days' : 'Day'}`;
      break;
    }

    case 'ellipsis': {
      prefix = `${dates}${dates > 1 ? 'days' : 'day'}`;
      break;
    }

    default: {
      prefix = `${dates}d`;
      break;
    }
  }

  return suffix ? `${prefix} ${suffix}` : prefix;
}

/**
 * get month string
 * @param diff time diff
 * @param type type
 * @param level level
 */
function getMonth(diff: number, type: DateDisplayUnit, level: DateDisplayLevel): string {
  const months = Math.floor(diff / MONTH_MILLS) % 12;
  const suffix = '';
  let prefix = '';

  // get prefix
  switch (type) {
    case 'full': {
      prefix = `${months} ${months > 1 ? 'Months' : 'Month'}`;
      break;
    }

    case 'ellipsis': {
      prefix = `${months}${months > 1 ? 'mths' : 'mth'}`;
      break;
    }

    default: {
      prefix = `${months}m`;
      break;
    }
  }

  return months ? (suffix ? `${prefix} ${suffix}` : prefix) : `${suffix}`;
}

/**
 * get year string
 * @param diff time diff
 * @param type type
 * @param level level
 */
function getYear(diff: number, type: DateDisplayUnit, level: DateDisplayLevel): string {
  const years = Math.floor(diff / YEAR_MILLS);
  let suffix = '';
  let prefix = '';

  // get suffix
  switch (level) {
    case 'full': {
      suffix = getMonth(diff % YEAR_MILLS, type, 'full');
      break;
    }

    case 'next': {
      suffix = getMonth(diff % YEAR_MILLS, type, 'current');
      break;
    }
  }

  // get prefix
  switch (type) {
    case 'full': {
      prefix = `${years} ${years > 1 ? 'Years' : 'Year'}`;
      break;
    }

    case 'ellipsis': {
      prefix = `${years}${years > 1 ? 'yrs' : 'yr'}`;
      break;
    }

    default: {
      prefix = `${years}y`;
      break;
    }
  }

  return suffix ? `${prefix} ${suffix}` : prefix;
}

/**
 * parse date to time passed string
 * @param start start date
 * @param end end date
 * @param unit display unit
 * @param level display level
 */
function getParsedPassedString(
  start: string | Date = new Date(),
  end: string | Date,
  unit: DateDisplayUnit,
  level: DateDisplayLevel,
): string {
  const from = new Date(start);
  const to = new Date(end);
  const diff = end ? to.valueOf() - from.valueOf() : from.valueOf();

  if (diff >= YEAR_MILLS) {
    return getYear(diff, unit, level);
  } else if (diff >= MONTH_MILLS) {
    return getMonth(diff, unit, level);
  } else if (diff >= DATE_MILLS) {
    return getDate(diff, unit, level);
  } else if (diff >= HOUR_MILLS) {
    return getHour(diff, unit, level);
  } else if (diff >= MINUTE_MILLS) {
    return getMin(diff, unit, level);
  } else if (diff >= SECOND_MILLS) {
    return getSec(diff, unit, level);
  }
}

@Pipe({
  name: 'timePassed'
})
export class TimePassedPipe implements PipeTransform, OnDestroy {
  // passed
  private passed: BehaviorSubject<string>;
  // timer
  private timer;

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  /**
   * transform to passed time
   * @param start date or date like string value of start date
   * @param end date of date like string value of end date
   * @param unit display unit
   * @param level display level
   * @param sync sync passed time
   */
  transform(
    start?: string | Date,
    end?: string | Date,
    unit: DateDisplayUnit = 'full',
    level: DateDisplayLevel = 'next',
    sync?: boolean,
  ): string | Observable<string> {
    if (sync) {
      this.passed = new BehaviorSubject<string>(getParsedPassedString(start, end, unit, level));

      this.timer = setInterval(() => {
        this.passed.next(getParsedPassedString(start, end, unit, level));
      }, 1000);

      return this.passed.asObservable();
    } else {
      return getParsedPassedString(start, end, unit, level);
    }
  }
}
