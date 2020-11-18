import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainGuard} from './guards/main.guard';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'landing',
  },
  {
    path: 'landing',
    loadChildren: () => import('./pages/landing/landing.module').then(m => m.LandingModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./pages/main-page/main-page.module').then(m => m.MainPageModule), canActivate: [MainGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
