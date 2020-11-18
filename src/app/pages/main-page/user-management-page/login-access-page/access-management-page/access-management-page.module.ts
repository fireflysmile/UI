import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccessManagementPageRoutingModule } from './access-management-page-routing.module';
import { AccessManagementPageComponent } from './access-management-page.component';
import {AccessManagementFilterModule} from '../../../../../components/access-management-filter/access-management-filter.module';
import {AccessManagementTableModule} from '../../../../../components/access-management-table/access-management-table.module';
import {FlatButtonModule} from '../../../../../components/flat-button/flat-button.module';


@NgModule({
  declarations: [AccessManagementPageComponent],
  imports: [
    CommonModule,
    AccessManagementPageRoutingModule,
    AccessManagementFilterModule,
    AccessManagementTableModule,
    FlatButtonModule,
  ]
})
export class AccessManagementPageModule { }
