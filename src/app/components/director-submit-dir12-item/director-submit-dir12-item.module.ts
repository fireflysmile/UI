import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectorSubmitDir12ItemComponent } from './director-submit-dir12-item.component';
import {IconsModule} from '../icons/icons.module';
import {ModalModule} from '../modal/modal.module';
import {PreviewPdfModule} from '../preview-pdf/preview-pdf.module';
import {ConfirmModalModule} from '../confirm-modal/confirm-modal.module';



@NgModule({
  declarations: [DirectorSubmitDir12ItemComponent],
  exports: [
    DirectorSubmitDir12ItemComponent
  ],
  imports: [
    CommonModule,
    IconsModule,
    ModalModule,
    PreviewPdfModule,
    ConfirmModalModule,
  ]
})
export class DirectorSubmitDir12ItemModule { }
