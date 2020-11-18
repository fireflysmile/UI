import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooleanSelectorComponent } from './boolean-selector.component';
import {AutoPositionerModule} from '../auto-positioner/auto-positioner.module';
import {AutoCloserModule} from '../auto-closer/auto-closer.module';
import {AutoScrollModule} from '../auto-scroll/auto-scroll.module';



@NgModule({
  declarations: [BooleanSelectorComponent],
  exports: [
    BooleanSelectorComponent
  ],
  imports: [
    CommonModule,
    AutoPositionerModule,
    AutoCloserModule,
    AutoScrollModule
  ]
})
export class BooleanSelectorModule { }
