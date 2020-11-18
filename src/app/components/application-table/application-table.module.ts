import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationTableComponent } from './application-table.component';
import {RectCardModule} from '../rect-card/rect-card.module';
import {TablePageBaseModule} from '../../pages/main-page/table-page-base/table-page-base.module';



@NgModule({
  declarations: [ApplicationTableComponent],
  exports: [
    ApplicationTableComponent
  ],
  imports: [
    CommonModule,
    RectCardModule,
    TablePageBaseModule,
  ]
})
export class ApplicationTableModule { }
