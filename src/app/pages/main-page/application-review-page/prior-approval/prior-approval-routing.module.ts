import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PriorApprovalComponent } from './prior-approval.component';

const routes: Routes = [
  {
    path: '',
    component: PriorApprovalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PriorApprovalRoutingModule { }
