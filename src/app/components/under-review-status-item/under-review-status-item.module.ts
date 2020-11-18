import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnderReviewStatusItemComponent } from './under-review-status-item.component';
import {IconsModule} from '../icons/icons.module';
import {Nl2brPipeModule} from '../../pipes/nl2br-pipe/nl2br-pipe.module';



@NgModule({
  declarations: [UnderReviewStatusItemComponent],
  exports: [
    UnderReviewStatusItemComponent
  ],
  imports: [
    CommonModule,
    IconsModule,
    Nl2brPipeModule
  ]
})
export class UnderReviewStatusItemModule { }
