import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadCardComponent } from './file-upload-card.component';
import {RectCardModule} from '../rect-card/rect-card.module';
import {IconsModule} from '../icons/icons.module';
import {ModalModule} from '../modal/modal.module';
import {PreviewPdfModule} from '../preview-pdf/preview-pdf.module';



@NgModule({
  declarations: [FileUploadCardComponent],
  exports: [
    FileUploadCardComponent
  ],
  imports: [
    CommonModule,
    RectCardModule,
    IconsModule,
    ModalModule,
    PreviewPdfModule
  ]
})
export class FileUploadCardModule { }
