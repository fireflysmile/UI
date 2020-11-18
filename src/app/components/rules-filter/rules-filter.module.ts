import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RulesFilterComponent } from './rules-filter.component';
import {RulesFilterItemModule} from '../rules-filter-item/rules-filter-item.module';
import {DividerModule} from '../divider/divider.module';



@NgModule({
  declarations: [RulesFilterComponent],
  exports: [
    RulesFilterComponent
  ],
  imports: [
    CommonModule,
    RulesFilterItemModule,
    DividerModule
  ]
})
export class RulesFilterModule { }
