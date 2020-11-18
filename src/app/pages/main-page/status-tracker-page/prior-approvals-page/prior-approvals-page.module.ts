import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PriorApprovalsPageRoutingModule } from './prior-approvals-page-routing.module';
import { PriorApprovalsPageComponent } from './prior-approvals-page.component';
import {RectCardModule} from '../../../../components/rect-card/rect-card.module';
import {StatusTrackerSubHeaderModule} from '../../../../components/status-tracker-sub-header/status-tracker-sub-header.module';
import {ApprovalColumnModule} from '../../../../components/approval-column/approval-column.module';
import {ApprovalStatusItemModule} from '../../../../components/approval-status-item/approval-status-item.module';
import {ApprovalDocumentItemModule} from '../../../../components/approval-document-item/approval-document-item.module';


@NgModule({
  declarations: [PriorApprovalsPageComponent],
  imports: [
    CommonModule,
    PriorApprovalsPageRoutingModule,
    RectCardModule,
    StatusTrackerSubHeaderModule,
    ApprovalColumnModule,
    ApprovalStatusItemModule,
    ApprovalDocumentItemModule
  ]
})
export class PriorApprovalsPageModule { }
