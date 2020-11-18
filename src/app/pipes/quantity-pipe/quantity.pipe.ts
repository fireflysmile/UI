import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'quantity'
})
export class QuantityPipe implements PipeTransform {
  // value
  private _value: string;

  /**
   * return true when value is negative
   */
  private get _isNegative(): boolean {
    return this._value.indexOf('-') !== -1;
  }

  /**
   * return floating numbers
   */
  private get _floatingNumbers(): string {
    const floatSplit = this._value.split('.');

    if (floatSplit.length > 1) {
      return `.${floatSplit.pop()}`;
    } else {
      return '';
    }
  }

  /**
   * return split pure numbers
   */
  private get _pureNumberSplit(): string[] {
    return this._value.replace(/[,-]/g, '').split('.')[0].split('');
  }

  /**
   * return grouped number array
   */
  private get _groupedNumbers(): string[] {
    const split = this._pureNumberSplit;
    const groups = [];
    let pointer = split.length;
    let first = true;

    do {
      const startPointer = Math.max(first ? pointer - 3 : pointer - 2, 0);

      groups.push(split.splice(startPointer).join(''));
      pointer = startPointer;
      first = false;
    } while (split.length > 0);

    return groups;
  }

  /**
   * return the joined number of groups with comma
   */
  private get _joinedNumber(): string {
    return this._groupedNumbers.reverse().filter(item => item).join(',');
  }

  /**
   * return result
   */
  private get _returnValue(): string {
    const negative = this._isNegative ? '-' : '';

    return `${negative}${this._joinedNumber}${this._floatingNumbers}`;
  }

  /**
   * transform numeric value to quantity string
   * @param value value to transform
   * @param fixed fixed floating point numbers
   */
  transform(value: string | number, fixed = 0): string {
    this._value = typeof value === 'string' ? parseFloat(value).toFixed(fixed) : value.toFixed(fixed);

    return this._returnValue;
  }
}
