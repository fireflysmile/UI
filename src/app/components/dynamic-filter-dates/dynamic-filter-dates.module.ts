import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFilterDatesComponent } from './dynamic-filter-dates.component';
import {DividerModule} from '../divider/divider.module';
import {NgxMaskModule} from 'ngx-mask';
import {FormsModule} from '@angular/forms';
import {RangeCalendarModule} from '../range-calendar/range-calendar.module';
import {ResponsiveFilterBaseModule} from '../responsive-filter-base/responsive-filter-base.module';
import {AutoFocusModule} from '../auto-focus/auto-focus.module';



@NgModule({
  declarations: [DynamicFilterDatesComponent],
  exports: [
    DynamicFilterDatesComponent
  ],
  imports: [
    CommonModule,
    DividerModule,
    NgxMaskModule.forRoot(),
    FormsModule,
    RangeCalendarModule,
    ResponsiveFilterBaseModule,
    AutoFocusModule,
  ],
})
export class DynamicFilterDatesModule { }
