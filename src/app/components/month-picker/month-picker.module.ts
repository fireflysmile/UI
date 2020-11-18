import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MonthPickerComponent } from './month-picker.component';

@NgModule({
  declarations: [MonthPickerComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    MonthPickerComponent
  ]
})
export class MonthPickerModule { }
