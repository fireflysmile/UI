import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationPageRoutingModule } from './notification-page-routing.module';
import { NotificationPageComponent } from './notification-page.component';
import {BackButtonModule} from '../../../components/back-button/back-button.module';
import {PageTitleModule} from '../../../components/page-title/page-title.module';
import {NotificationItemModule} from '../../../components/notification-item/notification-item.module';


@NgModule({
  declarations: [NotificationPageComponent],
  imports: [
    CommonModule,
    NotificationPageRoutingModule,
    BackButtonModule,
    PageTitleModule,
    NotificationItemModule
  ]
})
export class NotificationPageModule { }
