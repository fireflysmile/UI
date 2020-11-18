import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationRequestPageRoutingModule } from './application-request-page-routing.module';
import { ApplicationRequestPageComponent } from './application-request-page.component';
import {TablePageBaseModule} from '../table-page-base/table-page-base.module';
import {ToggleFilterModule} from '../../../components/toggle-filter/toggle-filter.module';
import {FormsModule} from '@angular/forms';
import {BackButtonModule} from '../../../components/back-button/back-button.module';
import {RectCardModule} from '../../../components/rect-card/rect-card.module';


@NgModule({
  declarations: [ApplicationRequestPageComponent],
  imports: [
    CommonModule,
    ApplicationRequestPageRoutingModule,
    TablePageBaseModule,
    ToggleFilterModule,
    FormsModule,
    BackButtonModule,
    RectCardModule,
  ]
})
export class ApplicationRequestPageModule { }
