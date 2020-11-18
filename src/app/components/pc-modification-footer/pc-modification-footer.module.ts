import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PcModificationFooterComponent } from './pc-modification-footer.component';
import {RectCardModule} from '../rect-card/rect-card.module';
import {IconsModule} from '../icons/icons.module';
import {SwitchModule} from '../switch/switch.module';
import {FormsModule} from '@angular/forms';
import {PcClientMapModalModule} from '../pc-client-map-modal/pc-client-map-modal.module';
import {FileUploadModalModule} from '../file-upload-modal/file-upload-modal.module';
import {UploadPendingModalModule} from '../upload-pending-modal/upload-pending-modal.module';
import {PcClientMapCompleteModalModule} from '../pc-client-map-complete-modal/pc-client-map-complete-modal.module';
import {PcClientMapErrorModalModule} from '../pc-client-map-error-modal/pc-client-map-error-modal.module';
import {AutoModificationConfirmModalModule} from '../auto-modification-confirm-modal/auto-modification-confirm-modal.module';



@NgModule({
  declarations: [PcModificationFooterComponent],
  exports: [
    PcModificationFooterComponent
  ],
  imports: [
    CommonModule,
    RectCardModule,
    IconsModule,
    SwitchModule,
    FormsModule,
    PcClientMapModalModule,
    FileUploadModalModule,
    UploadPendingModalModule,
    PcClientMapErrorModalModule,
    PcClientMapCompleteModalModule,
    AutoModificationConfirmModalModule,
  ]
})
export class PcModificationFooterModule { }
