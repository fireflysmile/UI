import {Component, Input, OnInit} from '@angular/core';
import {EditableFormFieldBaseComponent} from '../editable-form-field-base/editable-form-field-base.component';
import {FormControl, FormGroup} from '@angular/forms';
import {EqualReferenceListener, EqualValidators} from '../../utils/validation.util';
import {PhoneNumberValue} from '../phone-number-control/phone-number-control.component';
import {SubscriptionService} from '../../services/subscription/subscription.service';

export interface UserPhoneNumberData {
  phoneNumber: {
    code: string;
    number: string;
  };
}

@Component({
  selector: 'app-phone-number-editable-field',
  templateUrl: './phone-number-editable-field.component.html',
  styleUrls: [
    '../editable-form-field-base/editable-form-field-base.component.scss',
    './phone-number-editable-field.component.scss',
  ]
})
export class PhoneNumberEditableFieldComponent extends EditableFormFieldBaseComponent<UserPhoneNumberData> implements OnInit {
  // phone value
  @Input() set phone(phone: PhoneNumberValue) {
    this._phone = phone;
    this.group.get('phoneNumber').patchValue(phone || {
      code: '+91',
      number: '',
    });
  }
  // form group
  group: FormGroup = new FormGroup({
    phoneNumber: new FormControl({
      code: '+91',
      number: '',
    }, control => {
      if (!control.value || !(control.value.number || '').trim()) {
        return {
          required: {
            value: control.value,
          },
        };
      }
    }),
  });
  // phone value
  private _phone: PhoneNumberValue;

  constructor(
    private subscriptionService: SubscriptionService,
  ) {
    super();

    this.group.addControl('confirmPhoneNumber', new FormControl({
      code: '+91',
      number: '',
    }, EqualValidators(this.group.get('phoneNumber'))));
  }

  ngOnInit(): void {
    this._subscribePhoneNumberChanges();
  }

  get phone(): PhoneNumberValue {
    return this._phone;
  }

  /**
   * subscribe phone number changes
   */
  private _subscribePhoneNumberChanges(): void {
    const sub = EqualReferenceListener(this.group.get('phoneNumber'), this.group.get('confirmPhoneNumber'));

    this.subscriptionService.store('_subscribePhoneNumberChanges', sub);
  }

  /**
   * reset
   */
  reset(): void {
    this.group.patchValue({
      phoneNumber: this._phone,
      confirmPhoneNumber: {
        code: '+91',
        number: '',
      },
    });

    this.group.markAsUntouched();
    this.group.markAsPristine();
  }
}
