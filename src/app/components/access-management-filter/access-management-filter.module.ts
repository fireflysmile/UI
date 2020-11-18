import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessManagementFilterComponent } from './access-management-filter.component';
import {FormFieldModule} from '../form-field/form-field.module';
import {StrokeButtonModule} from '../stroke-button/stroke-button.module';
import {SelectModule} from '../select/select.module';
import {ReactiveFormsModule} from '@angular/forms';
import {InlineButtonModule} from '../inline-button/inline-button.module';
import {IconsModule} from '../icons/icons.module';
import {ExtendedFormModule} from '../extended-form/extended-form.module';



@NgModule({
  declarations: [AccessManagementFilterComponent],
  exports: [
    AccessManagementFilterComponent
  ],
  imports: [
    CommonModule,
    FormFieldModule,
    StrokeButtonModule,
    SelectModule,
    ReactiveFormsModule,
    InlineButtonModule,
    IconsModule,
    ExtendedFormModule
  ]
})
export class AccessManagementFilterModule { }
