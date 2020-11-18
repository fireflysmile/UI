import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberApplicationTableComponent } from './member-application-table.component';
import {TablePageBaseModule} from '../../pages/main-page/table-page-base/table-page-base.module';
import {RectCardModule} from '../rect-card/rect-card.module';
import {ConfirmModalModule} from '../confirm-modal/confirm-modal.module';
import {AlertModalModule} from '../alert-modal/alert-modal.module';



@NgModule({
  declarations: [MemberApplicationTableComponent],
  exports: [
    MemberApplicationTableComponent
  ],
  imports: [
    CommonModule,
    TablePageBaseModule,
    RectCardModule,
    ConfirmModalModule,
    AlertModalModule,
  ]
})
export class MemberApplicationTableModule { }
