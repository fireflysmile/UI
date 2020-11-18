import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OlocSimReportPageComponent } from './oloc-sim-report-page.component';

const routes: Routes = [{ path: '', component: OlocSimReportPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OlocSimReportPageRoutingModule { }
