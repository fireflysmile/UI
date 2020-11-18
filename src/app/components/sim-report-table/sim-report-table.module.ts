import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimReportTableComponent } from './sim-report-table.component';
import {RectCardModule} from '../rect-card/rect-card.module';
import {TablePageBaseModule} from '../../pages/main-page/table-page-base/table-page-base.module';



@NgModule({
  declarations: [SimReportTableComponent],
  exports: [
    SimReportTableComponent
  ],
  imports: [
    CommonModule,
    RectCardModule,
    TablePageBaseModule,
  ]
})
export class SimReportTableModule { }
