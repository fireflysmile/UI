import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplitApplicationTableComponent } from './split-application-table.component';
import {TablePageBaseModule} from '../../pages/main-page/table-page-base/table-page-base.module';
import {RectCardModule} from '../rect-card/rect-card.module';
import {AssignModalModule} from '../assign-modal/assign-modal.module';



@NgModule({
  declarations: [SplitApplicationTableComponent],
  exports: [
    SplitApplicationTableComponent
  ],
  imports: [
    CommonModule,
    TablePageBaseModule,
    RectCardModule,
    AssignModalModule,
  ]
})
export class SplitApplicationTableModule { }
