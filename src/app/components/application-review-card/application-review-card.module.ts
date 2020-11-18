import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ApplicationReviewCardComponent } from './application-review-card.component';
import { ApplicationReviewCardTitleComponent } from './application-review-card-title/application-review-card-title.component';
import {
  ApplicationReviewTableActionHeaderComponent
} from './application-review-table-action-header/application-review-table-action-header.component';
import { ApplicationReviewTableActionComponent } from './application-review-table-action/application-review-table-action.component';
import { IconsModule } from '../icons/icons.module';
import { YesNoToggleModule } from '../yes-no-toggle/yes-no-toggle.module';
import { ApplicationReviewTableCellComponent } from './application-review-table-cell/application-review-table-cell.component';
import { AutoSizeTextareaModule } from '../auto-size-textarea/auto-size-textarea.module';
import { DateInputModule } from '../date-input/date-input.module';
import { MoreOptionsModule } from '../more-options/more-options.module';
import { AutoCloserModule } from '../auto-closer/auto-closer.module';
import { PositionFixerModule } from '../position-fixer/position-fixer.module';
import { AutoPositionerModule } from '../auto-positioner/auto-positioner.module';
import { CalendarModule } from '../calendar/calendar.module';
import { MonthPickerModule } from '../month-picker/month-picker.module';
import { SelectModule } from '../select/select.module';
import { NumberOnlyModule } from '../number-only/number-only.module';

import { TimePassedModule } from 'src/app/pipes/time-passed/time-passed.module';


@NgModule({
  declarations: [
    ApplicationReviewCardComponent,
    ApplicationReviewCardTitleComponent,
    ApplicationReviewTableActionHeaderComponent,
    ApplicationReviewTableActionComponent,
    ApplicationReviewTableCellComponent
  ],
  imports: [
    CommonModule,
    IconsModule,
    TimePassedModule,
    YesNoToggleModule,
    FormsModule,
    AutoSizeTextareaModule,
    DateInputModule,
    MoreOptionsModule,
    AutoCloserModule,
    PositionFixerModule,
    CalendarModule,
    AutoPositionerModule,
    MonthPickerModule,
    SelectModule,
    NumberOnlyModule
  ],
  exports: [
    ApplicationReviewCardComponent,
    ApplicationReviewCardTitleComponent,
    ApplicationReviewTableActionHeaderComponent,
    ApplicationReviewTableActionComponent,
    ApplicationReviewTableCellComponent
  ]
})
export class ApplicationReviewCardModule { }
