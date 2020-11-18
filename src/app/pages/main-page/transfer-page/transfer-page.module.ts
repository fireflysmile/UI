import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransferPageRoutingModule } from './transfer-page-routing.module';
import { TransferPageComponent } from './transfer-page.component';
import {TablePageBaseModule} from '../table-page-base/table-page-base.module';
import {ToggleFilterModule} from '../../../components/toggle-filter/toggle-filter.module';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [TransferPageComponent],
  imports: [
    CommonModule,
    TransferPageRoutingModule,
    TablePageBaseModule,
    ToggleFilterModule,
    FormsModule,
  ]
})
export class TransferPageModule { }
