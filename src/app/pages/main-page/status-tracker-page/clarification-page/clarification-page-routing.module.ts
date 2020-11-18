import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClarificationPageComponent } from './clarification-page.component';

const routes: Routes = [{ path: '', component: ClarificationPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClarificationPageRoutingModule { }
