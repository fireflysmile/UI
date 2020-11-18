import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestApplicationCardComponent } from './request-application-card.component';
import {RectCardModule} from '../rect-card/rect-card.module';
import {IconsModule} from '../icons/icons.module';
import {DividerModule} from '../divider/divider.module';
import {Nl2brPipeModule} from '../../pipes/nl2br-pipe/nl2br-pipe.module';



@NgModule({
  declarations: [RequestApplicationCardComponent],
  exports: [
    RequestApplicationCardComponent
  ],
  imports: [
    CommonModule,
    RectCardModule,
    IconsModule,
    DividerModule,
    Nl2brPipeModule
  ]
})
export class RequestApplicationCardModule { }
