import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserNameEditableFieldComponent } from './user-name-editable-field.component';
import {EditableFormFieldBaseModule} from '../editable-form-field-base/editable-form-field-base.module';
import {FormErrorModule} from '../form-error/form-error.module';



@NgModule({
  declarations: [UserNameEditableFieldComponent],
  exports: [
    UserNameEditableFieldComponent
  ],
  imports: [
    CommonModule,
    EditableFormFieldBaseModule,
    FormErrorModule,
  ]
})
export class UserNameEditableFieldModule { }
