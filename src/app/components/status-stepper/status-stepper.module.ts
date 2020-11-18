import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusStepperComponent } from './status-stepper.component';
import {StatusStepperItemModule} from '../status-stepper-item/status-stepper-item.module';



@NgModule({
  declarations: [StatusStepperComponent],
  exports: [
    StatusStepperComponent
  ],
  imports: [
    CommonModule,
    StatusStepperItemModule
  ]
})
export class StatusStepperModule { }
