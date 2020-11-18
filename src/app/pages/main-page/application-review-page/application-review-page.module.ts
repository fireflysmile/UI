import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageContentModule } from 'src/app/components/page-content/page-content.module';
import { ApplicationReviewCardModule } from 'src/app/components/application-review-card/application-review-card.module';
import { BackButtonModule } from 'src/app/components/back-button/back-button.module';


import { ApplicationReviewPageRoutingModule } from './application-review-page-routing.module';
import { ApplicationReviewPageComponent } from './application-review-page.component';


@NgModule({
  declarations: [ApplicationReviewPageComponent],
  imports: [
    CommonModule,
    ApplicationReviewPageRoutingModule,
    PageContentModule,
    ApplicationReviewCardModule,
    BackButtonModule
  ]
})
export class ApplicationReviewPageModule { }
