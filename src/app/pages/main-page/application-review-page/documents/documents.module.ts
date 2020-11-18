import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationReviewSectionBaseModule } from '../application-review-section-base/application-review-section-base.module';
import { IconsModule } from 'src/app/components/icons/icons.module';
import { ModalModule } from 'src/app/components/modal/modal.module';
import { PreviewPdfModule } from 'src/app/components/preview-pdf/preview-pdf.module';

import { DocumentsRoutingModule } from './documents-routing.module';
import { DocumentsComponent } from './documents.component';
import { DocumentCardComponent } from './document-card/document-card.component';


@NgModule({
  declarations: [DocumentsComponent, DocumentCardComponent],
  imports: [
    CommonModule,
    DocumentsRoutingModule,
    ApplicationReviewSectionBaseModule,
    IconsModule,
    ModalModule,
    PreviewPdfModule
  ]
})
export class DocumentsModule { }
