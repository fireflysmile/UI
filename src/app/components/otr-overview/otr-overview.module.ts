import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtrOverviewComponent } from './otr-overview.component';
import {OrderModificationOverviewBaseModule} from '../order-modification-overview-base/order-modification-overview-base.module';
import {OtrRequestSummaryModule} from '../otr-request-summary/otr-request-summary.module';
import {OtrAllocationStatusModule} from '../icons/otr-allocation-status/otr-allocation-status.module';



@NgModule({
  declarations: [OtrOverviewComponent],
  exports: [
    OtrOverviewComponent
  ],
  imports: [
    CommonModule,
    OrderModificationOverviewBaseModule,
    OtrRequestSummaryModule,
    OtrAllocationStatusModule,
  ]
})
export class OtrOverviewModule { }
