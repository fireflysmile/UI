import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignModalComponent } from './assign-modal.component';
import {ModalModule} from '../modal/modal.module';
import {FormFieldModule} from '../form-field/form-field.module';
import {SelectModule} from '../select/select.module';
import {ReactiveFormsModule} from '@angular/forms';
import {ExtendedFormModule} from '../extended-form/extended-form.module';



@NgModule({
  declarations: [AssignModalComponent],
  imports: [
    CommonModule,
    ModalModule,
    FormFieldModule,
    SelectModule,
    ReactiveFormsModule,
    ExtendedFormModule
  ],
  exports: [
    AssignModalComponent,
  ],
})
export class AssignModalModule { }
