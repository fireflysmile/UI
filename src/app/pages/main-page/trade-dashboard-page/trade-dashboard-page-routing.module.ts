import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TradeDashboardPageComponent } from './trade-dashboard-page.component';

const routes: Routes = [
  {
    path: '',
    component: TradeDashboardPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TradeDashboardPageRoutingModule { }
