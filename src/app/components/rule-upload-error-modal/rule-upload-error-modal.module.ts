import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RuleUploadErrorModalComponent } from './rule-upload-error-modal.component';
import {ModalModule} from '../modal/modal.module';
import {FlatButtonModule} from '../flat-button/flat-button.module';



@NgModule({
  declarations: [RuleUploadErrorModalComponent],
  imports: [
    CommonModule,
    ModalModule,
    FlatButtonModule
  ],
  entryComponents: [
    RuleUploadErrorModalComponent,
  ],
  exports: [
    RuleUploadErrorModalComponent,
  ],
})
export class RuleUploadErrorModalModule { }
