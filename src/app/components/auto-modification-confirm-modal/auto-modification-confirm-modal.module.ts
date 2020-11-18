import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoModificationConfirmModalComponent } from './auto-modification-confirm-modal.component';
import {ModalModule} from '../modal/modal.module';
import {FlatButtonModule} from '../flat-button/flat-button.module';



@NgModule({
  declarations: [AutoModificationConfirmModalComponent],
  imports: [
    CommonModule,
    ModalModule,
    FlatButtonModule
  ],
  exports: [
    AutoModificationConfirmModalComponent,
  ],
  entryComponents: [
    AutoModificationConfirmModalComponent,
  ],
})
export class AutoModificationConfirmModalModule { }
