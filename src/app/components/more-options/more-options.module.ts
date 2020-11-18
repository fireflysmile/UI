import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoreOptionsComponent } from './more-options.component';
import { MoreOptionItemComponent } from './more-option-item/more-option-item.component';



@NgModule({
  declarations: [MoreOptionsComponent, MoreOptionItemComponent],
  imports: [
    CommonModule
  ],
  exports: [
    MoreOptionsComponent,
    MoreOptionItemComponent,
  ]
})
export class MoreOptionsModule { }
