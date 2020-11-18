import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApplicationReviewQueueItem} from '../../models/application-review-queue-item';
import {AttachmentItem} from '../../models/attachment-item';

@Component({
  selector: 'app-application-clarification-table',
  templateUrl: './application-clarification-table.component.html',
  styleUrls: ['./application-clarification-table.component.scss']
})
export class ApplicationClarificationTableComponent implements OnInit {
  // data
  @Input() data: ApplicationReviewQueueItem[] = [];
  // copy clarification
  @Output() copyClarification: EventEmitter<ApplicationReviewQueueItem> = new EventEmitter();
  // delete clarification
  @Output() deleteClarification: EventEmitter<ApplicationReviewQueueItem> = new EventEmitter();
  // attachment viewer data
  viewerData: { attachment: AttachmentItem, action: 'upload' | 'download' };
  // attachment viewer showing state
  showAttachmentViewer = false;

  constructor() { }

  ngOnInit() {
  }

  /**
   * return true when data exists
   */
  get hasData(): boolean {
    return this.data.length > 0;
  }

  /**
   * return true when there are some unsent data
   */
  get canSelectAll(): boolean {
    return this.hasData && this.data.filter(item => !item.sentToMaker).length > 0;
  }

  /**
   * return true when all unsent data is selected
   */
  get selectAll(): boolean {
    return this.canSelectAll && this.data.filter(item => !item.sentToMaker).every(item => item.checked);
  }

  /**
   * set select all state to unsent data
   * @param state select state
   */
  set selectAll(state: boolean) {
    this.data.filter(item => !item.sentToMaker).forEach(item => item.checked = state);
  }

  /**
   * on view response attachment
   * show the view attachment modal, for the given attachment
   * @param attachment attachment to display
   * @param action action for viewer
   */
  openAttachmentViewer(attachment: AttachmentItem, action: 'upload' | 'download'): void {
    this.showAttachmentViewer = true;
    this.viewerData = {
      attachment,
      action,
    };
  }

  /**
   * upload response attachment
   * @param row clarification item
   * @param file uploaded file
   */
  uploadResponseAttachment(row: ApplicationReviewQueueItem, file: File): void {
    row.response.attachment = {
      name: file.name,
      url: '/assets/files/dummy.pdf',
    };
  }

  /**
   * update response attachment
   * @param file file to update
   */
  updateResponseAttachment(file: File): void {
    this.viewerData.attachment.name = file.name;
  }
}
