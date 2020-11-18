import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestStatusComponent } from './request-status.component';



@NgModule({
  declarations: [RequestStatusComponent],
  exports: [
    RequestStatusComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RequestStatusModule { }
