import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PcModificationConfirmModalComponent } from './pc-modification-confirm-modal.component';
import {ModalModule} from '../modal/modal.module';
import {FlatButtonModule} from '../flat-button/flat-button.module';



@NgModule({
  declarations: [PcModificationConfirmModalComponent],
  imports: [
    CommonModule,
    ModalModule,
    FlatButtonModule
  ],
  exports: [
    PcModificationConfirmModalComponent,
  ],
  entryComponents: [
    PcModificationConfirmModalComponent,
  ]
})
export class PcModificationConfirmModalModule { }
