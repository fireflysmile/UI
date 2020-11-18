import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneNumberControlComponent } from './phone-number-control.component';
import {SelectModule} from '../select/select.module';
import {FormsModule} from '@angular/forms';
import {FormControlBaseModule} from '../form-control-base/form-control-base.module';
import {NgxMaskModule} from 'ngx-mask';

@NgModule({
  declarations: [PhoneNumberControlComponent],
  exports: [
    PhoneNumberControlComponent
  ],
  imports: [
    NgxMaskModule.forRoot(),
    CommonModule,
    SelectModule,
    FormsModule,
    FormControlBaseModule,
  ],
})
export class PhoneNumberControlModule { }
