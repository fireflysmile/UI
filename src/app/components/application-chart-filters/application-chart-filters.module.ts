import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationChartFiltersComponent } from './application-chart-filters.component';
import {IconsModule} from '../icons/icons.module';
import {FormFieldModule} from '../form-field/form-field.module';
import {MultiSelectModule} from '../multi-select/multi-select.module';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [ApplicationChartFiltersComponent],
  exports: [
    ApplicationChartFiltersComponent
  ],
  imports: [
    CommonModule,
    IconsModule,
    FormFieldModule,
    MultiSelectModule,
    ReactiveFormsModule,
  ]
})
export class ApplicationChartFiltersModule { }
