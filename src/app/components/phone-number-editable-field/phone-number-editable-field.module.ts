import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneNumberEditableFieldComponent } from './phone-number-editable-field.component';
import {EditableFormFieldBaseModule} from '../editable-form-field-base/editable-form-field-base.module';
import {PhoneNumberControlModule} from '../phone-number-control/phone-number-control.module';



@NgModule({
  declarations: [PhoneNumberEditableFieldComponent],
  exports: [
    PhoneNumberEditableFieldComponent
  ],
  imports: [
    CommonModule,
    EditableFormFieldBaseModule,
    PhoneNumberControlModule,
  ],
})
export class PhoneNumberEditableFieldModule { }
