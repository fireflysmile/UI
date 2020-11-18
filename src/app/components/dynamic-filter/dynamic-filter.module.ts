import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFilterComponent } from './dynamic-filter.component';
import {FormsModule} from '@angular/forms';
import {DynamicFilterOptionsModule} from '../dynamic-filter-options/dynamic-filter-options.module';
import {AutoCloserModule} from '../auto-closer/auto-closer.module';
import {PositionFixerModule} from '../position-fixer/position-fixer.module';
import {DynamicFilterTimesModule} from '../dynamic-filter-times/dynamic-filter-times.module';
import {DynamicFilterDatesModule} from '../dynamic-filter-dates/dynamic-filter-dates.module';
import {DynamicFilterQuantityModule} from '../dynamic-filter-quantity/dynamic-filter-quantity.module';


@NgModule({
  declarations: [DynamicFilterComponent],
  exports: [
    DynamicFilterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DynamicFilterOptionsModule,
    AutoCloserModule,
    PositionFixerModule,
    DynamicFilterTimesModule,
    DynamicFilterDatesModule,
    DynamicFilterQuantityModule
  ],
})
export class DynamicFilterModule { }
