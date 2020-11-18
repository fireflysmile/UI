import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApprovalDocumentItemComponent } from './approval-document-item.component';
import {IconsModule} from '../icons/icons.module';



@NgModule({
  declarations: [ApprovalDocumentItemComponent],
  exports: [
    ApprovalDocumentItemComponent
  ],
  imports: [
    CommonModule,
    IconsModule
  ]
})
export class ApprovalDocumentItemModule { }
