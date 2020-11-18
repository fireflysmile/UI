import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllocationConfirmModalComponent } from './allocation-confirm-modal.component';
import {ModalModule} from '../modal/modal.module';
import {FlatButtonModule} from '../flat-button/flat-button.module';



@NgModule({
  declarations: [AllocationConfirmModalComponent],
  imports: [
    CommonModule,
    ModalModule,
    FlatButtonModule
  ],
  entryComponents: [
    AllocationConfirmModalComponent,
  ],
  exports: [
    AllocationConfirmModalComponent,
  ],
})
export class AllocationConfirmModalModule { }
