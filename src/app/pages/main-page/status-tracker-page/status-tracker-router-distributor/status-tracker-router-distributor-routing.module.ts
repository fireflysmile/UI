import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatusTrackerRouterDistributorComponent } from './status-tracker-router-distributor.component';

const routes: Routes = [{ path: '', component: StatusTrackerRouterDistributorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatusTrackerRouterDistributorRoutingModule { }
