import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableLayoutEditorComponent } from './table-layout-editor.component';
import {CardModule} from '../card/card.module';
import {CardActionsModule} from '../card-actions/card-actions.module';
import {TableLayoutItemModule} from '../table-layout-item/table-layout-item.module';


@NgModule({
  declarations: [TableLayoutEditorComponent],
  exports: [
    TableLayoutEditorComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    CardActionsModule,
    TableLayoutItemModule
  ]
})
export class TableLayoutEditorModule { }
