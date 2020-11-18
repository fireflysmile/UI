import {Component, Input, OnInit} from '@angular/core';
import {EditableFormFieldBaseComponent} from '../editable-form-field-base/editable-form-field-base.component';
import {FormControl, FormGroup} from '@angular/forms';
import {EnhancedRequiredValidator} from '../../utils/validation.util';

export interface UserNameData {
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'app-user-name-editable-field',
  templateUrl: './user-name-editable-field.component.html',
  styleUrls: [
    '../editable-form-field-base/editable-form-field-base.component.scss',
    './user-name-editable-field.component.scss',
  ]
})
export class UserNameEditableFieldComponent extends EditableFormFieldBaseComponent<UserNameData> implements OnInit {
  // set first name
  @Input() set firstName(first: string) {
    this._firstName = first;
    this.group.get('firstName').patchValue(first || '');
  }
  // set last name
  @Input() set lastName(last: string) {
    this._lastName = last;
    this.group.get('lastName').patchValue(last || '');
  }
  // form group
  group: FormGroup = new FormGroup({
    firstName: new FormControl('', EnhancedRequiredValidator),
    lastName: new FormControl('', EnhancedRequiredValidator),
  });
  // first name
  private _firstName: string;
  // last name
  private _lastName: string;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
  }

  /**
   * reset group
   */
  reset(): void {
    this.group.patchValue({
      firstName: this._firstName,
      lastName: this._lastName,
    });

    this.group.markAsUntouched();
    this.group.markAsPristine();
  }
}
