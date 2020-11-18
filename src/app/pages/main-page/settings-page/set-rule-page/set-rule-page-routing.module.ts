import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetRulePageComponent } from './set-rule-page.component';

const routes: Routes = [{ path: '', component: SetRulePageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetRulePageRoutingModule { }
