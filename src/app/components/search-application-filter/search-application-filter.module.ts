import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchApplicationFilterComponent } from './search-application-filter.component';
import {RectCardModule} from '../rect-card/rect-card.module';
import {FormFieldModule} from '../form-field/form-field.module';
import {SelectModule} from '../select/select.module';
import {ReactiveFormsModule} from '@angular/forms';
import {PageActionsModule} from '../page-actions/page-actions.module';
import {YearSelectorModule} from '../year-selector/year-selector.module';



@NgModule({
  declarations: [SearchApplicationFilterComponent],
  exports: [
    SearchApplicationFilterComponent
  ],
  imports: [
    CommonModule,
    RectCardModule,
    FormFieldModule,
    SelectModule,
    ReactiveFormsModule,
    PageActionsModule,
    YearSelectorModule
  ]
})
export class SearchApplicationFilterModule { }
