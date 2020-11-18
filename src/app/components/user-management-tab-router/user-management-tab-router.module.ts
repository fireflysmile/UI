import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementTabRouterComponent } from './user-management-tab-router.component';
import {RectCardModule} from '../rect-card/rect-card.module';
import {TabRouterModule} from '../tab-router/tab-router.module';



@NgModule({
  declarations: [UserManagementTabRouterComponent],
  exports: [
    UserManagementTabRouterComponent
  ],
  imports: [
    CommonModule,
    RectCardModule,
    TabRouterModule
  ]
})
export class UserManagementTabRouterModule { }
