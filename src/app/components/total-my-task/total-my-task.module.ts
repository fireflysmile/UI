import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TotalMyTaskComponent } from './total-my-task.component';
import {IconsModule} from '../icons/icons.module';
import {RectCardModule} from '../rect-card/rect-card.module';



@NgModule({
  declarations: [TotalMyTaskComponent],
  exports: [
    TotalMyTaskComponent
  ],
  imports: [
    CommonModule,
    IconsModule,
    RectCardModule
  ]
})
export class TotalMyTaskModule { }
