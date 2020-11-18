import { Component, OnInit } from '@angular/core';
import {AppService} from '../../../services/components/app.service';
import {ApplicationService} from '../../../services/api/application.service';
import {SubscriptionService} from '../../../services/subscription/subscription.service';
import {SplitApplicationSummary} from '../../../models/split-application-summary';
import {environment} from '../../../../environments/environment';
import {ModalService} from '../../../components/modal/modal.service';
import {
  KcarStatusModalComponent,
} from '../../../components/kcar-status-modal/kcar-status-modal.component';

const {
  watchingInterval,
} = environment;

@Component({
  selector: 'app-oloc-dashboard-page',
  templateUrl: './oloc-dashboard-page.component.html',
  styleUrls: ['./oloc-dashboard-page.component.scss']
})
export class OlocDashboardPageComponent implements OnInit {
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
  // interval
  private _interval;

  constructor(
    public appService: AppService,
    private applicationService: ApplicationService,
    private subscriptionService: SubscriptionService,
    private modalService: ModalService,
  ) { }

  ngOnInit() {
    this._getOlocApplicationSummary();
    this._interval = setInterval(() => this._getOlocApplicationSummary(), watchingInterval);
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
        },
      });

    this.subscriptionService.store('_getOlocApplicationSummary', sub);
  }

  /**
   * open clarification review
   */
  openClarificationReview(): void {
    this.modalService.open(KcarStatusModalComponent, {});
  }

}
