import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonutChartComponent } from './donut-chart.component';

import { MoreOptionsModule } from 'src/app/components/more-options/more-options.module';

@NgModule({
  declarations: [DonutChartComponent],
  exports: [
    DonutChartComponent
  ],
  imports: [
    CommonModule,
    MoreOptionsModule
  ]
})
export class DonutChartModule { }
