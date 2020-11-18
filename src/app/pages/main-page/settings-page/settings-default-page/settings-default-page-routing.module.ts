import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsDefaultPageComponent } from './settings-default-page.component';

const routes: Routes = [{ path: '', component: SettingsDefaultPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsDefaultPageRoutingModule { }
