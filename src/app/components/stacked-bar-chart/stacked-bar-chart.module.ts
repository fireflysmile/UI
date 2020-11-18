import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StackedBarChartComponent } from './stacked-bar-chart.component';
import { StackedBarComponent } from './stacked-bar/stacked-bar.component';
import { StackedBarLegendComponent } from './stacked-bar-legend/stacked-bar-legend.component';
import {ShorthandedNumberPipeModule} from '../../pipes/shorthanded-number-pipe/shorthanded-number-pipe.module';

import { MoreOptionsModule } from '../more-options/more-options.module';
import { AutoCloserModule } from '../auto-closer/auto-closer.module';
import { PositionFixerModule } from '../position-fixer/position-fixer.module';
import { AutoPositionerModule } from '../auto-positioner/auto-positioner.module';


@NgModule({
  declarations: [StackedBarChartComponent, StackedBarComponent, StackedBarLegendComponent],
  exports: [
    StackedBarChartComponent,
    StackedBarLegendComponent
  ],
  imports: [
    CommonModule,
    ShorthandedNumberPipeModule,
    MoreOptionsModule,
    AutoCloserModule,
    PositionFixerModule,
    AutoPositionerModule
  ]
})
export class StackedBarChartModule { }
