import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OlocDashboardPageRoutingModule } from './oloc-dashboard-page-routing.module';
import { OlocDashboardPageComponent } from './oloc-dashboard-page.component';
import {PageContentModule} from '../../../components/page-content/page-content.module';
import {PageTitleModule} from '../../../components/page-title/page-title.module';
import {IconsModule} from '../../../components/icons/icons.module';
import {OlocApplicationChartCardModule} from '../../../components/oloc-application-chart-card/oloc-application-chart-card.module';
import {LastMonthApplicationsModule} from '../../../components/last-month-applications/last-month-applications.module';
import {RequestApplicationsModule} from '../../../components/request-applications/request-applications.module';
import {MemberApplicationTableModule} from '../../../components/member-application-table/member-application-table.module';
import {RequestApplicationCardModule} from '../../../components/request-application-card/request-application-card.module';
import {KcarStatusModalModule} from '../../../components/kcar-status-modal/kcar-status-modal.module';

@NgModule({
  declarations: [OlocDashboardPageComponent],
  imports: [
    CommonModule,
    OlocDashboardPageRoutingModule,
    PageContentModule,
    PageTitleModule,
    IconsModule,
    OlocApplicationChartCardModule,
    LastMonthApplicationsModule,
    RequestApplicationsModule,
    MemberApplicationTableModule,
    RequestApplicationCardModule,
    KcarStatusModalModule
  ]
})
export class OlocDashboardPageModule { }
