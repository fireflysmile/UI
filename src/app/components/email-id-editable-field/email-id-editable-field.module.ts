import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailIdEditableFieldComponent } from './email-id-editable-field.component';
import {EditableFormFieldBaseModule} from '../editable-form-field-base/editable-form-field-base.module';
import {FormErrorModule} from '../form-error/form-error.module';



@NgModule({
  declarations: [EmailIdEditableFieldComponent],
  exports: [
    EmailIdEditableFieldComponent
  ],
  imports: [
    CommonModule,
    EditableFormFieldBaseModule,
    FormErrorModule,
  ]
})
export class EmailIdEditableFieldModule { }
