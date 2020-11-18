import {truncateDate} from '../../../utils/date.util';
import {TsDateBase} from '../../calendar/models/ts-date-base';

export class TsRangeDate extends TsDateBase {
  // is start date
  isStart: boolean;
  // is end date
  isEnd: boolean;
  // flag for checking whether date is in or out of range
  isRanged: boolean;
  // is before
  isBefore: boolean;

  constructor(
    value: Date,
    displayDate: Date,
    startDate?: Date,
    endDate?: Date,
    minDate?: Date,
    maxDate?: Date,
  ) {
    super(
      value,
      displayDate,
      minDate,
      maxDate,
    );

    if (startDate) {
      this.isStart = truncateDate(value, 'date').valueOf() === truncateDate(startDate, 'date').valueOf();
    }

    if (endDate) {
      this.isEnd = truncateDate(value, 'date').valueOf() === truncateDate(endDate, 'date').valueOf();
    }

    if (!endDate) {
      this.isBefore = truncateDate(value, 'date').valueOf() < truncateDate(startDate, 'date').valueOf();
    }

    if (startDate && endDate) {
      this.isRanged = truncateDate(startDate, 'date').valueOf() <= truncateDate(value, 'date').valueOf()
        && truncateDate(endDate, 'date').valueOf() >= truncateDate(value, 'date').valueOf();
    }
  }
}
