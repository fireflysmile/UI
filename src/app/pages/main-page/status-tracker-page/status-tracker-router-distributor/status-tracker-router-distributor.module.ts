import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatusTrackerRouterDistributorRoutingModule } from './status-tracker-router-distributor-routing.module';
import { StatusTrackerRouterDistributorComponent } from './status-tracker-router-distributor.component';


@NgModule({
  declarations: [StatusTrackerRouterDistributorComponent],
  imports: [
    CommonModule,
    StatusTrackerRouterDistributorRoutingModule
  ]
})
export class StatusTrackerRouterDistributorModule { }
