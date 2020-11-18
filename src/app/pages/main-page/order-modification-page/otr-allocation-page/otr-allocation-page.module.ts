import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtrAllocationPageRoutingModule } from './otr-allocation-page-routing.module';
import { OtrAllocationPageComponent } from './otr-allocation-page.component';
import {OrderModificationBaseModule} from '../order-modification-base/order-modification-base.module';
import {OtrOverviewModule} from '../../../../components/otr-overview/otr-overview.module';
import {OtrOverviewTableModule} from '../../../../components/otr-overview-table/otr-overview-table.module';


@NgModule({
  declarations: [OtrAllocationPageComponent],
  imports: [
    CommonModule,
    OtrAllocationPageRoutingModule,
    OrderModificationBaseModule,
    OtrOverviewModule,
    OtrOverviewTableModule,
  ]
})
export class OtrAllocationPageModule { }
