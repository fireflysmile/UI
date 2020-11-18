import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatusTrackerPageRoutingModule } from './status-tracker-page-routing.module';
import { StatusTrackerPageComponent } from './status-tracker-page.component';
import {BackButtonModule} from '../../../components/back-button/back-button.module';
import {IconsModule} from '../../../components/icons/icons.module';
import {StatusStepperModule} from '../../../components/status-stepper/status-stepper.module';


@NgModule({
  declarations: [StatusTrackerPageComponent],
  imports: [
    CommonModule,
    StatusTrackerPageRoutingModule,
    BackButtonModule,
    IconsModule,
    StatusStepperModule
  ]
})
export class StatusTrackerPageModule { }
