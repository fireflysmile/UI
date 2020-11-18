import { Component, OnInit } from '@angular/core';
import {StatusTrackerService} from '../../../../services/components/status-tracker.service';
import {SubscriptionService} from '../../../../services/subscription/subscription.service';
import {ApplicationService} from '../../../../services/api/application.service';
import {PriorApprovalDetail} from '../../../../models/prior-approval-detail';

@Component({
  selector: 'app-prior-approvals-page',
  templateUrl: './prior-approvals-page.component.html',
  styleUrls: ['./prior-approvals-page.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class PriorApprovalsPageComponent implements OnInit {
  // detail
  detail: PriorApprovalDetail;

  constructor(
    private applicationService: ApplicationService,
    private subscriptionService: SubscriptionService,
    private statusTrackerService: StatusTrackerService,
  ) { }

  ngOnInit(): void {
    this._getPriorApprovalDetail();
    this._subscribePriorApprovalDetail();
  }

  /**
   * get prior approval
   */
  private _getPriorApprovalDetail(): void {
    if (!this.statusTrackerService.approvalLoaded) {
      const sub = this.applicationService
        .getPriorApprovalDetail()
        .subscribe({
          next: res => this.statusTrackerService.approvalDetail = res,
        });

      this.subscriptionService.store('_getPriorApprovalDetail', sub);
    }
  }

  private _subscribePriorApprovalDetail(): void {
    const sub = this.statusTrackerService
      .approvalDetail$
      .subscribe(res => this.detail = res);

    this.subscriptionService.store('_subscribePriorApprovalDetail', sub);
  }
}
