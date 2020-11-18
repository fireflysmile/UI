import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementPageRoutingModule } from './user-management-page-routing.module';
import { UserManagementPageComponent } from './user-management-page.component';
import {UserManagementTabRouterModule} from '../../../components/user-management-tab-router/user-management-tab-router.module';


@NgModule({
  declarations: [UserManagementPageComponent],
  imports: [
    CommonModule,
    UserManagementPageRoutingModule,
    UserManagementTabRouterModule,
  ]
})
export class UserManagementPageModule { }
