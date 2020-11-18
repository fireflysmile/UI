import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateInputComponent } from './date-input.component';
import {NgxMaskModule} from 'ngx-mask';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [DateInputComponent],
  exports: [
    DateInputComponent
  ],
  imports: [
    CommonModule,
    NgxMaskModule.forRoot(),
    FormsModule,
  ]
})
export class DateInputModule { }
