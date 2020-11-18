import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorizontalBarChartComponent } from './horizontal-bar-chart.component';



@NgModule({
  declarations: [HorizontalBarChartComponent],
  exports: [HorizontalBarChartComponent],
  imports: [
    CommonModule
  ]
})
export class HorizontalBarChartModule { }
