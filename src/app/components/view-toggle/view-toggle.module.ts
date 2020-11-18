import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewToggleComponent } from './view-toggle.component';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [ViewToggleComponent],
  exports: [
    ViewToggleComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ViewToggleModule { }
