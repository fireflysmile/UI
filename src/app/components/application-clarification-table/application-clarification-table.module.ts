import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationClarificationTableComponent } from './application-clarification-table.component';
import {CheckboxModule} from '../checkbox/checkbox.module';
import {IconsModule} from '../icons/icons.module';
import {CardActionItemModule} from '../card-action-item/card-action-item.module';
import {FormsModule} from '@angular/forms';
import {ModalModule} from '../modal/modal.module';
import {PreviewPdfModule} from '../preview-pdf/preview-pdf.module';
import {FilepickerModule} from '../filepicker/filepicker.module';



@NgModule({
  declarations: [ApplicationClarificationTableComponent],
  exports: [
    ApplicationClarificationTableComponent
  ],
  imports: [
    CommonModule,
    CheckboxModule,
    IconsModule,
    CardActionItemModule,
    FormsModule,
    ModalModule,
    PreviewPdfModule,
    FilepickerModule
  ]
})
export class ApplicationClarificationTableModule { }
