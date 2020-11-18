import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginAccessTabRouterComponent } from './login-access-tab-router.component';
import {TabRouterModule} from '../tab-router/tab-router.module';



@NgModule({
  declarations: [LoginAccessTabRouterComponent],
  exports: [
    LoginAccessTabRouterComponent
  ],
  imports: [
    CommonModule,
    TabRouterModule
  ]
})
export class LoginAccessTabRouterModule { }
