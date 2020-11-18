import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtrOverviewTableComponent } from './otr-overview-table.component';
import {RectCardModule} from '../rect-card/rect-card.module';
import {ToggleFilterModule} from '../toggle-filter/toggle-filter.module';
import {InlineButtonModule} from '../inline-button/inline-button.module';
import {IconsModule} from '../icons/icons.module';
import {FormsModule} from '@angular/forms';
import {FlatButtonModule} from '../flat-button/flat-button.module';
import {OtrAllocationModalModule} from '../otr-allocation-modal/otr-allocation-modal.module';
import {FileUploadModalModule} from '../file-upload-modal/file-upload-modal.module';
import {TablePageBaseModule} from '../../pages/main-page/table-page-base/table-page-base.module';
import {UploadPendingModalModule} from '../upload-pending-modal/upload-pending-modal.module';
import {OtrUploadErrorModalModule} from '../otr-upload-error-modal/otr-upload-error-modal.module';
import {OtrDownloadErrorModalModule} from '../otr-download-error-modal/otr-download-error-modal.module';
import {AllocationConfirmModalModule} from '../allocation-confirm-modal/allocation-confirm-modal.module';



@NgModule({
  declarations: [OtrOverviewTableComponent],
  exports: [
    OtrOverviewTableComponent
  ],
  imports: [
    CommonModule,
    TablePageBaseModule,
    RectCardModule,
    ToggleFilterModule,
    InlineButtonModule,
    IconsModule,
    FormsModule,
    FlatButtonModule,
    OtrAllocationModalModule,
    AllocationConfirmModalModule,
    FileUploadModalModule,
    UploadPendingModalModule,
    OtrUploadErrorModalModule,
    OtrDownloadErrorModalModule,
  ]
})
export class OtrOverviewTableModule { }
