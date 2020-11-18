import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablePageBaseModule } from '../../pages/main-page/table-page-base/table-page-base.module';
import { AdminRequestTableComponent } from './admin-request-table.component';
import { RectCardModule } from '../rect-card/rect-card.module';


@NgModule({
  declarations: [AdminRequestTableComponent],
  exports: [
    AdminRequestTableComponent
  ],
  imports: [
    CommonModule,
    TablePageBaseModule,
    RectCardModule
  ]
})
export class AdminRequestTableModule { }
