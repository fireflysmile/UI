import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadPendingModalComponent } from './upload-pending-modal.component';
import {ModalModule} from '../modal/modal.module';
import {FlatButtonModule} from '../flat-button/flat-button.module';



@NgModule({
  declarations: [UploadPendingModalComponent],
  imports: [
    CommonModule,
    ModalModule,
    FlatButtonModule
  ],
  entryComponents: [
    UploadPendingModalComponent,
  ],
  exports: [
    UploadPendingModalComponent,
  ]
})
export class UploadPendingModalModule { }
