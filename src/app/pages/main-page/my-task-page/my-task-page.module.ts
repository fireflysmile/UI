import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyTaskPageRoutingModule } from './my-task-page-routing.module';
import { MyTaskPageComponent } from './my-task-page.component';
import {TotalMyTaskModule} from '../../../components/total-my-task/total-my-task.module';
import {MyTaskCardModule} from '../../../components/my-task-card/my-task-card.module';
import {FinalApprovalModule} from '../../../components/final-approval/final-approval.module';
import {AssignedTaskTableModule} from '../../../components/assigned-task-table/assigned-task-table.module';
import {PageContentModule} from '../../../components/page-content/page-content.module';
import {OlocAssignedTaskTableModule} from '../../../components/oloc-assigned-task-table/oloc-assigned-task-table.module';
import {SplitApplicationCardModule} from '../../../components/split-application-card/split-application-card.module';


@NgModule({
  declarations: [MyTaskPageComponent],
  imports: [
    CommonModule,
    MyTaskPageRoutingModule,
    TotalMyTaskModule,
    MyTaskCardModule,
    FinalApprovalModule,
    AssignedTaskTableModule,
    PageContentModule,
    OlocAssignedTaskTableModule,
    SplitApplicationCardModule,
  ]
})
export class MyTaskPageModule { }
