import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardActionsComponent } from './card-actions.component';
import { CardActionItemModule } from '../card-action-item/card-action-item.module';
import { DividerModule } from '../divider/divider.module';
import { MoreOptionsModule } from '../more-options/more-options.module';
import { IconsModule } from '../icons/icons.module';
import { AutoPositionerModule } from '../auto-positioner/auto-positioner.module';
import { AutoCloserModule } from '../auto-closer/auto-closer.module';
import { PositionFixerModule } from '../position-fixer/position-fixer.module';
import { RangeCalendarModule } from '../range-calendar/range-calendar.module';
import { FormFieldModule } from '../form-field/form-field.module';
import { DateInputModule } from '../date-input/date-input.module';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from '../calendar/calendar.module';

@NgModule({
  declarations: [CardActionsComponent],
  exports: [CardActionsComponent],
  imports: [
    CommonModule,
    CardActionItemModule,
    DividerModule,
    MoreOptionsModule,
    IconsModule,
    AutoPositionerModule,
    AutoCloserModule,
    PositionFixerModule,
    RangeCalendarModule,
    CalendarModule,
    FormFieldModule,
    DateInputModule,
    FormsModule,
  ],
})
export class CardActionsModule {}
