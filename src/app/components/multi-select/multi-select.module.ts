import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiSelectComponent } from './multi-select.component';
import {SelectModule} from '../select/select.module';
import {AutoCloserModule} from '../auto-closer/auto-closer.module';
import {AutoPositionerModule} from '../auto-positioner/auto-positioner.module';
import {CheckboxModule} from '../checkbox/checkbox.module';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [MultiSelectComponent],
  exports: [
    MultiSelectComponent
  ],
  imports: [
    CommonModule,
    SelectModule,
    AutoCloserModule,
    AutoPositionerModule,
    CheckboxModule,
    FormsModule
  ]
})
export class MultiSelectModule { }
