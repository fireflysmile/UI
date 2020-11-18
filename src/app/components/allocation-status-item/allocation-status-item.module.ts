import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllocationStatusItemComponent } from './allocation-status-item.component';



@NgModule({
  declarations: [AllocationStatusItemComponent],
  exports: [
    AllocationStatusItemComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AllocationStatusItemModule { }
