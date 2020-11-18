import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LastMonthApplicationsComponent } from './last-month-applications.component';
import {RectCardModule} from '../rect-card/rect-card.module';
import {IconsModule} from '../icons/icons.module';



@NgModule({
  declarations: [LastMonthApplicationsComponent],
  exports: [
    LastMonthApplicationsComponent
  ],
  imports: [
    CommonModule,
    RectCardModule,
    IconsModule
  ]
})
export class LastMonthApplicationsModule { }
