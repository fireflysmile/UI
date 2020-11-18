import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageOutletComponent } from './message-outlet/message-outlet.component';
import { MessageItemComponent } from './message-item/message-item.component';
import {IconsModule} from '../icons/icons.module';
import {Nl2brPipeModule} from '../../pipes/nl2br-pipe/nl2br-pipe.module';



@NgModule({
  declarations: [MessageOutletComponent, MessageItemComponent],
  exports: [
    MessageOutletComponent
  ],
  imports: [
    CommonModule,
    IconsModule,
    Nl2brPipeModule,
  ],
})
export class MessageModule { }
