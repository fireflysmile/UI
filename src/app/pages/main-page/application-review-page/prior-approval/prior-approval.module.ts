import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ApplicationReviewSectionBaseModule } from '../application-review-section-base/application-review-section-base.module';
import { IconsModule } from 'src/app/components/icons/icons.module';
import { ModalModule } from 'src/app/components/modal/modal.module';
import { PreviewPdfModule } from 'src/app/components/preview-pdf/preview-pdf.module';

import { PriorApprovalRoutingModule } from './prior-approval-routing.module';
import { PriorApprovalComponent } from './prior-approval.component';

import { SelectModule } from 'src/app/components/select/select.module';
import { WarningNoteModule } from 'src/app/components/warning-note/warning-note.module';
import { GrantApprovalComponent } from './grant-approval/grant-approval.component';
import { CheckerCommentsComponent } from './checker-comments/checker-comments.component';
import { LetterAttachmentCellComponent } from './letter-attachment-cell/letter-attachment-cell.component';
import { CheckerMakerFieldComponent } from './checker-maker-field/checker-maker-field.component';
import { RejectionTableComponent } from './rejection-table/rejection-table.component';
import { PriorApprovalTableComponent } from './prior-approval-table/prior-approval-table.component';
import { PostFactoApprovalTableComponent } from './post-facto-approval-table/post-facto-approval-table.component';


@NgModule({
  declarations: [
    PriorApprovalComponent,
    GrantApprovalComponent,
    CheckerCommentsComponent,
    LetterAttachmentCellComponent,
    CheckerMakerFieldComponent,
    RejectionTableComponent,
    PriorApprovalTableComponent,
    PostFactoApprovalTableComponent
  ],
  imports: [
    CommonModule,
    PriorApprovalRoutingModule,
    ApplicationReviewSectionBaseModule,
    SelectModule,
    FormsModule,
    IconsModule,
    ModalModule,
    PreviewPdfModule,
    WarningNoteModule
  ]
})
export class PriorApprovalModule { }
