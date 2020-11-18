import {ChangeDetectorRef, Component, OnInit, Optional, Self} from '@angular/core';
import {COUNTRY_CODES} from '../../utils/phone-number.utils';
import {FormControlBaseDirective} from '../form-control-base/form-control-base.directive';
import {NgControl} from '@angular/forms';

export interface PhoneNumberValue {
  code: string;
  number: string;
}

@Component({
  selector: 'app-phone-number-control',
  templateUrl: './phone-number-control.component.html',
  styleUrls: ['./phone-number-control.component.scss']
})
export class PhoneNumberControlComponent extends FormControlBaseDirective<PhoneNumberValue> implements OnInit {
  // country codes
  codes: string[] = COUNTRY_CODES;
  // code
  code = '+91';
  // phone number
  number = '';

  constructor(
    @Self() @Optional() public ngControl: NgControl,
    protected changeDetectorRef: ChangeDetectorRef,
  ) {
    super(ngControl, changeDetectorRef);

    this._defaultValue = {
      code: '+91',
      number: '',
    };
  }

  ngOnInit() {
  }

  /**
   * write value to component
   * @param value value
   */
  writeValue(value: PhoneNumberValue): void {
    this.code = value ? value.code || '+91' : '+91';
    this.number = value ? value.number || '' : '';
  }

  /**
   * set phone value
   */
  setPhoneValue(): void {
    this.markAsDirty();
    this.setValue({
      code: this.code,
      number: this.number,
    });
  }
}
