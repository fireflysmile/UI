import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatusTrackerPageComponent } from './status-tracker-page.component';

const routes: Routes = [
  {
    path: '',
    component: StatusTrackerPageComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('./status-tracker-router-distributor/status-tracker-router-distributor.module')
          .then(m => m.StatusTrackerRouterDistributorModule),
      },
      {
        path: 'under-review',
        loadChildren: () => import('./under-review-page/under-review-page.module').then(m => m.UnderReviewPageModule),
      },
      {
        path: 'clarification',
        loadChildren: () => import('./clarification-page/clarification-page.module').then(m => m.ClarificationPageModule),
      },
      {
        path: 'approval',
        loadChildren: () => import('./prior-approvals-page/prior-approvals-page.module').then(m => m.PriorApprovalsPageModule),
      },
      {
        path: 'post-implementation',
        loadChildren: () => import('./post-implementation-page/post-implementation-page.module').then(m => m.PostImplementationPageModule),
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatusTrackerPageRoutingModule { }
