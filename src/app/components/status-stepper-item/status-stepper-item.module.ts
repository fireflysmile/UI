import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusStepperItemComponent } from './status-stepper-item.component';
import {IconsModule} from '../icons/icons.module';



@NgModule({
  declarations: [StatusStepperItemComponent],
  exports: [
    StatusStepperItemComponent
  ],
  imports: [
    CommonModule,
    IconsModule
  ]
})
export class StatusStepperItemModule { }
