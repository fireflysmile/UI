import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthSelectorComponent } from './month-selector.component';
import {FormFieldModule} from '../form-field/form-field.module';
import {SelectModule} from '../select/select.module';
import {FormsModule} from '@angular/forms';
import {IconsModule} from '../icons/icons.module';
import {CardActionItemModule} from '../card-action-item/card-action-item.module';


@NgModule({
  declarations: [MonthSelectorComponent],
  exports: [
    MonthSelectorComponent
  ],
  imports: [
    CommonModule,
    FormFieldModule,
    SelectModule,
    FormsModule,
    IconsModule,
    CardActionItemModule
  ]
})
export class MonthSelectorModule { }
