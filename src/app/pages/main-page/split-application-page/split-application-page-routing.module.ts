import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SplitApplicationPageComponent } from './split-application-page.component';

const routes: Routes = [{ path: '', component: SplitApplicationPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SplitApplicationPageRoutingModule { }
