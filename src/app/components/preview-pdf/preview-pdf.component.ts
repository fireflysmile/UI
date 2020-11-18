import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';

import { FileService } from 'src/app/services/helpers/file.service';

@Component({
  selector: 'app-preview-pdf',
  templateUrl: './preview-pdf.component.html',
  styleUrls: ['./preview-pdf.component.scss']
})
export class PreviewPdfComponent implements OnChanges {

  @Input() url: string;
  @Input() name: string;
  @Input() title: string;
  @Input() action: 'upload' | 'download';
  @Output() upload = new EventEmitter<File>();
  @Output() close = new EventEmitter<void>();

  public src: string;
  public page = 1;
  public numPages: number;

  constructor(private fileService: FileService) { }

  ngOnChanges() {
    this.src = this.url;
  }

  public onLoad(pdfObj: PDFDocumentProxy) {
    this.page = 1;
    this.numPages = pdfObj.numPages;
  }

  public launch() {
    window.open(this.url, '_blank');
  }

  public download() {
    this.fileService.downloadFile(this.url, this.name);
  }

}
