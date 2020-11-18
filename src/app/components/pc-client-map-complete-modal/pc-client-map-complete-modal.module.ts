import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PcClientMapCompleteModalComponent } from './pc-client-map-complete-modal.component';
import {ModalModule} from '../modal/modal.module';
import {FlatButtonModule} from '../flat-button/flat-button.module';



@NgModule({
  declarations: [PcClientMapCompleteModalComponent],
  imports: [
    CommonModule,
    ModalModule,
    FlatButtonModule
  ],
  entryComponents: [
    PcClientMapCompleteModalComponent,
  ],
  exports: [
    PcClientMapCompleteModalComponent,
  ],
})
export class PcClientMapCompleteModalModule { }
