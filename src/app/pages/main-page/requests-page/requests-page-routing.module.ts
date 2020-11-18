import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestsPageComponent } from './requests-page.component';

const routes: Routes = [{ path: '', component: RequestsPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestsPageRoutingModule { }
