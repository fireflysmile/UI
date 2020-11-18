import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccessManagementPageComponent } from './access-management-page.component';

const routes: Routes = [{ path: '', component: AccessManagementPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessManagementPageRoutingModule { }
