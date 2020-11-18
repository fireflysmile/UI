/**
 * date object base to render UI
 */
export class TsDateBase {
  // date value
  value: Date;
  // date number of month
  date: number;
  // out dated
  outDated: boolean;
  // disabled
  disabled: boolean;

  constructor(
    value: Date,
    displayDate: Date,
    minDate?: Date,
    maxDate?: Date,
  ) {
    this.value = value;
    this.date = value.getDate();
    this.outDated = value.getFullYear() !== displayDate.getFullYear() || value.getMonth() !== displayDate.getMonth();

    if (minDate) {
      this.disabled = value.valueOf() < minDate.valueOf();
    }

    if (!this.disabled && maxDate) {
      this.disabled = value.valueOf() > maxDate.valueOf();
    }
  }
}
