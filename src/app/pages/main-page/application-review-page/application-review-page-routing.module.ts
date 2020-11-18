import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicationReviewPageComponent } from './application-review-page.component';

const routes: Routes = [
  {
    path: '',
    component: ApplicationReviewPageComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'basic-details',
      },
      {
        path: 'basic-details',
        loadChildren: () => import('./basic-details/basic-details.module').then(mod => mod.BasicDetailsModule),
      },
      {
        path: 'experience-details',
        loadChildren: () => import('./experience-details/experience-details.module').then(mod => mod.ExperienceDetailsModule),
      },
      {
        path: 'documents',
        loadChildren: () => import('./documents/documents.module').then(mod => mod.DocumentsModule),
      },
      {
        path: 'director-summary',
        loadChildren: () => import('./director-summary/director-summary.module').then(mod => mod.DirectorSummaryModule),
      },
      {
        path: 'declarations-and-fees',
        loadChildren: () => import('./declarations-and-fees/declarations-and-fees.module').then(mod => mod.DeclarationsAndFeesModule),
      },
      {
        path: 'background-check',
        loadChildren: () => import('./background-check/background-check.module').then(mod => mod.BackgroundCheckModule),
      },
      {
        path: 'review-queue',
        loadChildren: () => import('./review-queue/review-queue.module').then(mod => mod.ReviewQueueModule),
      },
      {
        path: 'prior-approval',
        loadChildren: () => import('./prior-approval/prior-approval.module').then(mod => mod.PriorApprovalModule),
      },
      {
        path: 'post-implementation',
        loadChildren: () => import('./post-implementation/post-implementation.module').then(mod => mod.PostImplementationModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationReviewPageRoutingModule { }
