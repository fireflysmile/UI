import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateOfChangeItemComponent } from './date-of-change-item.component';
import {DateInputModule} from '../date-input/date-input.module';
import {FormsModule} from '@angular/forms';
import {CalendarModule} from '../calendar/calendar.module';
import {MoreOptionsModule} from '../more-options/more-options.module';
import {AutoCloserModule} from '../auto-closer/auto-closer.module';
import {IconsModule} from '../icons/icons.module';



@NgModule({
  declarations: [DateOfChangeItemComponent],
  exports: [
    DateOfChangeItemComponent
  ],
  imports: [
    CommonModule,
    DateInputModule,
    FormsModule,
    CalendarModule,
    MoreOptionsModule,
    AutoCloserModule,
    IconsModule
  ]
})
export class DateOfChangeItemModule { }
