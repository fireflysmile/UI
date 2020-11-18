import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplitApplicationDetailedSummaryComponent } from './split-application-detailed-summary.component';
import {SplitApplicationCardModule} from '../split-application-card/split-application-card.module';



@NgModule({
  declarations: [SplitApplicationDetailedSummaryComponent],
  exports: [
    SplitApplicationDetailedSummaryComponent
  ],
  imports: [
    CommonModule,
    SplitApplicationCardModule
  ]
})
export class SplitApplicationDetailedSummaryModule { }
