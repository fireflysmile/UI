import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OlocAssignedTaskTableComponent } from './oloc-assigned-task-table.component';
import {RectCardModule} from '../rect-card/rect-card.module';
import {TablePageBaseModule} from '../../pages/main-page/table-page-base/table-page-base.module';



@NgModule({
  declarations: [OlocAssignedTaskTableComponent],
  exports: [
    OlocAssignedTaskTableComponent
  ],
  imports: [
    CommonModule,
    RectCardModule,
    TablePageBaseModule,
  ]
})
export class OlocAssignedTaskTableModule { }
