import {Component, Inject, OnInit} from '@angular/core';
import { finalize } from 'rxjs/operators';
import {TS_MODAL_REF} from '../modal/models/ts-modal-options';
import {ApplicationService} from '../../services/api/application.service';
import {TsModalRef} from '../modal/models/ts-modal-ref';
import {ApplicationReviewQueueItem} from '../../models/application-review-queue-item';


export interface ClarificationReviewModalData {
  clarifications: ApplicationReviewQueueItem[];
}

@Component({
  selector: 'app-kcar-status-modal',
  templateUrl: './kcar-status-modal.component.html',
  styleUrls: ['./kcar-status-modal.component.scss']
})
export class KcarStatusModalComponent implements OnInit {
  // loading state
  loading = true;
  // clarifications
  clarifications: ApplicationReviewQueueItem[] = [];

  planOptions = [
    'Phase 1-Wing B2 Floor1',
    'Phase 2-Wing B2 Floor1',
    'Phase 3-Wing B2 Floor2',
  ];
  planVal: string = this.planOptions[0];

  kcarData: any;

  constructor(
    @Inject(TS_MODAL_REF) public tsModalRef: TsModalRef<KcarStatusModalComponent>,
    private applicationService: ApplicationService
  ) { }

  ngOnInit() {
    this._getCompletedClarifications();
  }

  private _getCompletedClarifications(): void {
    this.applicationService.getKcarStatus()
      .pipe(finalize(() => this.loading = false))
      .subscribe(res => this.kcarData = res);
  }

}
