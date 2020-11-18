import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OlocDashboardPageComponent } from './oloc-dashboard-page.component';

const routes: Routes = [
  { path: '', component: OlocDashboardPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OlocDashboardPageRoutingModule { }
