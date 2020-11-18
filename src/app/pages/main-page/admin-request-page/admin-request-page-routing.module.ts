import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminRequestPageComponent } from './admin-request-page.component';


const routes: Routes = [{ path: '', component: AdminRequestPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRequestPageRoutingModule { }
