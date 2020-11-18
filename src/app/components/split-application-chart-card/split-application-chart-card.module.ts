import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplitApplicationChartCardComponent } from './split-application-chart-card.component';
import {RectCardModule} from '../rect-card/rect-card.module';
import {DonutChartModule} from '../donut-chart/donut-chart.module';



@NgModule({
  declarations: [SplitApplicationChartCardComponent],
  exports: [
    SplitApplicationChartCardComponent
  ],
  imports: [
    CommonModule,
    RectCardModule,
    DonutChartModule
  ]
})
export class SplitApplicationChartCardModule { }
