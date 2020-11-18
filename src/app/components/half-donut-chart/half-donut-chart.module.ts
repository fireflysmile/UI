import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HalfDonutChartComponent } from './half-donut-chart.component';



@NgModule({
  declarations: [HalfDonutChartComponent],
  exports: [
    HalfDonutChartComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HalfDonutChartModule { }
