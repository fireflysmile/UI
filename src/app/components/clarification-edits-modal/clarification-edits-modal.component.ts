import {Component, Inject, OnInit} from '@angular/core';
import { finalize } from 'rxjs/operators';
import {ApplicationService} from '../../services/api/application.service';
import {SubscriptionService} from '../../services/subscription/subscription.service';
import {TS_MODAL_DATA, TS_MODAL_REF} from '../modal/models/ts-modal-options';
import {TsModalRef} from '../modal/models/ts-modal-ref';
import {ApplicationReviewQueueItem} from '../../models/application-review-queue-item';
import {ApplicationEditsItem} from '../../models/application-edits-item';

@Component({
  selector: 'app-clarification-edits-modal',
  templateUrl: './clarification-edits-modal.component.html',
  styleUrls: ['./clarification-edits-modal.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class ClarificationEditsModalComponent implements OnInit {
  public loading = true;
  // edits
  edits: ApplicationEditsItem[] = [];

  constructor(
    @Inject(TS_MODAL_REF) public tsModalRef: TsModalRef<ClarificationEditsModalComponent>,
    private applicationService: ApplicationService,
    private subscriptionService: SubscriptionService,
  ) { }

  ngOnInit(): void {
    this._getEditsHistory();
  }

  /**
   * get edits history
   */
  private _getEditsHistory(): void {
    const sub = this.applicationService
      .getApplicationEdits()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: res => this.edits = res,
      });

    this.subscriptionService.store('_getEditsHistory', sub);
  }
}
