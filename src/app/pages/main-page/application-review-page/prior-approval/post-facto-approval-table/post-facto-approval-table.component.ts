import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

import { ApplicationPostFactoApproval } from 'src/app/models/application-post-facto-approval';

const STATUS = environment.applicationApprovalStatuses;

@Component({
  selector: 'app-post-facto-approval-table',
  templateUrl: './post-facto-approval-table.component.html',
  styleUrls: [
    '../../application-review-section-base/application-review-section-base.component.scss',
    './post-facto-approval-table.component.scss'
  ]
})
export class PostFactoApprovalTableComponent implements OnChanges {

  @Input() postFactoApproval: ApplicationPostFactoApproval;
  @Input() statusText: string;
  @Input() viewType: 'maker' | 'checker';
  @Input() completed: boolean;

  @Output() generateWarningLetter = new EventEmitter<void>();
  @Output() comment = new EventEmitter<string>();

  public warningCancellationReasonEditable: boolean;
  public hideReasonForCancellation: boolean;

  constructor() { }

  ngOnChanges() {
    if (this.viewType === 'maker') {
      this.warningCancellationReasonEditable = !this.completed
        && !this.postFactoApproval.status || this.postFactoApproval.status === STATUS.WITH_MAKER;
    }
  }

  public updateCheckerConfirmation() {
    if (this.viewType === 'maker') {
      this.postFactoApproval.checkerConfirmation = null;
    } else if (this.viewType === 'checker') {
      this.hideReasonForCancellation = true;
      if (this.postFactoApproval.checkerConfirmation === false) {
        this.postFactoApproval.checkerConfirmation = true;
      } else {
        this.postFactoApproval.checkerConfirmation = false;
      }
    }
  }

}
