import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification.component';
import {IconsModule} from '../icons/icons.module';
import {AutoCloserModule} from '../auto-closer/auto-closer.module';
import {PositionFixerModule} from '../position-fixer/position-fixer.module';
import {NotificationItemModule} from '../notification-item/notification-item.module';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [NotificationComponent],
  exports: [
    NotificationComponent
  ],
  imports: [
    CommonModule,
    IconsModule,
    AutoCloserModule,
    PositionFixerModule,
    NotificationItemModule,
    RouterModule
  ]
})
export class NotificationModule { }
