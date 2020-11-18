import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from './checkbox.component';
import { CheckboxGroupComponent } from './checkbox-group/checkbox-group.component';
import {FormControlBaseModule} from '../form-control-base/form-control-base.module';



@NgModule({
  declarations: [CheckboxComponent, CheckboxGroupComponent],
  exports: [
    CheckboxComponent,
    CheckboxGroupComponent
  ],
  imports: [
    CommonModule,
    FormControlBaseModule,
  ]
})
export class CheckboxModule { }
