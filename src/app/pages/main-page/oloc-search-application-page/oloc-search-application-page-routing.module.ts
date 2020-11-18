import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OlocSearchApplicationPageComponent } from './oloc-search-application-page.component';

const routes: Routes = [{ path: '', component: OlocSearchApplicationPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OlocSearchApplicationPageRoutingModule { }
