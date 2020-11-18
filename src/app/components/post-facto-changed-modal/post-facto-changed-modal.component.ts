import {Component, Inject, OnInit} from '@angular/core';
import {TS_MODAL_REF} from '../modal/models/ts-modal-options';
import {TsModalRef} from '../modal/models/ts-modal-ref';
import {ApplicationService} from '../../services/api/application.service';
import {SubscriptionService} from '../../services/subscription/subscription.service';
import {ChangedPostFacto} from '../../models/changed-post-facto';

@Component({
  selector: 'app-post-facto-changed-modal',
  templateUrl: './post-facto-changed-modal.component.html',
  styleUrls: ['./post-facto-changed-modal.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class PostFactoChangedModalComponent implements OnInit {
  // changes
  changes: ChangedPostFacto[] = [];

  constructor(
    @Inject(TS_MODAL_REF) public tsModalRef: TsModalRef<PostFactoChangedModalComponent>,
    private applicationService: ApplicationService,
    private subscriptionService: SubscriptionService,
  ) { }

  ngOnInit() {
    this._getChangedPostFacto();
  }

  /**
   * get changed post facto
   */
  private _getChangedPostFacto(): void {
    const sub = this.applicationService
      .getChangedPostFacto()
      .subscribe({
        next: res => this.changes = res,
      });

    this.subscriptionService.store('_getChangedPostFacto', sub);
  }
}
