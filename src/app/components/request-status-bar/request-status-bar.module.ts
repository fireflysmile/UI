import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestStatusBarComponent } from './request-status-bar.component';



@NgModule({
  declarations: [RequestStatusBarComponent],
  exports: [
    RequestStatusBarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RequestStatusBarModule { }
