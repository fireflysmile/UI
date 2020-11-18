import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplitApplicationCardComponent } from './split-application-card.component';
import {RectCardModule} from '../rect-card/rect-card.module';
import {IconsModule} from '../icons/icons.module';
import {DividerModule} from '../divider/divider.module';
import {Nl2brPipeModule} from '../../pipes/nl2br-pipe/nl2br-pipe.module';



@NgModule({
  declarations: [SplitApplicationCardComponent],
  exports: [
    SplitApplicationCardComponent
  ],
  imports: [
    CommonModule,
    RectCardModule,
    IconsModule,
    DividerModule,
    Nl2brPipeModule
  ]
})
export class SplitApplicationCardModule { }
