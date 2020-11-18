import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HasErrorPipe } from './has-error.pipe';



@NgModule({
  declarations: [HasErrorPipe],
  imports: [
    CommonModule
  ]
})
export class HasErrorPipeModule { }
