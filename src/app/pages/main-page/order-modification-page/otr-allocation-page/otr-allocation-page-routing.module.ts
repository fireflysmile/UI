import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtrAllocationPageComponent } from './otr-allocation-page.component';

const routes: Routes = [{ path: '', component: OtrAllocationPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OtrAllocationPageRoutingModule { }
