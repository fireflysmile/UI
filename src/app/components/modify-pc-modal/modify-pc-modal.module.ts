import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModifyPcModalComponent } from './modify-pc-modal.component';
import {ModalModule} from '../modal/modal.module';
import {FlatButtonModule} from '../flat-button/flat-button.module';
import {FormFieldModule} from '../form-field/form-field.module';
import {SelectModule} from '../select/select.module';
import {FormsModule} from '@angular/forms';
import {PcModificationConfirmModalModule} from '../pc-modification-confirm-modal/pc-modification-confirm-modal.module';



@NgModule({
  declarations: [ModifyPcModalComponent],
  imports: [
    CommonModule,
    ModalModule,
    FlatButtonModule,
    FormFieldModule,
    SelectModule,
    FormsModule,
    PcModificationConfirmModalModule,
  ],
  exports: [
    ModifyPcModalComponent,
  ],
  entryComponents: [
    ModifyPcModalComponent,
  ],
})
export class ModifyPcModalModule { }
