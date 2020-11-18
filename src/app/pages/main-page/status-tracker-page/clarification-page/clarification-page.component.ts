import {Component, OnDestroy, OnInit} from '@angular/core';
import {SubscriptionService} from '../../../../services/subscription/subscription.service';
import {StatusTrackerService} from '../../../../services/components/status-tracker.service';
import {ApplicationReviewQueueItem} from '../../../../models/application-review-queue-item';
import {ApplicationService} from '../../../../services/api/application.service';
import {finalize} from 'rxjs/operators';
import {ModalService} from '../../../../components/modal/modal.service';
import {
  ClarificationReviewModalComponent,
} from '../../../../components/clarification-review-modal/clarification-review-modal.component';
import {
  ClarificationEditsModalComponent,
} from '../../../../components/clarification-edits-modal/clarification-edits-modal.component';

@Component({
  selector: 'app-clarification-page',
  templateUrl: './clarification-page.component.html',
  styleUrls: ['./clarification-page.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class ClarificationPageComponent implements OnInit, OnDestroy {
  // sending state
  sending = false;
  // clarifications
  clarifications: ApplicationReviewQueueItem[] = [];

  constructor(
    private modalService: ModalService,
    private applicationService: ApplicationService,
    private subscriptionService: SubscriptionService,
    private statusTrackerService: StatusTrackerService,
  ) { }

  ngOnInit(): void {
    this._getClarifications();
    this._subscribeClarifications();
  }

  ngOnDestroy(): void {
    // save changes
    this.statusTrackerService.clarifications = this.clarifications;
  }

  /**
   * return true when unsent items are selected
   */
  get enableSend(): boolean {
    return this.selectedClarifications.length > 0;
  }

  /**
   * return selected clarifications
   */
  get selectedClarifications(): ApplicationReviewQueueItem[] {
    return this.clarifications.filter(item => item.checked);
  }

  /**
   * return edited clarifications
   */
  get editedClarifications(): ApplicationReviewQueueItem[] {
    return this.clarifications.filter(item => item.isEdit);
  }

  /**
   * get clarifications
   */
  private _getClarifications(): void {
    if (!this.statusTrackerService.clarificationLoaded) {
      const sub = this.applicationService
        .getClarifications()
        .subscribe({
          next: res => this.statusTrackerService.clarifications = res,
        });

      this.subscriptionService.store('_getClarifications', sub);
    }
  }

  /**
   * subscribe clarifications
   */
  private _subscribeClarifications(): void {
    const sub = this.statusTrackerService
      .clarifications$
      .subscribe(clarifications => this.clarifications = clarifications);

    this.subscriptionService.store('_subscribeClarifications', sub);
  }

  /**
   * copy clarification item
   * @param item clarification item
   */
  copyClarification(item: ApplicationReviewQueueItem): void {
    item.copied = true;

    const index = this.clarifications.indexOf(item);

    this.clarifications.splice(index, 0, {
      ...item,
      lastUpdatedDate: null,
      response: { text: '', attachment: null },
      sentToMaker: false,
      checked: false,
      deletable: true,
      closed: false,
      origin: item,
      id: null,
    });
  }

  /**
   * delete clarification
   * @param item clarification item
   */
  deleteClarification(item: ApplicationReviewQueueItem): void {
    item.origin.copied = false;

    this.clarifications = this.clarifications.filter(clarification => clarification !== item);
  }

  /**
   * send clarifications to official
   */
  sendClarifications(): void {
    const clarifications = this.selectedClarifications;

    this.sending = true;

    const sub = this.applicationService
      .sendClarificationsToMaker(clarifications)
      .pipe(finalize(() => this.sending = false))
      .subscribe();

    this.subscriptionService.store('sendClarifications', sub);
  }


  /**
   * open clarification review
   */
  openClarificationReview(): void {
    this.modalService.open(ClarificationReviewModalComponent, {});
  }

  /**
   * open clarification edits
   */
  openClarificationEdits(): void {
    this.modalService.open(ClarificationEditsModalComponent, { });
  }
}
