import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarificationReviewModalComponent } from './clarification-review-modal.component';
import {ModalModule} from '../modal/modal.module';
import {IconsModule} from '../icons/icons.module';



@NgModule({
  declarations: [ClarificationReviewModalComponent],
  imports: [
    CommonModule,
    ModalModule,
    IconsModule
  ],
  exports: [
    ClarificationReviewModalComponent,
  ],
})
export class ClarificationReviewModalModule { }
