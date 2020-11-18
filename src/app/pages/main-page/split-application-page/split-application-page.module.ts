import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SplitApplicationPageRoutingModule } from './split-application-page-routing.module';
import { SplitApplicationPageComponent } from './split-application-page.component';
import {BackButtonModule} from '../../../components/back-button/back-button.module';
import {IconsModule} from '../../../components/icons/icons.module';
import {
  SplitApplicationDetailedSummaryModule
} from '../../../components/split-application-detailed-summary/split-application-detailed-summary.module';
import {SplitApplicationChartCardModule} from '../../../components/split-application-chart-card/split-application-chart-card.module';
import {SplitApplicationTableModule} from '../../../components/split-application-table/split-application-table.module';


@NgModule({
  declarations: [SplitApplicationPageComponent],
  imports: [
    CommonModule,
    SplitApplicationPageRoutingModule,
    BackButtonModule,
    IconsModule,
    SplitApplicationDetailedSummaryModule,
    SplitApplicationChartCardModule,
    SplitApplicationTableModule,
  ]
})
export class SplitApplicationPageModule { }
