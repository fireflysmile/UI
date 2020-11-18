import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderModificationPageRoutingModule } from './order-modification-page-routing.module';
import { OrderModificationPageComponent } from './order-modification-page.component';


@NgModule({
  declarations: [OrderModificationPageComponent],
  imports: [
    CommonModule,
    OrderModificationPageRoutingModule,
  ]
})
export class OrderModificationPageModule { }
