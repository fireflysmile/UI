import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnderReviewPageRoutingModule } from './under-review-page-routing.module';
import { UnderReviewPageComponent } from './under-review-page.component';
import {RectCardModule} from '../../../../components/rect-card/rect-card.module';
import {IconsModule} from '../../../../components/icons/icons.module';
import {UnderReviewStatusItemModule} from '../../../../components/under-review-status-item/under-review-status-item.module';
import {StatusTrackerSubHeaderModule} from '../../../../components/status-tracker-sub-header/status-tracker-sub-header.module';


@NgModule({
  declarations: [UnderReviewPageComponent],
  imports: [
    CommonModule,
    UnderReviewPageRoutingModule,
    RectCardModule,
    IconsModule,
    UnderReviewStatusItemModule,
    StatusTrackerSubHeaderModule
  ]
})
export class UnderReviewPageModule { }
