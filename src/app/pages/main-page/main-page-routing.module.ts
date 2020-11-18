import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPageComponent } from './main-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard-page/dashboard-page.module').then(
            (m) => m.DashboardPageModule
          ),
      },
      {
        path: 'dashboard/search-application',
        loadChildren: () =>
          import(
            './search-application-page/search-application-page.module'
          ).then((m) => m.SearchApplicationPageModule),
      },
      {
        path: 'dashboard/split-application',
        loadChildren: () =>
          import('./split-application-page/split-application-page.module').then(
            (m) => m.SplitApplicationPageModule
          ),
      },
      {
        path: 'dashboard/status-tracker/:id',
        loadChildren: () =>
          import('./status-tracker-page/status-tracker-page.module').then(
            (m) => m.StatusTrackerPageModule
          ),
        data: {
          fullWidthView: true,
        },
      },
      {
        path: 'trade/dashboard',
        loadChildren: () => import('./trade-dashboard-page/trade-dashboard-page.module').then(m => m.TradeDashboardPageModule)
      },
      {
        path: 'admin-request',
        loadChildren: () =>
          import('./admin-request-page/admin-request-page.module').then(
            (m) => m.AdminRequestPageModule
          ),
      },
      {
        path: 'collateral',
        loadChildren: () => import('./collateral-page/collateral-page.module').then(m => m.CollateralPageModule)
      },
      {
        path: 'requests',
        loadChildren: () =>
          import('./requests-page/requests-page.module').then(
            (m) => m.RequestsPageModule
          ),
      },
      {
        path: 'transfer',
        loadChildren: () =>
          import('./transfer-page/transfer-page.module').then(
            (m) => m.TransferPageModule
          ),
      },
      {
        path: 'my-task',
        loadChildren: () =>
          import('./my-task-page/my-task-page.module').then(
            (m) => m.MyTaskPageModule
          ),
      },
      {
        path: 'notification',
        loadChildren: () =>
          import('./notification-page/notification-page.module').then(
            (m) => m.NotificationPageModule
          ),
        data: {
          fullWidthView: true,
        },
      },
      {
        path: 'application-review',
        loadChildren: () =>
          import(
            './application-review-page/application-review-page.module'
          ).then((m) => m.ApplicationReviewPageModule),
      },
      {
        path: 'user-management',
        loadChildren: () =>
          import('./user-management-page/user-management-page.module').then(
            (m) => m.UserManagementPageModule
          ),
      },
      {
        path: 'trade/order-modification',
        loadChildren: () =>
          import(
            './order-modification-page/order-modification-page.module'
          ).then((m) => m.OrderModificationPageModule),
      },
      {
        path: 'oloc-dashboard',
        loadChildren: () =>
          import('./oloc-dashbord-page/oloc-dashboard-page.module').then(
            (m) => m.OlocDashboardPageModule
          ),
      },
      {
        path: 'oloc-dashboard/application-request',
        loadChildren: () =>
          import(
            './application-request-page/application-request-page.module'
          ).then((m) => m.ApplicationRequestPageModule),
      },
      {
        path: 'oloc-dashboard/split-application',
        loadChildren: () =>
          import(
            './oloc-split-application-page/oloc-split-application-page.module'
          ).then((m) => m.OlocSplitApplicationPageModule),
      },
      {
        path: 'oloc-dashboard/search-application',
        loadChildren: () =>
          import(
            './oloc-search-application-page/oloc-search-application-page.module'
          ).then((m) => m.OlocSearchApplicationPageModule),
      },
      {
        path: 'oloc-dashboard/sim-report',
        loadChildren: () =>
          import('./oloc-sim-report-page/oloc-sim-report-page.module').then(
            (m) => m.OlocSimReportPageModule
          ),
      },
      {
        path: 'trade/settings',
        loadChildren: () => import('./settings-page/settings-page.module').then(m => m.SettingsPageModule),
      },
      {
        path: 'ai-ml',
        loadChildren: () => import('./ai-ml-reporting/ai-ml.module').then(m => m.AIMLModule),
        data: {
          fullWidthView: true
        }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule { }
