import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClarificationPageRoutingModule } from './clarification-page-routing.module';
import { ClarificationPageComponent } from './clarification-page.component';
import {RectCardModule} from '../../../../components/rect-card/rect-card.module';
import {StatusTrackerSubHeaderModule} from '../../../../components/status-tracker-sub-header/status-tracker-sub-header.module';
import {
  ApplicationClarificationTableModule
} from '../../../../components/application-clarification-table/application-clarification-table.module';
import {PageActionsModule} from '../../../../components/page-actions/page-actions.module';
import {IconsModule} from '../../../../components/icons/icons.module';
import {ClarificationReviewModalModule} from '../../../../components/clarification-review-modal/clarification-review-modal.module';
import {ClarificationEditsModalModule} from '../../../../components/clarification-edits-modal/clarification-edits-modal.module';


@NgModule({
  declarations: [ClarificationPageComponent],
  imports: [
    CommonModule,
    ClarificationPageRoutingModule,
    RectCardModule,
    StatusTrackerSubHeaderModule,
    ApplicationClarificationTableModule,
    PageActionsModule,
    IconsModule,
    ClarificationReviewModalModule,
    ClarificationEditsModalModule,
  ]
})
export class ClarificationPageModule { }
