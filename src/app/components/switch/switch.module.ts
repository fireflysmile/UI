import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwitchComponent } from './switch.component';
import {FormControlBaseModule} from '../form-control-base/form-control-base.module';



@NgModule({
  declarations: [SwitchComponent],
  exports: [
    SwitchComponent
  ],
  imports: [
    CommonModule,
    FormControlBaseModule,
  ]
})
export class SwitchModule { }
