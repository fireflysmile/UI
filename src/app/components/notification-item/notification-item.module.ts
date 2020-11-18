import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationItemComponent } from './notification-item.component';
import {IconsModule} from '../icons/icons.module';



@NgModule({
  declarations: [NotificationItemComponent],
  exports: [
    NotificationItemComponent
  ],
  imports: [
    CommonModule,
    IconsModule
  ]
})
export class NotificationItemModule { }
