import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DivisionCardComponent } from './division-card.component';
import {RectCardModule} from '../rect-card/rect-card.module';
import {IconsModule} from '../icons/icons.module';
import {DividerModule} from '../divider/divider.module';



@NgModule({
  declarations: [DivisionCardComponent],
  exports: [
    DivisionCardComponent
  ],
  imports: [
    CommonModule,
    RectCardModule,
    IconsModule,
    DividerModule
  ]
})
export class DivisionCardModule { }
