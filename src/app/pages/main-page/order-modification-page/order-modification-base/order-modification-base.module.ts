import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderModificationBaseComponent } from './order-modification-base.component';
import {PageTitleModule} from '../../../../components/page-title/page-title.module';
import {ViewToggleModule} from '../../../../components/view-toggle/view-toggle.module';



@NgModule({
  declarations: [OrderModificationBaseComponent],
  imports: [
    CommonModule,
    PageTitleModule,
    ViewToggleModule
  ],
  exports: [
    OrderModificationBaseComponent,
    PageTitleModule,
    ViewToggleModule
  ],
})
export class OrderModificationBaseModule { }
