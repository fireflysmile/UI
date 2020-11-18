import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtendedFormDirective } from './extended-form.directive';



@NgModule({
  declarations: [ExtendedFormDirective],
  exports: [
    ExtendedFormDirective
  ],
  imports: [
    CommonModule
  ]
})
export class ExtendedFormModule { }
