import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoSizeTextareaDirective } from './auto-size-textarea.directive';

@NgModule({
  declarations: [AutoSizeTextareaDirective],
  imports: [
    CommonModule
  ],
  exports: [
    AutoSizeTextareaDirective
  ]
})
export class AutoSizeTextareaModule { }
