import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationReviewSectionBaseModule } from '../application-review-section-base/application-review-section-base.module';

import { ExperienceDetailsRoutingModule } from './experience-details-routing.module';
import { ExperienceDetailsComponent } from './experience-details.component';


@NgModule({
  declarations: [ExperienceDetailsComponent],
  imports: [
    CommonModule,
    ExperienceDetailsRoutingModule,
    ApplicationReviewSectionBaseModule
  ]
})
export class ExperienceDetailsModule { }
