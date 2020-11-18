import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApplicationService} from '../../services/api/application.service';
import {SubscriptionService} from '../../services/subscription/subscription.service';
import {SplitApplicationSummary} from '../../models/split-application-summary';
import {environment} from '../../../environments/environment';

const {
  watchingInterval,
} = environment;

@Component({
  selector: 'app-request-applications',
  templateUrl: './request-applications.component.html',
  styleUrls: ['./request-applications.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class RequestApplicationsComponent implements OnInit, OnDestroy {
  // current date
  now: Date = new Date();

  // summary data
  summary: SplitApplicationSummary = {
    keyApprovals: {
      actionUnderReview: 0,
      applicationCompleted: 0,
      applicationProgress: 0,
    },
    mandatorySubmissions: {
      actionUnderReview: 0,
      applicationCompleted: 0,
      applicationProgress: 0
    },
    otherCompliances: {
      actionUnderReview: 0,
      applicationCompleted: 0,
      applicationProgress: 0
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
    this._getOlocApplicationSummary();
    this._interval = setInterval(() => this._getOlocApplicationSummary(), watchingInterval);
  }

  ngOnDestroy(): void {
    clearInterval(this._interval);
  }

  /**
   * get summary data
   */
  private _getOlocApplicationSummary(): void {
    const sub = this.applicationService
      .getOlocApplicationSummary()
      .subscribe({
        next: res => {
          this.summary = res;
          this._setTotalCounts();
        },
      });

    this.subscriptionService.store('_getOlocApplicationSummary', sub);
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
