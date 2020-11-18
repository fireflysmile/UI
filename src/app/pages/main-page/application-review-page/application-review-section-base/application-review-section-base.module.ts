import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationReviewSectionBaseComponent } from './application-review-section-base.component';

import { EditFormActionsModule } from 'src/app/components/edit-form-actions/edit-form-actions.module';
import { CardActionItemModule } from 'src/app/components/card-action-item/card-action-item.module';
import { ApplicationReviewCardModule } from 'src/app/components/application-review-card/application-review-card.module';
import { AutoSizeTextareaModule } from 'src/app/components/auto-size-textarea/auto-size-textarea.module';
import { ModalModule } from 'src/app/components/modal/modal.module';
import { AlertMessageModule } from 'src/app/components/alert-message/alert-message.module';

@NgModule({
  declarations: [ApplicationReviewSectionBaseComponent],
  imports: [
    CommonModule,
    EditFormActionsModule,
    CardActionItemModule,
    ApplicationReviewCardModule,
    AutoSizeTextareaModule
  ],
  exports: [
    EditFormActionsModule,
    CardActionItemModule,
    ApplicationReviewCardModule,
    ApplicationReviewSectionBaseComponent,
    AutoSizeTextareaModule,
    ModalModule,
    AlertMessageModule
  ]
})
export class ApplicationReviewSectionBaseModule { }
