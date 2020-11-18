import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ApplicationReviewSectionBaseModule } from '../application-review-section-base/application-review-section-base.module';
import { ContactBoxModule } from 'src/app/components/contact-box/contact-box.module';
import { CheckboxModule } from 'src/app/components/checkbox/checkbox.module';
import { IconsModule } from 'src/app/components/icons/icons.module';
import { ModalModule } from 'src/app/components/modal/modal.module';
import { PreviewPdfModule } from 'src/app/components/preview-pdf/preview-pdf.module';
import { FilepickerModule } from 'src/app/components/filepicker/filepicker.module';

import { ReviewQueueRoutingModule } from './review-queue-routing.module';
import { ReviewQueueComponent } from './review-queue.component';
import { CloseEditedWarningComponent } from './close-edited-warning/close-edited-warning.component';
import { CompletedReviewsComponent } from './completed-reviews/completed-reviews.component';


@NgModule({
  declarations: [ReviewQueueComponent, CloseEditedWarningComponent, CompletedReviewsComponent],
  imports: [
    CommonModule,
    ReviewQueueRoutingModule,
    ApplicationReviewSectionBaseModule,
    ContactBoxModule,
    CheckboxModule,
    IconsModule,
    FormsModule,
    ModalModule,
    PreviewPdfModule,
    FilepickerModule
  ]
})
export class ReviewQueueModule { }
