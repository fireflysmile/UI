import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ApplicationTrackingDetail} from '../../models/application-tracking-detail';
import {ApplicationReviewQueueItem} from '../../models/application-review-queue-item';
import {PriorApprovalDetail} from '../../models/prior-approval-detail';
import {PostImplementationDetail} from '../../models/post-implementation-detail';
import {UnderReviewDetail} from '../../models/under-review-detail';

@Injectable({
  providedIn: 'root'
})
export class StatusTrackerService {
  // router distributed state
  distributed = false;
  // under review loaded state
  private _underReviewLoaded = false;
  // clarification loaded state
  private _clarificationLoaded = false;
  // approval loaded
  private _approvalLoaded = false;
  // postImplementation loaded
  private _postImplementationLoaded = false;
  // application id
  private readonly _applicationId$: BehaviorSubject<string> = new BehaviorSubject(null);
  // application tracking detail
  private readonly _applicationTrackingDetail$: BehaviorSubject<ApplicationTrackingDetail> = new BehaviorSubject(null);
  // underReviewDetail
  private readonly _underReviewDetail$: BehaviorSubject<UnderReviewDetail> = new BehaviorSubject(null);
  // clarifications
  private readonly _clarifications$: BehaviorSubject<ApplicationReviewQueueItem[]> = new BehaviorSubject([]);
  // approval detail
  private readonly _approvalDetail$: BehaviorSubject<PriorApprovalDetail> = new BehaviorSubject(null);
  // post implementation detail
  private readonly _postImplementationDetail$: BehaviorSubject<PostImplementationDetail> = new BehaviorSubject(null);

  constructor() { }

  /**
   * get application id
   */
  get applicationId$(): Observable<string> {
    return this._applicationId$.asObservable();
  }

  /**
   * set application id
   * @param id application id
   */
  set applicationId(id: string) {
    this._applicationId$.next(id);
  }

  /**
   * get application tracking detail
   */
  get applicationTrackingDetail$(): Observable<ApplicationTrackingDetail> {
    return this._applicationTrackingDetail$.asObservable();
  }

  /**
   * set application tracking detail
   * @param detail detail
   */
  set applicationTrackingDetail(detail: ApplicationTrackingDetail) {
    this._applicationTrackingDetail$.next(detail);
  }

  /**
   * get underReviewDetail data
   */
  get underReviewDetail$(): Observable<UnderReviewDetail> {
    return this._underReviewDetail$.asObservable();
  }

  /**
   * set underReviewDetail data
   * @param detail updated underReviewDetail
   */
  set underReviewDetail(detail: UnderReviewDetail) {
    this._underReviewLoaded = true;
    this._underReviewDetail$.next(detail);
  }

  /**
   * return underReview loaded state
   */
  get underReviewLoaded(): boolean {
    return this._underReviewLoaded;
  }

  /**
   * get clarifications data
   */
  get clarifications$(): Observable<ApplicationReviewQueueItem[]> {
    return this._clarifications$.asObservable();
  }

  /**
   * set clarifications data
   * @param clarifications updated clarifications
   */
  set clarifications(clarifications: ApplicationReviewQueueItem[]) {
    this._clarificationLoaded = true;
    this._clarifications$.next(clarifications || []);
  }

  /**
   * return clarification loaded state
   */
  get clarificationLoaded(): boolean {
    return this._clarificationLoaded;
  }

  /**
   * get approvalDetail data
   */
  get approvalDetail$(): Observable<PriorApprovalDetail> {
    return this._approvalDetail$.asObservable();
  }

  /**
   * set approvalDetail data
   * @param detail updated approvalDetail
   */
  set approvalDetail(detail: PriorApprovalDetail) {
    this._approvalLoaded = true;
    this._approvalDetail$.next(detail);
  }

  /**
   * return approval loaded state
   */
  get approvalLoaded(): boolean {
    return this._approvalLoaded;
  }

  /**
   * get postImplementationDetail data
   */
  get postImplementationDetail$(): Observable<PostImplementationDetail> {
    return this._postImplementationDetail$.asObservable();
  }

  /**
   * set postImplementationDetail data
   * @param detail updated postImplementationDetail
   */
  set postImplementationDetail(detail: PostImplementationDetail) {
    this._postImplementationLoaded = true;
    this._postImplementationDetail$.next(detail);
  }

  /**
   * return postImplementation loaded state
   */
  get postImplementationLoaded(): boolean {
    return this._postImplementationLoaded;
  }

  /**
   * clear the service
   */
  clear(): void {
    this.applicationId = null;
    this.applicationTrackingDetail = null;
    this.underReviewDetail = null;
    this.clarifications = null;
    this.approvalDetail = null;
    this.postImplementationDetail = null;

    this._approvalLoaded = false;
    this._underReviewLoaded = false;
    this._clarificationLoaded = false;
    this._postImplementationLoaded = false;
    this.distributed = false;
  }
}
