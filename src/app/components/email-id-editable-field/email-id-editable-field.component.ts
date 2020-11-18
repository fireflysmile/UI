import {Component, Input, OnInit} from '@angular/core';
import {EditableFormFieldBaseComponent} from '../editable-form-field-base/editable-form-field-base.component';
import {SubscriptionService} from '../../services/subscription/subscription.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EnhancedRequiredValidator, EqualReferenceListener, EqualValidators} from '../../utils/validation.util';

export interface UserEmailIdData {
  emailId: string;
}

@Component({
  selector: 'app-email-id-editable-field',
  templateUrl: './email-id-editable-field.component.html',
  styleUrls: [
    '../editable-form-field-base/editable-form-field-base.component.scss',
    './email-id-editable-field.component.scss',
  ]
})
export class EmailIdEditableFieldComponent extends EditableFormFieldBaseComponent<UserEmailIdData> implements OnInit {
  // set email
  @Input() set emailId(email: string) {
    this._emailId = email;
    this.group.get('emailId').patchValue(email || '');
  }
  // form group
  group: FormGroup = new FormGroup({
    emailId: new FormControl('', [
      EnhancedRequiredValidator,
      Validators.email,
    ]),
  });
  // email
  private _emailId: string;

  constructor(
    private subscriptionService: SubscriptionService,
  ) {
    super();

    // add confirm email id control
    this.group.addControl('confirmEmailId', new FormControl('', [
      EnhancedRequiredValidator,
      EqualValidators(this.group.get('emailId')),
    ]));
  }

  ngOnInit(): void {
    this._subscribeEmailIdChanges();
  }

  get emailId(): string {
    return this._emailId;
  }

  /**
   * subscribe email id changes
   */
  private _subscribeEmailIdChanges(): void {
    const sub = EqualReferenceListener(this.group.get('emailId'), this.group.get('confirmEmailId'));

    this.subscriptionService.store('_subscribeEmailIdChanges', sub);
  }

  /**
   * reset group
   */
  reset(): void {
    this.group.patchValue({
      emailId: this._emailId,
      confirmEmailId: '',
    });

    this.group.markAsUntouched();
    this.group.markAsPristine();
  }
}
