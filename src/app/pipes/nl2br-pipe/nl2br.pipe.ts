import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nl2br'
})
export class Nl2brPipe implements PipeTransform {

  /**
   * transform nl2br
   * @param value value to transform
   */
  transform(value: string): string {
    return (value || '').replace(/[\r\n]/gmi, '<br/>');
  }

}
