import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RuleUploadCompleteModalComponent } from './rule-upload-complete-modal.component';
import {FlatButtonModule} from '../flat-button/flat-button.module';
import {ModalModule} from '../modal/modal.module';



@NgModule({
  declarations: [RuleUploadCompleteModalComponent],
  imports: [
    CommonModule,
    FlatButtonModule,
    ModalModule
  ],
  exports: [
    RuleUploadCompleteModalComponent,
  ],
  entryComponents: [
    RuleUploadCompleteModalComponent,
  ]
})
export class RuleUploadCompleteModalModule { }
