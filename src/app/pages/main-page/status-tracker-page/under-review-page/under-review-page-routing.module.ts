import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnderReviewPageComponent } from './under-review-page.component';

const routes: Routes = [{ path: '', component: UnderReviewPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnderReviewPageRoutingModule { }
