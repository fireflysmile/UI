import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardActionItemComponent } from './card-action-item.component';
import {IconsModule} from '../icons/icons.module';



@NgModule({
  declarations: [CardActionItemComponent],
  exports: [
    CardActionItemComponent
  ],
  imports: [
    CommonModule,
    IconsModule
  ]
})
export class CardActionItemModule { }
