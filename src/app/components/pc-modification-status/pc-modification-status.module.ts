import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PcModificationStatusComponent } from './pc-modification-status.component';
import {WaterfallBarChartModule} from '../icons/waterfall-bar-chart/waterfall-bar-chart.module';



@NgModule({
  declarations: [PcModificationStatusComponent],
  exports: [
    PcModificationStatusComponent
  ],
  imports: [
    CommonModule,
    WaterfallBarChartModule
  ]
})
export class PcModificationStatusModule { }
