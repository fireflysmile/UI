import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PositionFixerDirective } from './position-fixer.directive';



@NgModule({
  declarations: [PositionFixerDirective],
  exports: [
    PositionFixerDirective
  ],
  imports: [
    CommonModule
  ]
})
export class PositionFixerModule { }
