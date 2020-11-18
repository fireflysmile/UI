import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFilterOptionsComponent } from './dynamic-filter-options.component';
import {CheckboxModule} from '../checkbox/checkbox.module';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [DynamicFilterOptionsComponent],
  exports: [
    DynamicFilterOptionsComponent,
  ],
  imports: [
    CommonModule,
    CheckboxModule,
    FormsModule
  ],
})
export class DynamicFilterOptionsModule { }
