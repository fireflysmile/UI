import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRequestPageRoutingModule } from './admin-request-page-routing.module';
import { AdminRequestPageComponent } from './admin-request-page.component';
import { AdminRequestTableModule } from '../../../components/admin-request-table/admin-request-table.module';
import { StartNewRequestModule } from '../../../components/start-new-request/start-new-request.module';


@NgModule({
  declarations: [AdminRequestPageComponent],
  imports: [
    CommonModule,
    AdminRequestPageRoutingModule,
    AdminRequestTableModule,
    StartNewRequestModule
  ]
})
export class AdminRequestPageModule { }
