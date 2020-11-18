import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsPageComponent } from './settings-page.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsPageComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./settings-default-page/settings-default-page.module').then(m => m.SettingsDefaultPageModule),
      },
      {
        path: 'view-rule',
        loadChildren: () => import('./view-rule-page/view-rule-page.module').then(m => m.ViewRulePageModule),
      },
      {
        path: 'set-rule',
        loadChildren: () => import('./set-rule-page/set-rule-page.module').then(m => m.SetRulePageModule),
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsPageRoutingModule { }
