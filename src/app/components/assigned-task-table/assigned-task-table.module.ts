import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignedTaskTableComponent } from './assigned-task-table.component';
import {RectCardModule} from '../rect-card/rect-card.module';
import {TablePageBaseModule} from '../../pages/main-page/table-page-base/table-page-base.module';



@NgModule({
  declarations: [AssignedTaskTableComponent],
  exports: [
    AssignedTaskTableComponent
  ],
  imports: [
    CommonModule,
    RectCardModule,
    TablePageBaseModule,
  ]
})
export class AssignedTaskTableModule { }
