import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApplicationService} from '../../services/api/application.service';
import {SubscriptionService} from '../../services/subscription/subscription.service';
import {SplitApplicationSummary} from '../../models/split-application-summary';
import {environment} from '../../../environments/environment';

const {
  watchingInterval,
} = environment;

@Component({
  selector: 'app-split-applications',
  templateUrl: './split-applications.component.html',
  styleUrls: ['./split-applications.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class SplitApplicationsComponent implements OnInit, OnDestroy {
  // summary data
  summary: SplitApplicationSummary = {
    keyApprovals: {
      actionUnderReview: 0,
      applicationCompleted: 0,
    },
    mandatorySubmissions: {
      actionUnderReview: 0,
      applicationCompleted: 0,
    },
    otherCompliances: {
      actionUnderReview: 0,
      applicationCompleted: 0,
    },
  };
  // total count
  total = 0;
  // interval
  private _interval;

  constructor(
    private applicationService: ApplicationService,
    private subscriptionService: SubscriptionService,
  ) { }

  ngOnInit(): void {
    this._getSplitApplicationSummary();
    this._interval = setInterval(() => this._getSplitApplicationSummary(), watchingInterval);
  }

  ngOnDestroy(): void {
    clearInterval(this._interval);
  }

  /**
   * get summary data
   */
  private _getSplitApplicationSummary(): void {
    const sub = this.applicationService
      .getSplitApplicationSummary()
      .subscribe({
        next: res => {
          this.summary = res;
          this._setTotalCounts();
        },
      });

    this.subscriptionService.store('_getSplitApplicationSummary', sub);
  }

  /**
   * set total counts
   */
  private _setTotalCounts(): void {
    this.total = 0;

    Object.keys(this.summary).forEach(key => {
      this.total += this.summary[key].actionUnderReview;
      this.total += this.summary[key].applicationCompleted;
    });
  }
}
