import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationReviewSectionBaseModule } from '../application-review-section-base/application-review-section-base.module';

import { BackgroundCheckRoutingModule } from './background-check-routing.module';
import { BackgroundCheckComponent } from './background-check.component';


@NgModule({
  declarations: [BackgroundCheckComponent],
  imports: [
    CommonModule,
    BackgroundCheckRoutingModule,
    ApplicationReviewSectionBaseModule
  ]
})
export class BackgroundCheckModule { }
