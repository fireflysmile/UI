import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicationRequestPageComponent } from './application-request-page.component';

const routes: Routes = [{ path: '', component: ApplicationRequestPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRequestPageRoutingModule { }
