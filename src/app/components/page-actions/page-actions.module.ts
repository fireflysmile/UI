import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageActionsComponent } from './page-actions.component';



@NgModule({
  declarations: [PageActionsComponent],
  exports: [
    PageActionsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PageActionsModule { }
