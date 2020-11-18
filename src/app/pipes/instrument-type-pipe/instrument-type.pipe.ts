import { Pipe, PipeTransform } from '@angular/core';
import {environment} from '../../../environments/environment';

const {
  instrumentTypeConfig,
} = environment;

@Pipe({
  name: 'instrumentType'
})
export class InstrumentTypePipe implements PipeTransform {

  /**
   * transform instrument type value to label
   * @param value value to transform
   */
  transform(value: string): string {
    const key = Object.keys(instrumentTypeConfig).find(item => instrumentTypeConfig[item].value === value);

    return key ? instrumentTypeConfig[key].label : value;
  }

}
