import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { CheckboxModule } from '../checkbox/checkbox.module';
import { FormsModule } from '@angular/forms';
import { DynamicFilterModule } from '../dynamic-filter/dynamic-filter.module';
import { RequestStatusModule } from '../request-status/request-status.module';
import { InstrumentTypePipeModule } from '../../pipes/instrument-type-pipe/instrument-type-pipe.module';
import { QuantityPipeModule } from '../../pipes/quantity-pipe/quantity-pipe.module';
import { DestinationSegmentSelectorModule } from '../destination-segment-selector/destination-segment-selector.module';
import { BooleanSelectorModule } from '../boolean-selector/boolean-selector.module';
import { RouterModule } from '@angular/router';
import { AllocationStatusItemModule } from '../allocation-status-item/allocation-status-item.module';
import { IconsModule } from '../icons/icons.module';

@NgModule({
  declarations: [TableComponent],
  exports: [TableComponent],
  imports: [
    CommonModule,
    CheckboxModule,
    FormsModule,
    DynamicFilterModule,
    RequestStatusModule,
    InstrumentTypePipeModule,
    QuantityPipeModule,
    DestinationSegmentSelectorModule,
    AllocationStatusItemModule,
    BooleanSelectorModule,
    RouterModule,
    IconsModule
  ],
})
export class TableModule {}
