import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFilterTimesComponent } from './dynamic-filter-times.component';
import {DividerModule} from '../divider/divider.module';
import {TimeSelectorModule} from '../time-selector/time-selector.module';
import {FormsModule} from '@angular/forms';
import {ResponsiveFilterBaseModule} from '../responsive-filter-base/responsive-filter-base.module';



@NgModule({
  declarations: [DynamicFilterTimesComponent],
  exports: [
    DynamicFilterTimesComponent
  ],
  imports: [
    CommonModule,
    DividerModule,
    TimeSelectorModule,
    FormsModule,
    ResponsiveFilterBaseModule,
  ]
})
export class DynamicFilterTimesModule { }
