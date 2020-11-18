import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageContentComponent } from './page-content.component';



@NgModule({
  declarations: [PageContentComponent],
  exports: [
    PageContentComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PageContentModule { }
