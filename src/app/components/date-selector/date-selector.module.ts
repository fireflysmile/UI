import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DateSelectorComponent } from './date-selector.component';

import { DateInputModule } from '../date-input/date-input.module';
import { MoreOptionsModule } from '../more-options/more-options.module';
import { AutoCloserModule } from '../auto-closer/auto-closer.module';
import { PositionFixerModule } from '../position-fixer/position-fixer.module';
import { AutoPositionerModule } from '../auto-positioner/auto-positioner.module';
import { CalendarModule } from '../calendar/calendar.module';
import { IconsModule } from '../icons/icons.module';

@NgModule({
  declarations: [DateSelectorComponent],
  imports: [
    CommonModule,
    FormsModule,
    DateInputModule,
    MoreOptionsModule,
    AutoCloserModule,
    PositionFixerModule,
    AutoPositionerModule,
    CalendarModule,
    IconsModule
  ],
  exports: [
    DateSelectorComponent
  ]
})
export class DateSelectorModule { }
