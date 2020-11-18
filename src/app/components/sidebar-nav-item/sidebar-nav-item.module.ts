import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarNavItemComponent } from './sidebar-nav-item.component';
import {IconsModule} from '../icons/icons.module';



@NgModule({
  declarations: [SidebarNavItemComponent],
  exports: [
    SidebarNavItemComponent
  ],
  imports: [
    CommonModule,
    IconsModule
  ]
})
export class SidebarNavItemModule { }
