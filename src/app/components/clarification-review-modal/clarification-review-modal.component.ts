import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import { finalize } from 'rxjs/operators';
import {TS_MODAL_REF} from '../modal/models/ts-modal-options';
import {ApplicationService} from '../../services/api/application.service';
import {TsModalRef} from '../modal/models/ts-modal-ref';
import {ApplicationReviewQueueItem} from '../../models/application-review-queue-item';
import {createCSVString} from '../../utils/format.util';
import {TableColumn} from '../../models/table-column';
import {DatePipe, DOCUMENT} from '@angular/common';
import {downloadCSV} from '../../utils/other.utils';

export interface ClarificationReviewModalData {
  clarifications: ApplicationReviewQueueItem[];
}

@Component({
  selector: 'app-clarification-review-modal',
  templateUrl: './clarification-review-modal.component.html',
  styleUrls: ['./clarification-review-modal.component.scss']
})
export class ClarificationReviewModalComponent implements OnInit {
  // loading state
  loading = true;
  // clarifications
  clarifications: ApplicationReviewQueueItem[] = [];
  // date pipe
  private _datePipe: DatePipe = new DatePipe('en-US');

  constructor(
    @Inject(TS_MODAL_REF) public tsModalRef: TsModalRef<ClarificationReviewModalComponent>,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private applicationService: ApplicationService
  ) { }

  ngOnInit() {
    this._getCompletedClarifications();
  }

  private _getCompletedClarifications(): void {
    this.applicationService.getCompletedClarifications()
      .pipe(finalize(() => this.loading = false))
      .subscribe(res => this.clarifications = res);
  }

  /**
   * return downloadable clarifications
   */
  get downloadableClarifications(): ApplicationReviewQueueItem[] {
    return this.clarifications.map(item => ({
      ...item,
      receivedDate: this._datePipe.transform(item.comment.date, 'd/M/yyyy hh:mm a'),
      sentDate: this._datePipe.transform(item.response.date, 'd/M/yyyy hh:mm a'),
      closedDate: this._datePipe.transform(item.lastUpdatedDate, 'd/M/yyyy hh:mm a'),
      commentText: item.comment.text,
      responseText: item.response.text
    }));
  }

  /**
   * export to excel
   */
  exportToExcel(): void {
    const filename = `completed-review_${this._datePipe.transform(new Date(), 'yyyyMMddhhmmss')}.csv`;
    const csv = createCSVString([
      new TableColumn<any>('Review Section', 'section'),
      new TableColumn<any>('Comments', 'commentText'),
      new TableColumn<any>('Date of Clarifications Received', 'receivedDate'),
      new TableColumn<any>('Date of Response Sent', 'sentDate'),
      new TableColumn<any>('Date of Review Closed', 'closedDate'),
      new TableColumn<any>('Response from Member', 'responseText'),
    ], this.downloadableClarifications);

    downloadCSV(this.document, this.renderer, filename, csv);
  }
}
