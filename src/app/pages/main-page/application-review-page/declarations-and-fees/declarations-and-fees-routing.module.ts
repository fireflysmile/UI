import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeclarationsAndFeesComponent } from './declarations-and-fees.component';

const routes: Routes = [
  {
    path: '',
    component: DeclarationsAndFeesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeclarationsAndFeesRoutingModule { }
