import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PriorApprovalsPageComponent } from './prior-approvals-page.component';

const routes: Routes = [{ path: '', component: PriorApprovalsPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PriorApprovalsPageRoutingModule { }
