import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinalApprovalComponent } from './final-approval.component';
import {RectCardModule} from '../rect-card/rect-card.module';
import {IconsModule} from '../icons/icons.module';



@NgModule({
  declarations: [FinalApprovalComponent],
  exports: [
    FinalApprovalComponent
  ],
  imports: [
    CommonModule,
    RectCardModule,
    IconsModule
  ]
})
export class FinalApprovalModule { }
