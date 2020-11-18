import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilepickerDirective } from './filepicker.directive';

@NgModule({
  declarations: [FilepickerDirective],
  imports: [
    CommonModule
  ],
  exports: [
    FilepickerDirective
  ]
})
export class FilepickerModule { }
