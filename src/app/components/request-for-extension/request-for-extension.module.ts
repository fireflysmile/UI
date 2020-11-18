import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestForExtensionComponent } from './request-for-extension.component';
import {RequestForExtensionItemModule} from '../request-for-extension-item/request-for-extension-item.module';
import {IconsModule} from '../icons/icons.module';



@NgModule({
  declarations: [RequestForExtensionComponent],
  exports: [
    RequestForExtensionComponent
  ],
  imports: [
    CommonModule,
    RequestForExtensionItemModule,
    IconsModule
  ]
})
export class RequestForExtensionModule { }
