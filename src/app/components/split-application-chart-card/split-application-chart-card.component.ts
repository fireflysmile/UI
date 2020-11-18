import { Component, OnInit } from '@angular/core';
import {ApplicationService} from '../../services/api/application.service';
import {SubscriptionService} from '../../services/subscription/subscription.service';
import {ApplicationDetailedSummary} from '../../models/application-detailed-summary';
import {DonutChartData} from '../donut-chart/donut-chart.component';

@Component({
  selector: 'app-split-application-chart-card',
  templateUrl: './split-application-chart-card.component.html',
  styleUrls: ['./split-application-chart-card.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class SplitApplicationChartCardComponent implements OnInit {
  // donut chart data
  data: DonutChartData[] = [];
  // summary
  private _summary: ApplicationDetailedSummary;

  constructor(
    private applicationService: ApplicationService,
    private subscriptionService: SubscriptionService,
  ) { }

  ngOnInit() {
    this._getDetailedSummaries();
  }

  /**
   * get detailed summaries
   */
  private _getDetailedSummaries(): void {
    const sub = this.applicationService
      .getApplicationDetailedSummaries()
      .subscribe({
        next: res => {
          this._summary = res;
          this._createChartData();
        },
      });

    this.subscriptionService.store('_getDetailedSummaries', sub);
  }

  /**
   * create chart data
   */
  private _createChartData(): void {
    if (this._summary) {
      this.data = [
        {
          label: 'Review Pending',
          value: this._summary.applicationUnderReview.reviewPending,
          color: '#76DED9',
        },
        {
          label: 'In-Progress',
          value: this._summary.applicationUnderReview.inProgress,
          color: '#0070D1',
        },
        {
          label: 'Post Checks',
          value: this._summary.applicationCompleted.postChecks,
          color: '#16325C',
        },
        {
          label: 'Final Approval',
          value: this._summary.applicationCompleted.finalApprovals,
          color: '#0DA69E',
        },
      ];
    }
  }
}
