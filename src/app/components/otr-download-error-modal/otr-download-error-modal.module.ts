import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtrDownloadErrorModalComponent } from './otr-download-error-modal.component';
import {ModalModule} from '../modal/modal.module';
import {FlatButtonModule} from '../flat-button/flat-button.module';



@NgModule({
  declarations: [OtrDownloadErrorModalComponent],
  imports: [
    CommonModule,
    ModalModule,
    FlatButtonModule
  ],
  entryComponents: [
    OtrDownloadErrorModalComponent,
  ],
  exports: [
    OtrDownloadErrorModalComponent,
  ],
})
export class OtrDownloadErrorModalModule { }
