import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableLayoutItemComponent } from './table-layout-item.component';
import {IconsModule} from '../icons/icons.module';



@NgModule({
  declarations: [TableLayoutItemComponent],
  exports: [
    TableLayoutItemComponent
  ],
  imports: [
    CommonModule,
    IconsModule
  ]
})
export class TableLayoutItemModule { }
