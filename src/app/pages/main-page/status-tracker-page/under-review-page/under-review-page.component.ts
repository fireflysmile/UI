import { Component, OnInit } from '@angular/core';
import {SubscriptionService} from '../../../../services/subscription/subscription.service';
import {StatusTrackerService} from '../../../../services/components/status-tracker.service';
import {ApplicationService} from '../../../../services/api/application.service';
import {UnderReviewDetail} from '../../../../models/under-review-detail';

export type UnderReviewItemStatus = 'pending' | 'completed' | 'disabled';

@Component({
  selector: 'app-under-review-page',
  templateUrl: './under-review-page.component.html',
  styleUrls: ['./under-review-page.component.scss']
})
export class UnderReviewPageComponent implements OnInit {
  // detail
  detail: UnderReviewDetail;
  // pending item status
  pendingStatus: UnderReviewItemStatus;
  // review item status
  reviewStatus: UnderReviewItemStatus;

  constructor(
    private applicationService: ApplicationService,
    private subscriptionService: SubscriptionService,
    private statusTrackerService: StatusTrackerService,
  ) { }

  ngOnInit() {
    this._getUnderReviewDetail();
    this._subscribeTrackingDetails();
  }

  /**
   * get under review detail
   */
  private _getUnderReviewDetail(): void {
    if (!this.statusTrackerService.underReviewLoaded) {
      const sub = this.applicationService
        .getUnderReviewDetail()
        .subscribe({
          next: res => this.statusTrackerService.underReviewDetail = res,
        });

      this.subscriptionService.store('_getUnderReviewDetail', sub);
    }
  }

  /**
   * subscribe tracking details
   */
  private _subscribeTrackingDetails(): void {
    const sub = this.statusTrackerService
      .underReviewDetail$
      .subscribe(res => {
        this.detail = res;

        if (res) {
          this._setItemStatuses();
        }
      });

    this.subscriptionService.store('_subscribeTrackingDetails', sub);
  }

  /**
   * set item statuses
   */
  private _setItemStatuses(): void {
    this._setPendingStatus();
    this._setReviewStatus();
  }

  /**
   * set pending item status
   */
  private _setPendingStatus(): void {
    if (this.detail.applicationSubmissionCompleted && !this.detail.officialAssigned) {
      this.pendingStatus = 'pending';
    } else if (this.detail.applicationSubmissionCompleted && this.detail.officialAssigned) {
      this.pendingStatus = 'completed';
    } else {
      this.pendingStatus = 'disabled';
    }
  }

  /**
   * set review item status
   */
  private _setReviewStatus(): void {
    switch (this.pendingStatus) {
      case 'completed': {
        if (this.detail.reviewOpened && this.detail.reviewClosed) {
          this.reviewStatus = 'completed';
        } else {
          this.reviewStatus = 'pending';
        }

        break;
      }

      default: {
        this.reviewStatus = 'disabled';
      }
    }
  }
}
