import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardPageRoutingModule } from './dashboard-page-routing.module';
import { DashboardPageComponent } from './dashboard-page.component';
import {PageContentModule} from '../../../components/page-content/page-content.module';
import {PageTitleModule} from '../../../components/page-title/page-title.module';
import {IconsModule} from '../../../components/icons/icons.module';
import {ApplicationChartCardModule} from '../../../components/application-chart-card/application-chart-card.module';
import {LastMonthApplicationsModule} from '../../../components/last-month-applications/last-month-applications.module';
import {SplitApplicationsModule} from '../../../components/split-applications/split-applications.module';
import {MemberApplicationTableModule} from '../../../components/member-application-table/member-application-table.module';


@NgModule({
  declarations: [DashboardPageComponent],
  imports: [
    CommonModule,
    DashboardPageRoutingModule,
    PageContentModule,
    PageTitleModule,
    IconsModule,
    ApplicationChartCardModule,
    LastMonthApplicationsModule,
    SplitApplicationsModule,
    MemberApplicationTableModule
  ]
})
export class DashboardPageModule { }
