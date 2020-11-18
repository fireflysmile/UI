import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { DocumentItem } from 'src/app/models/document-item';
import { FileService } from 'src/app/services/helpers/file.service';

@Component({
  selector: 'app-document-card',
  templateUrl: './document-card.component.html',
  styleUrls: ['./document-card.component.scss']
})
export class DocumentCardComponent implements OnInit {

  @Input() document: DocumentItem;
  @Output() addToReview = new EventEmitter<void>();
  public showPreviewModal: boolean;
  public documentSharedWithNames: string;

  constructor(private fileService: FileService) { }

  ngOnInit() {
    if (this.document.sharedWith && this.document.sharedWith.length) {
      this.documentSharedWithNames = this.document.sharedWith.map(p => p.name).join(', ');
    }
  }

  public download() {
    this.fileService.downloadFile(this.document.url, this.document.name);
  }

}
