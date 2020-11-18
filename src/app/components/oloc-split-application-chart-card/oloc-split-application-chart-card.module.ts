import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OlocSplitApplicationChartCardComponent } from './oloc-split-application-chart-card.component';
import {RectCardModule} from '../rect-card/rect-card.module';
import {HalfDonutChartModule} from '../half-donut-chart/half-donut-chart.module';



@NgModule({
  declarations: [OlocSplitApplicationChartCardComponent],
  exports: [
    OlocSplitApplicationChartCardComponent
  ],
  imports: [
    CommonModule,
    RectCardModule,
    HalfDonutChartModule
  ]
})
export class OlocSplitApplicationChartCardModule { }
