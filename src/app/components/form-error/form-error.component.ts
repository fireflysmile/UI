import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss']
})
export class FormErrorComponent implements OnInit {
  // form control to check error
  @Input() control: FormControl | AbstractControl | FormGroup;
  // error code
  @Input() errorCode: string;
  // set static true to show error always
  @Input() static = false;
  // error will be suppressed when control has this error code
  @Input() suppressOn: string;
  // set display style with error state
  @HostBinding('style.display') get display(): string {
    if (this.hasError || this.static) {
      return 'block';
    } else {
      return 'none';
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * return error state of form control
   */
  get hasError(): boolean {
    if (this.control && this.errorCode) {
      if (this.suppressOn) {
        return !this.control.hasError(this.suppressOn)
          && this.control.hasError(this.errorCode)
          && (this.control.touched || this.control.dirty);
      } else {
        return this.control.hasError(this.errorCode) && (this.control.touched || this.control.dirty);
      }
    }
  }
}
