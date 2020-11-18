import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegendsCircleComponent } from './legends-circle.component';



@NgModule({
  declarations: [LegendsCircleComponent],
  exports: [LegendsCircleComponent],
  imports: [
    CommonModule
  ]
})
export class LegendsCircleModule { }
