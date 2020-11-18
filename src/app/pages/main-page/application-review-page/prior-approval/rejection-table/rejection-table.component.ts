import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

const STATUS = environment.applicationApprovalStatuses;

@Component({
  selector: 'app-rejection-table',
  templateUrl: './rejection-table.component.html',
  styleUrls: [
    '../../application-review-section-base/application-review-section-base.component.scss',
    './rejection-table.component.scss'
  ]
})
export class RejectionTableComponent implements OnChanges {

  @Input() approval: {
    status: string;
    rejectionReason: string;
    comments: any[];
  };
  @Input() statusText: string;
  @Input() viewType: 'maker' | 'checker';
  @Input() completed: boolean;

  @Output() comment = new EventEmitter<string>();

  public editable: boolean;

  constructor() { }

  ngOnChanges() {
    if (this.viewType === 'maker') {
      this.editable = !this.completed && !this.approval.status || this.approval.status === STATUS.WITH_MAKER;
    } else if (this.viewType === 'checker') {
      this.editable = !this.completed;
    }
  }

}
