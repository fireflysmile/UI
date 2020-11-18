import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';

import { OlocSearchApplicationPageRoutingModule } from './oloc-search-application-page-routing.module';
import { OlocSearchApplicationPageComponent } from './oloc-search-application-page.component';
import {BackButtonModule} from '../../../components/back-button/back-button.module';
import {SearchApplicationFilterModule} from '../../../components/search-application-filter/search-application-filter.module';
import {ApplicationTableModule} from '../../../components/application-table/application-table.module';
import {RectCardModule} from '../../../components/rect-card/rect-card.module';
import {FormFieldModule} from '../../../components/form-field/form-field.module';
import {SelectModule} from '../../../components/select/select.module';
import {ReactiveFormsModule} from '@angular/forms';
import {PageActionsModule} from '../../../components/page-actions/page-actions.module';
import {YearSelectorModule} from '../../../components/year-selector/year-selector.module';
import {DateInputModule} from '../../../components/date-input/date-input.module';
import {DateSelectorModule} from '../../../components/date-selector/date-selector.module';
import {DynamicFilterDatesModule} from '../../../components/dynamic-filter-dates/dynamic-filter-dates.module';
import {DynamicFilterModule} from '../../../components/dynamic-filter/dynamic-filter.module';
import {CardActionsModule} from '../../../components/card-actions/card-actions.module';
import {IconsModule} from '../../../components/icons/icons.module';


@NgModule({
  declarations: [OlocSearchApplicationPageComponent],
  imports: [
    CommonModule,
    OlocSearchApplicationPageRoutingModule,
    BackButtonModule,
    SearchApplicationFilterModule,
    ApplicationTableModule,
    RectCardModule,
    FormFieldModule,
    SelectModule,
    ReactiveFormsModule,
    PageActionsModule,
    YearSelectorModule,
    DateInputModule,
    DateSelectorModule,
    FormsModule,
    DynamicFilterDatesModule,
    DynamicFilterModule,
    CardActionsModule,
    IconsModule,
  ]
})
export class OlocSearchApplicationPageModule { }
