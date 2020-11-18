import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApprovalStatusItemComponent } from './approval-status-item.component';



@NgModule({
  declarations: [ApprovalStatusItemComponent],
  exports: [
    ApprovalStatusItemComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ApprovalStatusItemModule { }
