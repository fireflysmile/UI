import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TradeTableComponent } from './trade-table.component';

import {TablePageBaseModule} from 'src/app/pages/main-page/table-page-base/table-page-base.module';
import {RectCardModule} from 'src/app/components/rect-card/rect-card.module';

@NgModule({
  declarations: [TradeTableComponent],
  imports: [
    CommonModule,
    TablePageBaseModule,
    RectCardModule
  ],
  exports: [
    TradeTableComponent
  ]
})
export class TradeTableModule { }
