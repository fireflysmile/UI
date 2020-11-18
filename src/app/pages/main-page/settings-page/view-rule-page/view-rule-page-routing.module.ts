import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewRulePageComponent } from './view-rule-page.component';

const routes: Routes = [{ path: '', component: ViewRulePageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewRulePageRoutingModule { }
