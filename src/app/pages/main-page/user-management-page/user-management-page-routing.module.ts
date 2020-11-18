import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserManagementPageComponent } from './user-management-page.component';

const routes: Routes = [
  {
    path: '',
    component: UserManagementPageComponent,
    children: [
      {
        path: 'login-access',
        loadChildren: () => import('./login-access-page/login-access-page.module').then(m => m.LoginAccessPageModule),
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementPageRoutingModule { }
