import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PcModificationPageComponent } from './pc-modification-page.component';

const routes: Routes = [{ path: '', component: PcModificationPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PcModificationPageRoutingModule { }
