import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PcModificationPageRoutingModule } from './pc-modification-page-routing.module';
import { PcModificationPageComponent } from './pc-modification-page.component';
import {OrderModificationBaseModule} from '../order-modification-base/order-modification-base.module';
import {PcOverviewModule} from '../../../../components/pc-overview/pc-overview.module';
import {PcModificationTableModule} from '../../../../components/pc-modification-table/pc-modification-table.module';
import {PcModificationFooterModule} from '../../../../components/pc-modification-footer/pc-modification-footer.module';


@NgModule({
  declarations: [PcModificationPageComponent],
  imports: [
    CommonModule,
    PcModificationPageRoutingModule,
    OrderModificationBaseModule,
    PcOverviewModule,
    PcModificationTableModule,
    PcModificationFooterModule,
  ]
})
export class PcModificationPageModule { }
