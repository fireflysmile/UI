import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PcOverviewComponent } from './pc-overview.component';
import {OrderModificationOverviewBaseModule} from '../order-modification-overview-base/order-modification-overview-base.module';
import {RequestStatusBarModule} from '../request-status-bar/request-status-bar.module';
import {PcModificationStatusModule} from '../pc-modification-status/pc-modification-status.module';



@NgModule({
  declarations: [PcOverviewComponent],
  exports: [
    PcOverviewComponent
  ],
  imports: [
    CommonModule,
    OrderModificationOverviewBaseModule,
    RequestStatusBarModule,
    PcModificationStatusModule,
  ]
})
export class PcOverviewModule { }
