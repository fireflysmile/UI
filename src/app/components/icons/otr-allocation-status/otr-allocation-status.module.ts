import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtrAllocationStatusComponent } from './otr-allocation-status.component';
import {WaterfallBarChartModule} from '../waterfall-bar-chart/waterfall-bar-chart.module';



@NgModule({
  declarations: [OtrAllocationStatusComponent],
  exports: [
    OtrAllocationStatusComponent
  ],
  imports: [
    CommonModule,
    WaterfallBarChartModule
  ]
})
export class OtrAllocationStatusModule { }
