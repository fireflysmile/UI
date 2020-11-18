import { Component, OnInit, Input } from '@angular/core';

import { AttachmentItem } from 'src/app/models/attachment-item';
import { FileService } from 'src/app/services/helpers/file.service';

@Component({
  selector: 'app-letter-attachment-cell',
  templateUrl: './letter-attachment-cell.component.html',
  styleUrls: ['./letter-attachment-cell.component.scss']
})
export class LetterAttachmentCellComponent implements OnInit {

  @Input() type: 'approval' | 'warning';
  @Input() attachment: AttachmentItem;

  public previewLetterModal: string;

  constructor(private fileService: FileService) { }

  ngOnInit() {
  }

  public downloadLetter() {
    this.fileService.downloadFile(
      this.attachment.url,
      this.attachment.name
    );
  }

  public previewLetter() {
    this.previewLetterModal = this.type === 'approval' ? 'View Approval Letter' : 'View Warning Letter';
  }

}
