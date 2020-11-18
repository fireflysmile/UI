import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestForExtensionItemComponent } from './request-for-extension-item.component';
import {IconsModule} from '../icons/icons.module';



@NgModule({
  declarations: [RequestForExtensionItemComponent],
  exports: [
    RequestForExtensionItemComponent
  ],
  imports: [
    CommonModule,
    IconsModule
  ]
})
export class RequestForExtensionItemModule { }
