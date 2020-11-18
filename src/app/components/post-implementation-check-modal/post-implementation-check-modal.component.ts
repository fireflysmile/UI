import {Component, Inject, OnInit} from '@angular/core';
import {
  DirectorOptionItem,
} from '../director-selection-modal/director-selection-modal.component';
import {TS_MODAL_DATA, TS_MODAL_REF} from '../modal/models/ts-modal-options';
import {TsModalRef} from '../modal/models/ts-modal-ref';
import {SubscriptionService} from '../../services/subscription/subscription.service';
import {StatusTrackerService} from '../../services/components/status-tracker.service';
import {NotIncomingResigningDirector} from '../../models/post-implementation-detail';

export interface PostImplementationCheckModalData {
  // selected directors
  selectedDirectors: string[];
  // not incoming resigning directors
  notIncomingResigningDirectors: NotIncomingResigningDirector[];
}

@Component({
  selector: 'app-post-implementation-check-modal',
  templateUrl: './post-implementation-check-modal.component.html',
  styleUrls: [
    '../director-selection-modal/director-selection-modal.component.scss',
    './post-implementation-check-modal.component.scss',
  ],
  providers: [
    SubscriptionService,
  ],
})
export class PostImplementationCheckModalComponent implements OnInit {
  // directors
  directors: DirectorOptionItem[] = [];

  constructor(
    @Inject(TS_MODAL_REF) public tsModalRef: TsModalRef<PostImplementationCheckModalComponent>,
    @Inject(TS_MODAL_DATA) public data: PostImplementationCheckModalData,
    private subscriptionService: SubscriptionService,
    private statusTrackerService: StatusTrackerService,
  ) {
  }

  ngOnInit() {
    this._subscribePostImplementationDetail();
  }

  /**
   * get select all state
   */
  get selectAll(): boolean {
    return this.directors.every(item => item.selected);
  }

  /**
   * set select all state
   * @param state selected state
   */
  set selectAll(state: boolean) {
    this.directors.forEach(item => item.selected = state);
  }

  /**
   * return true when at least one director selected
   */
  get hasSelectedDirector(): boolean {
    return this.directors.every(item => item.selected);
  }

  /**
   * return true when not incoming resigning directors exist
   */
  get hasNotIncomingResigningDirectors(): boolean {
    return this.data && this.data.notIncomingResigningDirectors.length > 0;
  }

  /**
   * return all date selected
   */
  get allDateSelected(): boolean {
    return this.data && this.data.notIncomingResigningDirectors.every(item => item.date);
  }

  /**
   * return true when forms are valid
   */
  get valid(): boolean {
    return this.hasNotIncomingResigningDirectors
      ? this.allDateSelected && this.hasSelectedDirector : this.hasSelectedDirector;
  }

  /**
   * subscribe post implementation detail to create options
   */
  private _subscribePostImplementationDetail(): void {
    const sub = this.statusTrackerService
      .postImplementationDetail$
      .subscribe({
        next: res => this._createDirectorOptions(res.availableDirectors.map(item => item.name)),
      });

    this.subscriptionService.store('_subscribePostImplementationDetail', sub);
  }

  /**
   * create director options
   * @param directors available directors
   */
  private _createDirectorOptions(directors: string[]): void {
    this.directors = directors.map(item => ({
      name: item,
      // set initial selected state
      selected: this.data.selectedDirectors.indexOf(item) !== -1,
    }));
  }

  /**
   * handle proceed
   */
  onProceed(): void {
    const directors = this.directors.filter(item => item.selected).map(item => item.name);

    this.tsModalRef.close({
      directors,
      notIncomingResigningDirectors: this.data.notIncomingResigningDirectors,
    });
  }
}
