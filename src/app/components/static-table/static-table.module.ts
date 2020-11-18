import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaticTableComponent } from './static-table.component';
import { HeaderColumnDirective } from './columns/header-column.directive';
import { BodyColumnDirective } from './columns/body-column.directive';



@NgModule({
  declarations: [StaticTableComponent, HeaderColumnDirective, BodyColumnDirective],
  exports: [
    StaticTableComponent,
    HeaderColumnDirective,
    BodyColumnDirective
  ],
  imports: [
    CommonModule
  ]
})
export class StaticTableModule { }
