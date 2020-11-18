import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabRouterComponent } from './tab-router.component';
import { TabRouterItemComponent } from './tab-router-item/tab-router-item.component';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [TabRouterComponent, TabRouterItemComponent],
  exports: [
    TabRouterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class TabRouterModule { }
