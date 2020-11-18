import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestApplicationSmallCardComponent } from './request-application-small-card.component';
import {RectCardModule} from '../rect-card/rect-card.module';
import {IconsModule} from '../icons/icons.module';
import {DividerModule} from '../divider/divider.module';
import {Nl2brPipeModule} from '../../pipes/nl2br-pipe/nl2br-pipe.module';



@NgModule({
  declarations: [RequestApplicationSmallCardComponent],
  exports: [
    RequestApplicationSmallCardComponent
  ],
  imports: [
    CommonModule,
    RectCardModule,
    IconsModule,
    DividerModule,
    Nl2brPipeModule
  ]
})
export class RequestApplicationSmallCardModule { }
