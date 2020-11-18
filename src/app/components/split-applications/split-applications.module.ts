import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplitApplicationsComponent } from './split-applications.component';
import {RectCardModule} from '../rect-card/rect-card.module';
import {IconsModule} from '../icons/icons.module';
import {SplitApplicationCardModule} from '../split-application-card/split-application-card.module';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [SplitApplicationsComponent],
  exports: [
    SplitApplicationsComponent
  ],
  imports: [
    CommonModule,
    RectCardModule,
    IconsModule,
    SplitApplicationCardModule,
    RouterModule
  ]
})
export class SplitApplicationsModule { }
