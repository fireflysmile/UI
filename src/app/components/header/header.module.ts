import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import {IconsModule} from '../icons/icons.module';
import {NotificationModule} from '../notification/notification.module';



@NgModule({
  declarations: [HeaderComponent],
  exports: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    IconsModule,
    NotificationModule
  ]
})
export class HeaderModule { }
