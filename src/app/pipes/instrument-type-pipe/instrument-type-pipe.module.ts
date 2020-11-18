import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstrumentTypePipe } from './instrument-type.pipe';



@NgModule({
  declarations: [InstrumentTypePipe],
  exports: [
    InstrumentTypePipe
  ],
  imports: [
    CommonModule
  ]
})
export class InstrumentTypePipeModule { }
