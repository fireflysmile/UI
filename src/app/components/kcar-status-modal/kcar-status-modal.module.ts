import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KcarStatusModalComponent } from './kcar-status-modal.component';
import {ModalModule} from '../modal/modal.module';
import {IconsModule} from '../icons/icons.module';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {SelectModule} from '../select/select.module';
import {FormFieldModule} from '../form-field/form-field.module';

@NgModule({
  declarations: [KcarStatusModalComponent],
  imports: [
    CommonModule,
    ModalModule,
    IconsModule,
    FormsModule,
    ReactiveFormsModule,
    SelectModule,
    FormFieldModule
  ],
  exports: [
    KcarStatusModalComponent,
  ],
})
export class KcarStatusModalModule { }
