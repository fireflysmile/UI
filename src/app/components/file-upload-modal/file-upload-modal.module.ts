import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadModalComponent } from './file-upload-modal.component';
import {ModalModule} from '../modal/modal.module';
import {StrokeButtonModule} from '../stroke-button/stroke-button.module';
import {FlatButtonModule} from '../flat-button/flat-button.module';



@NgModule({
  declarations: [FileUploadModalComponent],
  imports: [
    CommonModule,
    ModalModule,
    StrokeButtonModule,
    FlatButtonModule
  ],
  entryComponents: [
    FileUploadModalComponent,
  ],
  exports: [
    FileUploadModalComponent,
  ],
})
export class FileUploadModalModule { }
