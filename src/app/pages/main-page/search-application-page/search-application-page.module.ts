import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchApplicationPageRoutingModule } from './search-application-page-routing.module';
import { SearchApplicationPageComponent } from './search-application-page.component';
import {BackButtonModule} from '../../../components/back-button/back-button.module';
import {SearchApplicationFilterModule} from '../../../components/search-application-filter/search-application-filter.module';
import {ApplicationTableModule} from '../../../components/application-table/application-table.module';


@NgModule({
  declarations: [SearchApplicationPageComponent],
  imports: [
    CommonModule,
    SearchApplicationPageRoutingModule,
    BackButtonModule,
    SearchApplicationFilterModule,
    ApplicationTableModule
  ]
})
export class SearchApplicationPageModule { }
