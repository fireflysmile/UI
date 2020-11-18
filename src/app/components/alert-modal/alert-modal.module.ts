import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModalComponent } from './alert-modal.component';
import {ModalModule} from '../modal/modal.module';
import {Nl2brPipeModule} from '../../pipes/nl2br-pipe/nl2br-pipe.module';



@NgModule({
  declarations: [AlertModalComponent],
  imports: [
    CommonModule,
    ModalModule,
    Nl2brPipeModule
  ],
  exports: [
    AlertModalComponent,
  ],
})
export class AlertModalModule { }
