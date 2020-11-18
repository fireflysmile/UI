import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RulesFilterItemComponent } from './rules-filter-item.component';
import {IconsModule} from '../icons/icons.module';



@NgModule({
  declarations: [RulesFilterItemComponent],
  exports: [
    RulesFilterItemComponent
  ],
  imports: [
    CommonModule,
    IconsModule
  ]
})
export class RulesFilterItemModule { }
