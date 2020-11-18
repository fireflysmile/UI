import {Component, OnDestroy, OnInit} from '@angular/core';
import {StatusStepItem} from '../../../components/status-stepper-item/status-stepper-item.component';
import {ApplicationService} from '../../../services/api/application.service';
import {SubscriptionService} from '../../../services/subscription/subscription.service';
import {StatusTrackerService} from '../../../services/components/status-tracker.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ApplicationTrackingDetail} from '../../../models/application-tracking-detail';

@Component({
  selector: 'app-status-tracker-page',
  templateUrl: './status-tracker-page.component.html',
  styleUrls: ['./status-tracker-page.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class StatusTrackerPageComponent implements OnInit, OnDestroy {
  // steps
  steps: StatusStepItem[] = [];
  // application id
  private _id: string;
  // detail
  private _detail: ApplicationTrackingDetail;
  // steps
  private _steps: {[k: string]: StatusStepItem} = {
    // submission
    submission: {
      icon: 'submission',
      label: 'Application Submitted',
      disabled: false,
      clickable: false,
      completed: true,
    },
    // under review
    underReview: {
      icon: 'search-doc',
      label: 'Under Review',
      disabled: false,
      clickable: true,
      completed: false,
    },
    // clarifications
    clarification: {
      icon: 'message',
      label: 'Clarifications',
      disabled: true,
      clickable: false,
      completed: false,
    },
    // approval
    approval: {
      icon: 'approval',
      label: 'Approval',
      disabled: true,
      clickable: false,
      completed: false,
    },
    // post implementation
    postImplementation: {
      icon: 'checks',
      label: 'Post Implementation',
      disabled: true,
      clickable: false,
      completed: false,
    },
  };
  // root path for status tracker page
  private readonly _rootPath = '/main/dashboard/status-tracker';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private applicationService: ApplicationService,
    private subscriptionService: SubscriptionService,
    private statusTrackerService: StatusTrackerService,
  ) {
    this.steps = [
      this._steps.submission,
      this._steps.underReview,
      this._steps.clarification,
      this._steps.approval,
      this._steps.postImplementation,
    ];
  }

  ngOnInit(): void {
    this._subscribeRouteParams();
  }

  ngOnDestroy(): void {
    this.statusTrackerService.clear();
  }

  /**
   * subscribe route params change
   */
  private _subscribeRouteParams(): void {
    const sub = this.activatedRoute
      .paramMap
      .subscribe(params => {
        this._id = params.get('id');
        this.statusTrackerService.applicationId = params.get('id');
        this._subscribeTrackingDetail();
      });

    this.subscriptionService.store('_subscribeRouteParams', sub);
  }

  /**
   * get application tracking detail
   */
  private _getApplicationTrackingDetail(): void {
    const sub = this.applicationService
      .getApplicationTrackingDetail()
      .subscribe({
        next: res => this.statusTrackerService.applicationTrackingDetail = res,
      });

    this.subscriptionService.store('_getApplicationTrackingDetail', sub);
  }

  /**
   * subscribe tracking detail
   */
  private _subscribeTrackingDetail(): void {
    const sub = this.statusTrackerService
      .applicationTrackingDetail$
      .subscribe(res => {
        this._detail = res;

        if (!this._detail) {
          this._getApplicationTrackingDetail();
        }

        this._setStepStatuses();
      });

    this.subscriptionService.store('_subscribeTrackingDetail', sub);
  }

  /**
   * navigate to specific step
   * @param step step item
   */
  onStepClick(step: StatusStepItem): void {
    switch (step.label) {
      case 'Application Submitted': {
        this.router.navigate([this._rootPath, this._id, 'submitted']);
        break;
      }

      case 'Under Review': {
        this.router.navigate([this._rootPath, this._id, 'under-review']);
        break;
      }

      case 'Clarifications': {
        this.router.navigate([this._rootPath, this._id, 'clarification']);
        break;
      }

      case 'Approval': {
        this.router.navigate([this._rootPath, this._id, 'approval']);
        break;
      }

      case 'Post Implementation': {
        this.router.navigate([this._rootPath, this._id, 'post-implementation']);
        break;
      }
    }
  }

  /**
   * set step statuses according to tracking detail
   */
  private _setStepStatuses(): void {
    if (!this._detail) {
      return;
    }
    this._steps.underReview.completed = this._detail.priorApprovalCompleted;

    this._steps.clarification.disabled = !this._detail.priorApprovalCompleted && !this._detail.clarificationRequired;
    this._steps.clarification.clickable = this._detail.priorApprovalCompleted || this._detail.clarificationRequired;
    this._steps.clarification.completed = this._detail.priorApprovalCompleted || this._detail.priorApprovalCompleted;

    this._steps.approval.disabled = !this._detail.priorApprovalCompleted;
    this._steps.approval.clickable = this._detail.priorApprovalCompleted;
    this._steps.approval.completed = this._detail.priorApprovalCompleted;

    this._steps.postImplementation.disabled = !this._detail.postImplementationSubmitted && !this._detail.postImplementationReady;
    this._steps.postImplementation.clickable = this._detail.postImplementationSubmitted || this._detail.postImplementationReady;
    this._steps.postImplementation.completed = this._detail.postImplementationSubmitted;
  }
}
