import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { PreviewPdfComponent } from './preview-pdf.component';

import { CardActionItemModule } from 'src/app/components/card-action-item/card-action-item.module';
import { IconsModule } from 'src/app/components/icons/icons.module';
import { FilepickerModule } from 'src/app/components/filepicker/filepicker.module';


@NgModule({
  declarations: [PreviewPdfComponent],
  imports: [
    CommonModule,
    PdfViewerModule,
    CardActionItemModule,
    IconsModule,
    FilepickerModule
  ],
  exports: [
    PreviewPdfComponent
  ]
})
export class PreviewPdfModule { }
