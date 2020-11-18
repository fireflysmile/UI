import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PcClientMapErrorModalComponent } from './pc-client-map-error-modal.component';
import {ModalModule} from '../modal/modal.module';
import {FlatButtonModule} from '../flat-button/flat-button.module';



@NgModule({
  declarations: [PcClientMapErrorModalComponent],
  imports: [
    CommonModule,
    ModalModule,
    FlatButtonModule
  ],
  exports: [
    PcClientMapErrorModalComponent,
  ],
  entryComponents: [
    PcClientMapErrorModalComponent,
  ],
})
export class PcClientMapErrorModalModule { }
