import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import {SidebarNavItemModule} from '../sidebar-nav-item/sidebar-nav-item.module';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [SidebarComponent],
  exports: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    SidebarNavItemModule,
    RouterModule
  ]
})
export class SidebarModule { }
