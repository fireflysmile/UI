import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaterfallBarChartComponent } from './waterfall-bar-chart.component';
import {IconsModule} from '../icons.module';



@NgModule({
  declarations: [WaterfallBarChartComponent],
  exports: [
    WaterfallBarChartComponent
  ],
  imports: [
    CommonModule,
    IconsModule
  ]
})
export class WaterfallBarChartModule { }
