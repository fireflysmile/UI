import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PcDownloadErrorModalComponent } from './pc-download-error-modal.component';
import {ModalModule} from '../modal/modal.module';
import {FlatButtonModule} from '../flat-button/flat-button.module';



@NgModule({
  declarations: [PcDownloadErrorModalComponent],
  imports: [
    CommonModule,
    ModalModule,
    FlatButtonModule
  ],
  exports: [
    PcDownloadErrorModalComponent,
  ],
  entryComponents: [
    PcDownloadErrorModalComponent,
  ],
})
export class PcDownloadErrorModalModule { }
