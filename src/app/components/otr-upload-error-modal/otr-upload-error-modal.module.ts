import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtrUploadErrorModalComponent } from './otr-upload-error-modal.component';
import {ModalModule} from '../modal/modal.module';
import {FlatButtonModule} from '../flat-button/flat-button.module';



@NgModule({
  declarations: [OtrUploadErrorModalComponent],
  imports: [
    CommonModule,
    ModalModule,
    FlatButtonModule
  ],
  exports: [
    OtrUploadErrorModalComponent,
  ],
  entryComponents: [
    OtrUploadErrorModalComponent,
  ],
})
export class OtrUploadErrorModalModule { }
