import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RangeCalendarComponent } from './range-calendar.component';
import {DividerModule} from '../divider/divider.module';



@NgModule({
  declarations: [RangeCalendarComponent],
  exports: [
    RangeCalendarComponent
  ],
  imports: [
    CommonModule,
    DividerModule
  ]
})
export class RangeCalendarModule { }
