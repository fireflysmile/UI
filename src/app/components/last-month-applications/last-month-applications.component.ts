import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApplicationService} from '../../services/api/application.service';
import {SubscriptionService} from '../../services/subscription/subscription.service';
import {ApplicationSummary} from '../../models/application-summary';
import {environment} from '../../../environments/environment';

const {
  watchingInterval,
} = environment;

@Component({
  selector: 'app-last-month-applications',
  templateUrl: './last-month-applications.component.html',
  styleUrls: ['./last-month-applications.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class LastMonthApplicationsComponent implements OnInit, OnDestroy {
  // current date
  now: Date = new Date();
  // before 30 days
  before30d: Date = new Date();
  // date format
  dateFormat = 'd/M/yy';
  // summary
  summary: ApplicationSummary = {
    actionUnderReview: 0,
    applicationCompleted: 0,
  };
  // interval
  private _interval;

  constructor(
    private applicationService: ApplicationService,
    private subscriptionService: SubscriptionService,
  ) {
    this.before30d.setDate(this.now.getDate() - 29);
  }

  ngOnInit(): void {
    this._getSummaries();
    this._interval = setInterval(() => this._getSummaries(), watchingInterval);
  }

  ngOnDestroy(): void {
    clearInterval(this._interval);
  }

  /**
   * get last 30d applications summary
   */
  private _getSummaries(): void {
    const sub = this.applicationService
      .getLastMonthlyApplications()
      .subscribe({
        next: res => this.summary = res,
      });

    this.subscriptionService.store('_getSummaries', sub);
  }
}
