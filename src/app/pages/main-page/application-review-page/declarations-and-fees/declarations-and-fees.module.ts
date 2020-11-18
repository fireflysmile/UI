import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ApplicationReviewSectionBaseModule } from '../application-review-section-base/application-review-section-base.module';
import { CheckboxModule } from 'src/app/components/checkbox/checkbox.module';

import { DeclarationsAndFeesRoutingModule } from './declarations-and-fees-routing.module';
import { DeclarationsAndFeesComponent } from './declarations-and-fees.component';
import { DeclarationsCardComponent } from './declarations-card/declarations-card.component';


@NgModule({
  declarations: [DeclarationsAndFeesComponent, DeclarationsCardComponent],
  imports: [
    CommonModule,
    DeclarationsAndFeesRoutingModule,
    ApplicationReviewSectionBaseModule,
    CheckboxModule,
    FormsModule
  ]
})
export class DeclarationsAndFeesModule { }
