import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponsiveFilterBaseComponent } from './responsive-filter-base.component';



@NgModule({
  declarations: [ResponsiveFilterBaseComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ResponsiveFilterBaseComponent,
  ],
})
export class ResponsiveFilterBaseModule { }
