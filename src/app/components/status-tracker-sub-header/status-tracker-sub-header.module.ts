import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusTrackerSubHeaderComponent } from './status-tracker-sub-header.component';
import {RectCardModule} from '../rect-card/rect-card.module';



@NgModule({
  declarations: [StatusTrackerSubHeaderComponent],
  exports: [
    StatusTrackerSubHeaderComponent
  ],
  imports: [
    CommonModule,
    RectCardModule
  ]
})
export class StatusTrackerSubHeaderModule { }
