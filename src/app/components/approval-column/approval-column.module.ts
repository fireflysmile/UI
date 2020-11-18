import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApprovalColumnComponent } from './approval-column.component';



@NgModule({
  declarations: [ApprovalColumnComponent],
  exports: [
    ApprovalColumnComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ApprovalColumnModule { }
