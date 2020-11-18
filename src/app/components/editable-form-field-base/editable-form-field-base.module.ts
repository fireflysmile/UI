import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditableFormFieldBaseComponent } from './editable-form-field-base.component';
import {SubscriptionService} from '../../services/subscription/subscription.service';
import {FormFieldModule} from '../form-field/form-field.module';
import {ReactiveFormsModule} from '@angular/forms';
import {IconsModule} from '../icons/icons.module';
import {StrokeButtonModule} from '../stroke-button/stroke-button.module';
import {ExtendedFormModule} from '../extended-form/extended-form.module';



@NgModule({
  declarations: [EditableFormFieldBaseComponent],
  imports: [
    CommonModule,
    FormFieldModule,
    ReactiveFormsModule,
    IconsModule,
    StrokeButtonModule,
    ExtendedFormModule,
  ],
  providers: [
    SubscriptionService,
  ],
  exports: [
    EditableFormFieldBaseComponent,
    FormFieldModule,
    ReactiveFormsModule,
    IconsModule,
    StrokeButtonModule,
    ExtendedFormModule,
  ],
})
export class EditableFormFieldBaseModule { }
