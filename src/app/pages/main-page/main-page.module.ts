import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPageRoutingModule } from './main-page-routing.module';
import { MainPageComponent } from './main-page.component';
import {SidebarModule} from '../../components/sidebar/sidebar.module';
import {HeaderModule} from '../../components/header/header.module';


@NgModule({
  declarations: [MainPageComponent],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    SidebarModule,
    HeaderModule
  ]
})
export class MainPageModule { }
