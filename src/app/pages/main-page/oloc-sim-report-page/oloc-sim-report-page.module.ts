import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';

import { OlocSimReportPageRoutingModule } from './oloc-sim-report-page-routing.module';
import { OlocSimReportPageComponent } from './oloc-sim-report-page.component';
import {BackButtonModule} from '../../../components/back-button/back-button.module';
import {SearchApplicationFilterModule} from '../../../components/search-application-filter/search-application-filter.module';
import {SimReportTableModule} from '../../../components/sim-report-table/sim-report-table.module';
import {RectCardModule} from '../../../components/rect-card/rect-card.module';
import {FormFieldModule} from '../../../components/form-field/form-field.module';
import {SelectModule} from '../../../components/select/select.module';
import {ReactiveFormsModule} from '@angular/forms';
import {PageActionsModule} from '../../../components/page-actions/page-actions.module';
import {MonthSelectorModule} from '../../../components/month-selector/month-selector.module';
import {CardActionItemModule} from '../../../components/card-action-item/card-action-item.module';


@NgModule({
  declarations: [OlocSimReportPageComponent],
  imports: [
    CommonModule,
    OlocSimReportPageRoutingModule,
    BackButtonModule,
    SearchApplicationFilterModule,
    SimReportTableModule,
    RectCardModule,
    FormFieldModule,
    SelectModule,
    ReactiveFormsModule,
    PageActionsModule,
    MonthSelectorModule,
    FormsModule,

    CardActionItemModule,
  ]
})
export class OlocSimReportPageModule { }
