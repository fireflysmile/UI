import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchApplicationPageComponent } from './search-application-page.component';

const routes: Routes = [{ path: '', component: SearchApplicationPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchApplicationPageRoutingModule { }
