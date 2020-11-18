import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PcUploadErrorModalComponent } from './pc-upload-error-modal.component';
import {ModalModule} from '../modal/modal.module';
import {FlatButtonModule} from '../flat-button/flat-button.module';



@NgModule({
  declarations: [PcUploadErrorModalComponent],
  imports: [
    CommonModule,
    ModalModule,
    FlatButtonModule
  ],
  exports: [
    PcUploadErrorModalComponent,
  ],
  entryComponents: [
    PcUploadErrorModalComponent,
  ],
})
export class PcUploadErrorModalModule { }
