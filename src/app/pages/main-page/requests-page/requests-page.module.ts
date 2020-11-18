import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestsPageRoutingModule } from './requests-page-routing.module';
import { RequestsPageComponent } from './requests-page.component';
import {TablePageBaseModule} from '../table-page-base/table-page-base.module';


@NgModule({
  declarations: [RequestsPageComponent],
  imports: [
    CommonModule,
    RequestsPageRoutingModule,
    TablePageBaseModule,
  ]
})
export class RequestsPageModule { }
