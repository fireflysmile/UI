import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarificationEditsModalComponent } from './clarification-edits-modal.component';
import {ModalModule} from '../modal/modal.module';



@NgModule({
  declarations: [ClarificationEditsModalComponent],
  imports: [
    CommonModule,
    ModalModule
  ],
  exports: [
    ClarificationEditsModalComponent,
  ],
})
export class ClarificationEditsModalModule { }
