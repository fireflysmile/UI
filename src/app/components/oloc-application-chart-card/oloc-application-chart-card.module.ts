import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OlocApplicationChartCardComponent } from './oloc-application-chart-card.component';
import {RectCardModule} from '../rect-card/rect-card.module';
import {OlocApplicationChartFiltersModule} from '../oloc-application-chart-filters/oloc-application-chart-filters.module';
import {StackedBarChartModule} from '../stacked-bar-chart/stacked-bar-chart.module';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [OlocApplicationChartCardComponent],
  exports: [
    OlocApplicationChartCardComponent
  ],
  imports: [
    CommonModule,
    RectCardModule,
    OlocApplicationChartFiltersModule,
    StackedBarChartModule,
    FormsModule
  ]
})
export class OlocApplicationChartCardModule { }
