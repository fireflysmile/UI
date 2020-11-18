import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostImplementationComponent } from './post-implementation.component';

const routes: Routes = [
  {
    path: '',
    component: PostImplementationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostImplementationRoutingModule { }
