import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Nl2brPipe } from './nl2br.pipe';



@NgModule({
  declarations: [Nl2brPipe],
  exports: [
    Nl2brPipe
  ],
  imports: [
    CommonModule
  ]
})
export class Nl2brPipeModule { }
