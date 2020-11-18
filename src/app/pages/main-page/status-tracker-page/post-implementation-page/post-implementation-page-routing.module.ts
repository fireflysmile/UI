import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostImplementationPageComponent } from './post-implementation-page.component';

const routes: Routes = [{ path: '', component: PostImplementationPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostImplementationPageRoutingModule { }
