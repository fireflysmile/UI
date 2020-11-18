import {truncateDate} from '../../../utils/date.util';
import {TsDateBase} from './ts-date-base';

/**
 * date object to render UI
 */
export class TsDate extends TsDateBase {
  // selected
  selected: boolean;

  constructor(
    value: Date,
    displayDate: Date,
    selectedDate?: Date,
    minDate?: Date,
    maxDate?: Date,
  ) {
    super(
      value,
      displayDate,
      minDate,
      maxDate,
    );

    if (selectedDate) {
      this.selected = truncateDate(value, 'date').valueOf() === truncateDate(selectedDate, 'date').valueOf();
    }
  }
}
