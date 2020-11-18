import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShorthandedNumberPipe } from './shorthanded-number.pipe';



@NgModule({
  declarations: [ShorthandedNumberPipe],
  exports: [
    ShorthandedNumberPipe
  ],
  imports: [
    CommonModule
  ]
})
export class ShorthandedNumberPipeModule { }
