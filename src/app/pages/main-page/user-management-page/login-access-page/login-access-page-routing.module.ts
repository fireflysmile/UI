import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginAccessPageComponent } from './login-access-page.component';

const routes: Routes = [
  {
    path: '',
    component: LoginAccessPageComponent,
    children: [
      {
        path: 'access-management',
        loadChildren: () => import('./access-management-page/access-management-page.module').then(m => m.AccessManagementPageModule),
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginAccessPageRoutingModule { }
