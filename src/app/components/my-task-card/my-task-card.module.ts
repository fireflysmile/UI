import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyTaskCardComponent } from './my-task-card.component';
import {RectCardModule} from '../rect-card/rect-card.module';
import {IconsModule} from '../icons/icons.module';



@NgModule({
  declarations: [MyTaskCardComponent],
  exports: [
    MyTaskCardComponent
  ],
  imports: [
    CommonModule,
    RectCardModule,
    IconsModule
  ]
})
export class MyTaskCardModule { }
