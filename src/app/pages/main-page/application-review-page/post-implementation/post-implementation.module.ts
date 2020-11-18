import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostImplementationRoutingModule } from './post-implementation-routing.module';
import { PostImplementationComponent } from './post-implementation.component';

import { ApplicationReviewSectionBaseModule } from '../application-review-section-base/application-review-section-base.module';
import { WarningNoteModule } from 'src/app/components/warning-note/warning-note.module';
import { IconsModule } from 'src/app/components/icons/icons.module';
import { DateSelectorModule } from 'src/app/components/date-selector/date-selector.module';
import { PreviewPdfModule } from 'src/app/components/preview-pdf/preview-pdf.module';

import { ExtensionTableComponent } from './extension-table/extension-table.component';
import { InlineDocumentComponent } from './inline-document/inline-document.component';
import { DirTableComponent } from './dir-table/dir-table.component';
import { PostFactoAttentionAlertComponent } from './post-facto-attention-alert/post-facto-attention-alert.component';

@NgModule({
  declarations: [
    PostImplementationComponent,
    ExtensionTableComponent,
    InlineDocumentComponent,
    DirTableComponent,
    PostFactoAttentionAlertComponent
  ],
  imports: [
    CommonModule,
    PostImplementationRoutingModule,
    ApplicationReviewSectionBaseModule,
    WarningNoteModule,
    IconsModule,
    DateSelectorModule,
    PreviewPdfModule
  ]
})
export class PostImplementationModule { }
