import { Component, OnInit, Input } from '@angular/core';

import { DocumentItem } from 'src/app/models/document-item';
import { FileService } from 'src/app/services/helpers/file.service';

@Component({
  selector: 'app-inline-document',
  templateUrl: './inline-document.component.html',
  styleUrls: ['./inline-document.component.scss']
})
export class InlineDocumentComponent implements OnInit {

  @Input() document: DocumentItem;
  public showPreview: boolean;

  constructor(private fileService: FileService) { }

  ngOnInit() {
  }

  public download() {
    this.fileService.downloadFile(this.document.url, this.document.name);
  }

}
