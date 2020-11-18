import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './confirm-modal.component';
import {ModalModule} from '../modal/modal.module';
import {Nl2brPipeModule} from '../../pipes/nl2br-pipe/nl2br-pipe.module';



@NgModule({
  declarations: [ConfirmModalComponent],
  imports: [
    CommonModule,
    ModalModule,
    Nl2brPipeModule
  ],
  exports: [
    ConfirmModalComponent,
  ],
})
export class ConfirmModalModule { }
