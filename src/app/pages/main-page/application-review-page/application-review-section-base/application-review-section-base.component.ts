import { Component, OnInit, OnDestroy, EventEmitter, ElementRef } from '@angular/core';
import { Subscription, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ApplicationDetails } from 'src/app/models/application-details';
import { ApplicationPersonnel } from 'src/app/models/application-personnel';
import { ApplicationReviewCacheService } from 'src/app/services/components/application-review-cache.service';
import { LookupService } from 'src/app/services/api/lookup.service';
import { FileService } from 'src/app/services/helpers/file.service';
import { MessageService } from 'src/app/components/message/message.service';
import { ApplicationService } from 'src/app/services/api/application.service';
import { AppService } from 'src/app/services/components/app.service';

/**
 * base component for all "sections" of application review
 * this base handles all save/edit/cancel actions, as well as validation
 * it also provides common table styles in the folder
 */
@Component({
  selector: 'app-application-review-section-base',
  template: '',
})
export class ApplicationReviewSectionBaseComponent implements OnInit, OnDestroy {

  public application: ApplicationDetails;
  private _lastSavedApplication: ApplicationDetails;
  public originalApplication: ApplicationDetails;
  public isEditing: boolean;

  // updates on any saves
  public update = new EventEmitter<void>();
  public subscriptions: Subscription[] = [];

  // validation
  public showValidationErrorModal: boolean;
  public validationErrorMessage = 'Some of your edits are either incomplete or invalid.\nPlease fix them, or reset to original.';

  public viewType: 'checker' | 'maker';

  // what is the current table action
  get action(): 'add' | 'reset' {
    return this.isEditing ? 'reset' : 'add';
  }

  /**
   * get whether completed
   * check if approvals status is APPROVED or REJECTED
   */
  get completed(): boolean {
    return this.application && this.application.approvals && this.application.approvals.completed;
  }

  constructor(
    cacheService: ApplicationReviewCacheService,
    public elemRef: ElementRef,
    private fileService: FileService,
    public lookupService: LookupService,
    public messageService: MessageService,
    public applicationService: ApplicationService,
    private appService: AppService
  ) {
    cacheService.originalApplication$.subscribe(original => {
      this.originalApplication = original;
    });

    applicationService.getApplicationById().subscribe(application => {
      this.application = application;
    });

    this.appService.userInfo$.subscribe(user => {
      this.viewType = user.checker ? 'checker' : 'maker';
    });
  }

  ngOnInit() {
  }

  /**
   * validate inputs
   * search any inputs inside component that has an error
   */
  private _validateInputs() {
    const errors = this.elemRef.nativeElement
      .querySelectorAll('.cm-error, .ng-invalid.ng-touched, .ng-invalid.ng-dirty');
    return !errors || !errors.length;
  }

  public canSave(): boolean {
    // first check if inputs are valid
    if (!this._validateInputs()) {
      this.showValidationErrorModal = true;
      return false;
    }

    this.isEditing = false;
    this._lastSavedApplication = null;
    return true;
  }

  public save() {
    // abstract fn to override
  }

  /**
   * reset the application state back to previous saved
   */
  public cancel() {
    this.isEditing = false;
    this.application = this._lastSavedApplication;
    this._lastSavedApplication = null;
    this.update.emit();
  }

  /**
   * start edit mode
   */
  public edit() {
    this._lastSavedApplication = JSON.parse(JSON.stringify(this.application));
    this.isEditing = true;
  }

  /**
   * get person
   * helper fn to get a particular person given an id and the application object
   * @param personId - the id of the personnel
   * @param application - this is a param because we might want the person from the original / last saved application at times
   */
  public getPerson(personId: string, application: ApplicationDetails): { person: ApplicationPersonnel, postFacto: boolean } {
    let person = application.applicants.filter(p => p.id === personId)[0];
    if (person) {
      return { person, postFacto: false };
    } else {
      person = application.postFactos.filter(p => p.id === personId)[0];
      return { person, postFacto: true };
    }
  }

  public personNameAndRequestType(personId: string): string {
    const { person, postFacto } = this.getPerson(personId, this.application);
    return `${person.name} | ${person.requestType} ${postFacto ? '(Post-Facto)' : ''}`;
  }

  private _getReviewSectionText(sectionName: string, personId?: string, suffix?: string) {
    return `${sectionName}${personId ? '\n' + this.personNameAndRequestType(personId) : ''}${suffix ? '\n' + suffix : ''}`;
  }

  /**
   * add to review
   * @param sectionName - the page / form section name
   * @param personId - the person id for whom the edits might have been made
   * @param suffix - optional suffix
   * @param isEdit - is the item of edit type?
   */
  public addToReview(sectionName: string, personId?: string, suffix?: string, isEdit = false) {
    const section = this._getReviewSectionText(sectionName, personId, suffix);
    // check if item already exists in review queue
    // important flag here is sentToMember (a new entry can be added if the prev one is already sent to member)
    if (this.application.reviewQueue
      .find(item => item.isEdit === isEdit && !item.sentToMember && item.section === section)) {
        return;
    }
    // if not, add it to review queue
    this.applicationService.addToReviews({ section, comment: { text: '' }, isEdit }).subscribe(item => {
      this.application.reviewQueue.push(item);
    });
  }

  /**
   * remove an edit from the review queue
   * @param sectionName - the page / form section name
   * @param personId - the person id for whom the edits might have been made
   */
  public removeAnyEditsFromReview(sectionName: string, personId: string, suffix?: string): Observable<void> {
    const section = this._getReviewSectionText(sectionName, personId, suffix);
    const reviewQueueItem = this.application.reviewQueue
      .find(item => item.isEdit && !item.sentToMember && item.section.startsWith(section));
    if (!reviewQueueItem) { return of(null); }

    return this.applicationService.deleteReviews([reviewQueueItem]).pipe(tap(() => {
      this.application.reviewQueue.splice(this.application.reviewQueue.indexOf(reviewQueueItem), 1);
    }));
  }

  /**
   * update edit item in review queue
   * @param sectionName - the page / form section name
   * @param personId - the person id for whom the edits might have been made
   * @param columnNames - the latest string of edited column names
   * @param suffix - optional suffix
   * creates new item in review queue or updates an exisitng one
   */
  public updateEditInReview(sectionName: string, personId: string, columnNames: string, suffix?: string) {
    const section = this._getReviewSectionText(sectionName, personId, columnNames || suffix);
    // check if the edits already exists in review queue
    let reviewQueueItem = this.application.reviewQueue
      .find(item => item.isEdit && item.section === section);
    if (reviewQueueItem) { return; }

    // check if the some edits (not all) exist for the person and section
    // important flag here is sentToMember (don't want to edit those review items)
    const partialSection = this._getReviewSectionText(sectionName, personId, suffix);
    reviewQueueItem = this.application.reviewQueue
      .find(item => item.isEdit && !item.sentToMember && item.section.startsWith(partialSection));

    if (reviewQueueItem) {
      // if exists, remove it so that a fresh item can be added
      this.removeAnyEditsFromReview(sectionName, personId).subscribe(() => {
        this.addToReview(sectionName, personId, columnNames || suffix, true);
      });
    } else {
      // add a new review item with the edited columns
      this.addToReview(sectionName, personId, columnNames || suffix, true);
    }
  }

  /**
   * download the signed original application
   */
  public download() {
    this.fileService.downloadFile(this.application.url, 'Signed_Application.pdf');
  }

  /**
   * auto save on destroy (if inputs are valid)
   */
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());

    if (this.isEditing) {
      if (!this._validateInputs()) { return; }
      this.save();
    }
  }

}
