import { Pipe, PipeTransform } from '@angular/core';
import {toFloat} from '../../utils/format.util';

@Pipe({
  name: 'shorthandedNumber'
})
export class ShorthandedNumberPipe implements PipeTransform {
  /**
   * transform number to shorthanded number
   * @param value value
   * @param fixed set fixed position
   */
  transform(value: number | string, fixed = 0): string {
    value = toFloat(value);

    if (isNaN(value)) {
      return null;
    }

    if (value < 1000) {
      return value.toString();
    } else if (value < 100000) {
      return (value / 1000).toFixed(fixed) + 'K';
    } else if (value < 10000000) {
      return (value / 100000).toFixed(fixed) + 'L';
    } else {
      return (value / 10000000).toFixed(fixed) + 'CR';
    }

  }
}
