import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchSelectComponent } from './search-select.component';
import {SelectModule} from '../select/select.module';
import {OptionComponent} from '../select/option/option.component';



@NgModule({
  declarations: [SearchSelectComponent],
  exports: [
    SearchSelectComponent,
    OptionComponent,
  ],
  imports: [
    CommonModule,
    SelectModule,
  ]
})
export class SearchSelectModule { }
