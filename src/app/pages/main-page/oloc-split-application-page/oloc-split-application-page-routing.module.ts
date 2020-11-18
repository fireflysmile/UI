import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OlocSplitApplicationPageComponent } from './oloc-split-application-page.component';

const routes: Routes = [{ path: '', component: OlocSplitApplicationPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OlocSplitApplicationPageRoutingModule { }
