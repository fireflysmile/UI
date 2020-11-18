import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestApplicationsComponent } from './request-applications.component';
import {RectCardModule} from '../rect-card/rect-card.module';
import {IconsModule} from '../icons/icons.module';
import {RequestApplicationCardModule} from '../request-application-card/request-application-card.module';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [RequestApplicationsComponent],
  exports: [
    RequestApplicationsComponent
  ],
  imports: [
    CommonModule,
    RectCardModule,
    IconsModule,
    RequestApplicationCardModule,
    RouterModule
  ]
})
export class RequestApplicationsModule { }
