import { Pipe, PipeTransform } from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';

@Pipe({
  name: 'hasError'
})
export class HasErrorPipe implements PipeTransform {
  /**
   * return true when control has error with touched or dirty state
   * @param control form control to check
   * @param error error code
   */
  transform(control: FormControl | AbstractControl | FormGroup, error: string): boolean {
    return (control.dirty || control.invalid) && control.hasError(error);
  }
}
