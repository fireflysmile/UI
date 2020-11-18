import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationChartCardComponent } from './application-chart-card.component';
import {RectCardModule} from '../rect-card/rect-card.module';
import {ApplicationChartFiltersModule} from '../application-chart-filters/application-chart-filters.module';
import {StackedBarChartModule} from '../stacked-bar-chart/stacked-bar-chart.module';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [ApplicationChartCardComponent],
  exports: [
    ApplicationChartCardComponent
  ],
  imports: [
    CommonModule,
    RectCardModule,
    ApplicationChartFiltersModule,
    StackedBarChartModule,
    FormsModule
  ]
})
export class ApplicationChartCardModule { }
