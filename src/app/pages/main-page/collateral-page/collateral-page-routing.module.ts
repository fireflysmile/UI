import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollateralPageComponent } from './collateral-page.component';
import { ExcessCollateralDetailsPageComponent } from './excess-collateral-details-page/excess-collateral-details-page.component';

const routes: Routes = [
  { path: '', component: CollateralPageComponent },
  { path: 'excess-collateral-details', component: ExcessCollateralDetailsPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollateralPageRoutingModule { }
