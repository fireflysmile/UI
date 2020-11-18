import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DirectorSummaryComponent } from './director-summary.component';

const routes: Routes = [
  {
    path: '',
    component: DirectorSummaryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirectorSummaryRoutingModule { }
