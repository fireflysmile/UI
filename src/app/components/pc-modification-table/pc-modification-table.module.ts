import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PcModificationTableComponent } from './pc-modification-table.component';
import {TablePageBaseModule} from '../../pages/main-page/table-page-base/table-page-base.module';
import {FlatButtonModule} from '../flat-button/flat-button.module';
import {InlineButtonModule} from '../inline-button/inline-button.module';
import {IconsModule} from '../icons/icons.module';
import {ToggleFilterModule} from '../toggle-filter/toggle-filter.module';
import {FormsModule} from '@angular/forms';
import {RectCardModule} from '../rect-card/rect-card.module';
import {ModifyPcModalModule} from '../modify-pc-modal/modify-pc-modal.module';
import {FileUploadModalModule} from '../file-upload-modal/file-upload-modal.module';
import {PcUploadErrorModalModule} from '../pc-upload-error-modal/pc-upload-error-modal.module';
import {UploadPendingModalModule} from '../upload-pending-modal/upload-pending-modal.module';
import {PcDownloadErrorModalModule} from '../pc-download-error-modal/pc-download-error-modal.module';



@NgModule({
  declarations: [PcModificationTableComponent],
  exports: [
    PcModificationTableComponent
  ],
  imports: [
    CommonModule,
    TablePageBaseModule,
    FlatButtonModule,
    InlineButtonModule,
    IconsModule,
    ToggleFilterModule,
    FormsModule,
    RectCardModule,
    ModifyPcModalModule,
    FileUploadModalModule,
    UploadPendingModalModule,
    PcUploadErrorModalModule,
    PcDownloadErrorModalModule,
  ]
})
export class PcModificationTableModule { }
