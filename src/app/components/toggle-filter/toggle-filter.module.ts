import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleFilterComponent } from './toggle-filter.component';
import {FormControlBaseModule} from '../form-control-base/form-control-base.module';



@NgModule({
  declarations: [ToggleFilterComponent],
  exports: [
    ToggleFilterComponent
  ],
  imports: [
    CommonModule,
    FormControlBaseModule,
  ]
})
export class ToggleFilterModule { }
