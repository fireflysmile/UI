import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BackgroundCheckComponent } from './background-check.component';

const routes: Routes = [
  {
    path: '',
    component: BackgroundCheckComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackgroundCheckRoutingModule { }
