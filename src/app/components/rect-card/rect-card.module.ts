import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RectCardComponent } from './rect-card.component';
import { RectCardHeaderComponent } from './rect-card-header/rect-card-header.component';



@NgModule({
  declarations: [RectCardComponent, RectCardHeaderComponent],
  exports: [
    RectCardComponent,
    RectCardHeaderComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RectCardModule { }
