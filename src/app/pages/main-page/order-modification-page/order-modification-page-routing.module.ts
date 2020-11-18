import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderModificationPageComponent } from './order-modification-page.component';

const routes: Routes = [
  {
    path: '',
    component: OrderModificationPageComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'otr-allocation',
      },
      {
        path: 'otr-allocation',
        loadChildren: () => import('./otr-allocation-page/otr-allocation-page.module').then(m => m.OtrAllocationPageModule),
      },
      {
        path: 'pc-modification',
        loadChildren: () => import('./pc-modification-page/pc-modification-page.module').then(m => m.PcModificationPageModule),
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderModificationPageRoutingModule { }
