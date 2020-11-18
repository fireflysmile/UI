import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetRulesComponent } from './set-rules.component';
import {RectCardModule} from '../rect-card/rect-card.module';
import {InlineButtonModule} from '../inline-button/inline-button.module';
import {IconsModule} from '../icons/icons.module';
import {FormFieldModule} from '../form-field/form-field.module';
import {SelectModule} from '../select/select.module';
import {FileUploadModalModule} from '../file-upload-modal/file-upload-modal.module';
import {UploadPendingModalModule} from '../upload-pending-modal/upload-pending-modal.module';
import {RuleUploadErrorModalModule} from '../rule-upload-error-modal/rule-upload-error-modal.module';
import {RuleUploadCompleteModalModule} from '../rule-upload-complete-modal/rule-upload-complete-modal.module';



@NgModule({
  declarations: [SetRulesComponent],
  exports: [
    SetRulesComponent
  ],
  imports: [
    CommonModule,
    RectCardModule,
    InlineButtonModule,
    IconsModule,
    FormFieldModule,
    SelectModule,
    FileUploadModalModule,
    UploadPendingModalModule,
    RuleUploadErrorModalModule,
    RuleUploadCompleteModalModule,
  ]
})
export class SetRulesModule { }
