import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinationSegmentSelectorComponent } from './destination-segment-selector.component';
import {AutoPositionerModule} from '../auto-positioner/auto-positioner.module';
import {AutoCloserModule} from '../auto-closer/auto-closer.module';
import {AutoScrollModule} from '../auto-scroll/auto-scroll.module';



@NgModule({
  declarations: [DestinationSegmentSelectorComponent],
  exports: [
    DestinationSegmentSelectorComponent
  ],
  imports: [
    CommonModule,
    AutoPositionerModule,
    AutoCloserModule,
    AutoScrollModule
  ]
})
export class DestinationSegmentSelectorModule { }
