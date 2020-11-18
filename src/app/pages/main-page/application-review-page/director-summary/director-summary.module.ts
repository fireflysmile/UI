import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationReviewSectionBaseModule } from '../application-review-section-base/application-review-section-base.module';

import { DirectorSummaryRoutingModule } from './director-summary-routing.module';
import { DirectorSummaryComponent } from './director-summary.component';
import { PostFactoChangesCardComponent } from './post-facto-changes-card/post-facto-changes-card.component';
import { ProposedChangesCardComponent } from './proposed-changes-card/proposed-changes-card.component';


@NgModule({
  declarations: [DirectorSummaryComponent, PostFactoChangesCardComponent, ProposedChangesCardComponent],
  imports: [
    CommonModule,
    DirectorSummaryRoutingModule,
    ApplicationReviewSectionBaseModule
  ]
})
export class DirectorSummaryModule { }
