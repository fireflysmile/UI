import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationReviewSectionBaseModule } from '../application-review-section-base/application-review-section-base.module';

import { BasicDetailsRoutingModule } from './basic-details-routing.module';
import { BasicDetailsComponent } from './basic-details.component';


@NgModule({
  declarations: [BasicDetailsComponent],
  imports: [
    CommonModule,
    BasicDetailsRoutingModule,
    ApplicationReviewSectionBaseModule
  ]
})
export class BasicDetailsModule { }
