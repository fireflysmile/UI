import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OlocApplicationChartFiltersComponent } from './oloc-application-chart-filters.component';
import {IconsModule} from '../icons/icons.module';
import {FormFieldModule} from '../form-field/form-field.module';
import {MultiSelectModule} from '../multi-select/multi-select.module';
import {ReactiveFormsModule} from '@angular/forms';
import {SelectModule} from '../select/select.module';
import {CardActionsModule} from '../card-actions/card-actions.module';


@NgModule({
  declarations: [OlocApplicationChartFiltersComponent],
  exports: [
    OlocApplicationChartFiltersComponent
  ],
  imports: [
    CommonModule,
    IconsModule,
    FormFieldModule,
    MultiSelectModule,
    ReactiveFormsModule,
    SelectModule,
    CardActionsModule
  ]
})
export class OlocApplicationChartFiltersModule { }
