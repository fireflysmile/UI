import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApplicationService} from '../../../../services/api/application.service';
import {SubscriptionService} from '../../../../services/subscription/subscription.service';
import {StatusTrackerService} from '../../../../services/components/status-tracker.service';
import {PostImplementationDetail} from '../../../../models/post-implementation-detail';
import {ModalService} from '../../../../components/modal/modal.service';
import {
  DirectorSelectionModalComponent,
  DirectorSelectionModalData
} from '../../../../components/director-selection-modal/director-selection-modal.component';
import {finalize} from 'rxjs/operators';
import {ApplicationTrackingDetail} from '../../../../models/application-tracking-detail';
import {PostFactoChangedModalComponent} from '../../../../components/post-facto-changed-modal/post-facto-changed-modal.component';

@Component({
  selector: 'app-post-implementation-page',
  templateUrl: './post-implementation-page.component.html',
  styleUrls: ['./post-implementation-page.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class PostImplementationPageComponent implements OnInit, OnDestroy {
  // application id
  id: string;
  // tracking detail
  trackingDetail: ApplicationTrackingDetail;
  // post implementation detail
  detail: PostImplementationDetail;
  // confirm loading state
  loading = false;

  constructor(
    private modalService: ModalService,
    private applicationService: ApplicationService,
    private subscriptionService: SubscriptionService,
    private statusTrackerService: StatusTrackerService,
  ) { }

  ngOnInit() {
    this._subscribeApplicationId();
    this._getPostImplementationDetail();
    this._subscribeTrackingDetail();
    this._subscribePostImplementationDetail();
  }

  ngOnDestroy() {
    this.statusTrackerService.postImplementationDetail = this.detail;
  }

  /**
   * return true when file uploaded and director selected
   */
  get canSubmit(): boolean {
    if (this.unhappyPath) {
      let count = 0;

      this.detail.availableDirectors.filter(item => {
        if (item.uploaded) {
          count++;
        }

        count += item.directors.length;
      });

      return this.detail && this.detail.availableDirectors.filter(item => !item.success).length === count;
    } else {
      return this.detail && !this.detail.submitted && this.detail.uploaded && this.detail.selectedRequestDirectors.length > 0;
    }
  }

  /**
   * return true when all directors are selected
   */
  get selectDirectorDisabled(): boolean {
    return this.detail && this.detail.selectedRequestDirectors.length === (this.detail.availableDirectors || []).length;
  }

  /**
   * return true when unhappy path
   */
  get unhappyPath(): boolean {
    return this.detail && this.detail.availableDirectors.some(item => !item.success);
  }

  /**
   * subscribe application id
   */
  private _subscribeApplicationId(): void {
    const sub = this.statusTrackerService
      .applicationId$
      .subscribe(res => this.id = res);

    this.subscriptionService.store('_subscribeApplicationId', sub);
  }

  /**
   * get tracking detail
   */
  private _getPostImplementationDetail(): void {
    if (!this.statusTrackerService.postImplementationLoaded) {
      const sub = this.applicationService
        .getPostImplementationDetail()
        .subscribe({
          next: res => this.statusTrackerService.postImplementationDetail = res,
        });

      this.subscriptionService.store('_getPostImplementationDetail', sub);
    }
  }

  /**
   * subscribe tracking detail
   */
  private _subscribeTrackingDetail(): void {
    const sub = this.statusTrackerService
      .applicationTrackingDetail$
      .subscribe(res => this.trackingDetail = res);

    this.subscriptionService.store('_subscribeTrackingDetail', sub);
  }

  /**
   * subscribe post implementation detail
   */
  private _subscribePostImplementationDetail(): void {
    const sub = this.statusTrackerService
      .postImplementationDetail$
      .subscribe(res => {
        this.detail = res;

        if (this.detail && this.detail.postFactoChanged) {
          this._openPostFactoChangedModal();
        }
      });

    this.subscriptionService.store('_subscribePostImplementationDetail', sub);
  }

  /**
   * open post facto changed modal
   */
  private _openPostFactoChangedModal(): void {
    this.modalService.open(PostFactoChangedModalComponent, {
      onClose: res => {
        this.applicationService.memberNotifiedOfPostFactoChanges().subscribe();
      },
    });
  }

  /**
   * upload file to server
   * @param file file
   */
  onFileUploaded(file: File): void {
    const sub = this.applicationService
      .uploadExtensionLetter(this.id, file)
      .subscribe({
        next: res => this.detail.uploaded = res,
      });

    this.subscriptionService.store('onFileUploaded', sub);
  }

  /**
   * open director selection modal for request
   */
  openDirectorSelectionModal(): void {
    this.modalService.open(DirectorSelectionModalComponent, {
      data: {
        title: 'Directors for Extension Request',
        message: 'Please select the directors for whom\nyou want to apply for an extension request',
        canSelectAll: true,
        selectedDirectors: this.detail.selectedRequestDirectors,
        selectableDirectors: this.detail.availableDirectors.map(item => item.name),
      } as DirectorSelectionModalData,
      onClose: res => {
        if (res) {
          this.detail.selectedRequestDirectors = res;
        }
      }
    });
  }

  /**
   * remove selected director
   * @param director director to remove
   */
  removeSelectedDirector(director: string): void {
    this.detail.selectedRequestDirectors = this.detail.selectedRequestDirectors.filter(item => item !== director);
  }

  /**
   * submit post implementation
   */
  submitExtensionRequest(): void {
    this.loading = true;

    const sub = this.applicationService
      .submitExtensionRequest(this.detail.selectedRequestDirectors, this.detail.uploaded)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.statusTrackerService.postImplementationDetail = {
            ...this.detail,
            submitted: true,
          };

          this.statusTrackerService.applicationTrackingDetail = {
            ...this.trackingDetail,
            postImplementationSubmitted: true,
          };
        },
      });

    this.subscriptionService.store('submitPostImplementation', sub);
  }

  /**
   * submit post implementation for dir 12
   */
  submitPostImplementationForDir12(): void {
    this.loading = true;

    const sub = this.applicationService
      .submitDir12s(this.detail.availableDirectors)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.statusTrackerService.postImplementationDetail = {
            ...this.detail,
            dir12sSubmitted: true
          };

          this.statusTrackerService.applicationTrackingDetail = {
            ...this.trackingDetail,
            postImplementationSubmitted: true,
          };
        },
      });

    this.subscriptionService.store('submitPostImplementation', sub);
  }
}
