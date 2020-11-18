import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyTaskPageComponent } from './my-task-page.component';

const routes: Routes = [{ path: '', component: MyTaskPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyTaskPageRoutingModule { }
