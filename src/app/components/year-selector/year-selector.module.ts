import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YearSelectorComponent } from './year-selector.component';
import {FormFieldModule} from '../form-field/form-field.module';
import {SelectModule} from '../select/select.module';
import {FormsModule} from '@angular/forms';
import {IconsModule} from '../icons/icons.module';



@NgModule({
  declarations: [YearSelectorComponent],
  exports: [
    YearSelectorComponent
  ],
  imports: [
    CommonModule,
    FormFieldModule,
    SelectModule,
    FormsModule,
    IconsModule
  ]
})
export class YearSelectorModule { }
