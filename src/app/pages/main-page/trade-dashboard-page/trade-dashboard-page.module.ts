import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TradeDashboardPageRoutingModule } from './trade-dashboard-page-routing.module';
import { TradeDashboardPageComponent } from './trade-dashboard-page.component';

import { PageContentModule } from 'src/app/components/page-content/page-content.module';
import { PageTitleModule } from 'src/app/components/page-title/page-title.module';
import { TradeCardModule } from 'src/app/components/trade-card/trade-card.module';
import { ToggleFilterModule } from 'src/app/components/toggle-filter/toggle-filter.module';
import { DynamicFilterModule } from 'src/app/components/dynamic-filter/dynamic-filter.module';
import { StackedBarChartModule } from 'src/app/components/stacked-bar-chart/stacked-bar-chart.module';
import { DonutChartModule } from 'src/app/components/donut-chart/donut-chart.module';
import { TradeTableModule } from 'src/app/components/trade-table/trade-table.module';
import { CapsuleToggleModule } from 'src/app/components/capsule-toggle/capsule-toggle.module';
import { CardActionItemModule } from 'src/app/components/card-action-item/card-action-item.module';

import { TradeOverviewBaseComponent } from './trade-overview-base/trade-overview-base.component';
import { OverallTradeOverviewComponent } from './overall-trade-overview/overall-trade-overview.component';
import { PcTradeOverviewComponent } from './pc-trade-overview/pc-trade-overview.component';
import { LatestTradesComponent } from './latest-trades/latest-trades.component';

@NgModule({
  declarations: [
    TradeDashboardPageComponent,
    TradeOverviewBaseComponent,
    OverallTradeOverviewComponent,
    PcTradeOverviewComponent,
    LatestTradesComponent
  ],
  imports: [
    CommonModule,
    TradeDashboardPageRoutingModule,
    FormsModule,
    PageContentModule,
    PageTitleModule,
    TradeCardModule,
    ToggleFilterModule,
    DynamicFilterModule,
    StackedBarChartModule,
    DonutChartModule,
    TradeTableModule,
    CapsuleToggleModule,
    CardActionItemModule
  ]
})
export class TradeDashboardPageModule { }
