import {Component, OnInit} from '@angular/core';
import {ApplicationService} from '../../services/api/application.service';
import {SubscriptionService} from '../../services/subscription/subscription.service';
import {ApplicationDetailedSummary} from '../../models/application-detailed-summary';

@Component({
  selector: 'app-split-application-detailed-summary',
  templateUrl: './split-application-detailed-summary.component.html',
  styleUrls: ['./split-application-detailed-summary.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class SplitApplicationDetailedSummaryComponent implements OnInit {
  // detail summary
  summary: ApplicationDetailedSummary = {
    applicationUnderReview: {
      reviewPending: 0,
      inProgress: 0,
    },
    applicationCompleted: {
      finalApprovals: 0,
      postChecks: 0,
    },
  };
  // total values
  total = 0;

  constructor(
    private applicationService: ApplicationService,
    private subscriptionService: SubscriptionService,
  ) { }

  ngOnInit() {
    this._getDetailedSummaries();
  }

  /**
   * get detailed summaries for applications
   */
  private _getDetailedSummaries(): void {
    const sub = this.applicationService
      .getApplicationDetailedSummaries()
      .subscribe({
        next: res => {
          this.summary = res;
          this._calculateTotal();
        },
      });

    this.subscriptionService.store('_getDetailedSummaries', sub);
  }

  /**
   * calculate total count of applications
   */
  private _calculateTotal(): void {
    if (this.summary) {
      this.total = this.summary.applicationCompleted.finalApprovals
        + this.summary.applicationCompleted.postChecks
        + this.summary.applicationUnderReview.inProgress
        + this.summary.applicationUnderReview.reviewPending;
    }
  }
}
