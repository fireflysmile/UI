import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginAccessPageRoutingModule } from './login-access-page-routing.module';
import { LoginAccessPageComponent } from './login-access-page.component';
import {RectCardModule} from '../../../../components/rect-card/rect-card.module';
import {LoginAccessTabRouterModule} from '../../../../components/login-access-tab-router/login-access-tab-router.module';


@NgModule({
  declarations: [LoginAccessPageComponent],
  imports: [
    CommonModule,
    LoginAccessPageRoutingModule,
    RectCardModule,
    LoginAccessTabRouterModule,
  ]
})
export class LoginAccessPageModule { }
