import { Component, OnInit, Inject, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
import { DatePipe, DOCUMENT } from '@angular/common';
import { finalize } from 'rxjs/operators';

import { createCSVString } from 'src/app/utils/format.util';
import { downloadCSV } from 'src/app/utils/other.utils';
import { TableColumn } from 'src/app/models/table-column';
import { ApplicationReviewQueueItem } from 'src/app/models/application-review-queue-item';
import { ApplicationService } from 'src/app/services/api/application.service';

@Component({
  selector: 'app-completed-reviews',
  templateUrl: './completed-reviews.component.html',
  styleUrls: [
    '../../application-review-section-base/application-review-section-base.component.scss',
    './completed-reviews.component.scss'
  ]
})
export class CompletedReviewsComponent implements OnInit {

  constructor(
    private applicationService: ApplicationService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
  ) { }

  @Input() viewType: 'checker' | 'maker';
  @Input() approvalsCompleted: boolean;
  public loading = true;
  public completedReviews: ApplicationReviewQueueItem[];
  private _datePipe: DatePipe = new DatePipe('en-US');
  @Output() close = new EventEmitter<void>();
  @Output() followUp = new EventEmitter<ApplicationReviewQueueItem>();

  ngOnInit() {
    this.applicationService.getCompletedReviews()
      .pipe(finalize(() => this.loading = false))
      .subscribe(reviews => {
        this.completedReviews = reviews;
      });
  }

  /**
   * return downloadable clarifications
   */
  get downloadableClarifications(): ApplicationReviewQueueItem[] {
    return this.completedReviews.map(item => ({
      ...item,
      receivedDate: this._datePipe.transform(item.response.date, 'd/M/yyyy hh:mm a'),
      sentDate: this._datePipe.transform(item.comment.date, 'd/M/yyyy hh:mm a'),
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
      new TableColumn<any>('Date of Clarifications Sent', 'sentDate'),
      new TableColumn<any>('Date of Response Received', 'receivedDate'),
      new TableColumn<any>('Date of Review Closed', 'closedDate'),
      new TableColumn<any>('Response from Member', 'responseText'),
    ], this.downloadableClarifications);

    downloadCSV(this.document, this.renderer, filename, csv);
  }

}
