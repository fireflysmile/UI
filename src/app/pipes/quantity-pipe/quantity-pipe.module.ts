import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuantityPipe } from './quantity.pipe';



@NgModule({
  declarations: [QuantityPipe],
  exports: [
    QuantityPipe
  ],
  imports: [
    CommonModule
  ]
})
export class QuantityPipeModule { }
