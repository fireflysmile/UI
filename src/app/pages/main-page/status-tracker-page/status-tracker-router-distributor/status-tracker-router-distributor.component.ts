import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApplicationService} from '../../../../services/api/application.service';
import {SubscriptionService} from '../../../../services/subscription/subscription.service';
import {StatusTrackerService} from '../../../../services/components/status-tracker.service';
import {ApplicationTrackingDetail} from '../../../../models/application-tracking-detail';
import {combineLatest} from 'rxjs';
import {Location} from '@angular/common';

@Component({
  selector: 'app-status-tracker-router-distributor',
  templateUrl: './status-tracker-router-distributor.component.html',
  styleUrls: ['./status-tracker-router-distributor.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class StatusTrackerRouterDistributorComponent implements OnInit {
  // application id
  private _id: string;
  // detail
  private _detail: ApplicationTrackingDetail;
  // root path for status tracker page
  private readonly _rootPath = '/main/dashboard/status-tracker';

  constructor(
    @Inject(Location) private location: Location,
    private router: Router,
    private applicationService: ApplicationService,
    private subscriptionService: SubscriptionService,
    private statusTrackerService: StatusTrackerService,
  ) { }

  ngOnInit() {
    if (this.statusTrackerService.distributed) {
      this.location.back();
    } else {
      this._subscribeTrackingInfo();
    }
  }

  /**
   * subscribe application id and details
   */
  private _subscribeTrackingInfo(): void {
    const sub = combineLatest([
      this.statusTrackerService.applicationId$,
      this.statusTrackerService.applicationTrackingDetail$,
    ]).subscribe(res => {
      if (res[0]) {
        this._id = res[0];
      }

      if (res[1]) {
        this._detail = res[1];
        this._defineCurrentStep();
      }
    });

    this.subscriptionService.store('_subscribeTrackingInfo', sub);
  }

  /**
   * define current step when data fetched
   */
  private _defineCurrentStep(): void {
    if (this._detail.postImplementationReady) {
      this.router.navigate([this._rootPath, this._id, 'post-implementation'])
        .then(() => this.statusTrackerService.distributed = true);
    } else if (this._detail.priorApprovalCompleted) {
      this.router.navigate([this._rootPath, this._id, 'approval'])
        .then(() => this.statusTrackerService.distributed = true);
    } else if (this._detail.clarificationRequired) {
      this.router.navigate([this._rootPath, this._id, 'clarification'])
        .then(() => this.statusTrackerService.distributed = true);
    } else {
      this.router.navigate([this._rootPath, this._id, 'under-review'])
        .then(() => this.statusTrackerService.distributed = true);
    }
  }
}
