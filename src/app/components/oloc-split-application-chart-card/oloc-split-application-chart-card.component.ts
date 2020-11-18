import { Component, OnInit } from '@angular/core';
import {ApplicationService} from '../../services/api/application.service';
import {SubscriptionService} from '../../services/subscription/subscription.service';
// import {ApplicationDetailedSummary} from '../../models/application-detailed-summary';
import {SplitApplicationSummary} from '../../models/split-application-summary';
import {HalfDonutChartData} from '../half-donut-chart/half-donut-chart.component';

@Component({
  selector: 'app-oloc-split-application-chart-card',
  templateUrl: './oloc-split-application-chart-card.component.html',
  styleUrls: ['./oloc-split-application-chart-card.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class OlocSplitApplicationChartCardComponent implements OnInit {
  // half donut chart data
  data: HalfDonutChartData[] = [];
  // total value
  total = 300;

  // summary data
  private _summary: SplitApplicationSummary = {
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

  constructor(
    private applicationService: ApplicationService,
    private subscriptionService: SubscriptionService,
  ) { }

  ngOnInit() {
    this._getOlocSplitApplicationSummary();
  }

  /**
   * get summary data
   */
  private _getOlocSplitApplicationSummary(): void {
    const sub = this.applicationService
      .getOlocSplitApplicationSummary()
      .subscribe({
        next: res => {
          this._summary = res;
          this._createChartData();
        },
      });

    this.subscriptionService.store('_getOlocSplitApplicationSummary', sub);
  }

  /**
   * create chart data
   */
  private _createChartData(): void {
    if (this._summary) {
      this.data = [
        {
          label: 'First item right',
          status: 'App Completed',
          value: this._summary.otherCompliances.actionUnderReview,
          color: '#1172ce',
          isLine: false,
        },
        {
          label: 'Target STP',
          status: 'Applications',
          value: this._summary.otherCompliances.applicationProgress,
          color: '#f9b72e',
          isLine: true,
        },
        {
          label: 'Not first time right',
          status: 'App Rejected',
          value: this._summary.otherCompliances.applicationCompleted,
          color: '#62b5fc',
          isLine: false
        },
      ];
      this.total = this._summary.otherCompliances.actionUnderReview + this._summary.otherCompliances.applicationCompleted;
    }
  }
}
