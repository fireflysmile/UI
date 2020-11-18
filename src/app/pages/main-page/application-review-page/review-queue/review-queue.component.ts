import { Component, OnInit } from '@angular/core';
import { ApplicationReviewSectionBaseComponent } from '../application-review-section-base/application-review-section-base.component';

import { ApplicationReviewQueueItem } from 'src/app/models/application-review-queue-item';
import { AttachmentItem } from 'src/app/models/attachment-item';

@Component({
  selector: 'app-review-queue',
  templateUrl: './review-queue.component.html',
  styleUrls: [
    '../application-review-section-base/application-review-section-base.component.scss',
    './review-queue.component.scss'
  ]
})
export class ReviewQueueComponent extends ApplicationReviewSectionBaseComponent implements OnInit {

  public selectAll: boolean;
  public selectedItems: ApplicationReviewQueueItem[] = [];

  // items that are edits, but not sent to member for clarification
  get editItems(): ApplicationReviewQueueItem[] {
    return this.application.reviewQueue
      .filter(item => item.isEdit && !item.sentToMember);
  }

  // items that are already sent to member or edited items can't be deleted
  get enableDelete(): boolean {
    return this.selectedItems.length && !this.selectedItems.filter(item => item.sentToMember || item.isEdit).length;
  }

  // sendable items (all items not already sent)
  get sendableItems(): ApplicationReviewQueueItem[] {
    return this.selectedItems.filter(item => !item.sentToMember);
  }

  public showCloseEditModal: boolean;
  public showCompletedReviewsModal: boolean;
  public viewAttachment: { attachment: AttachmentItem, action: 'upload' | 'download' };

  ngOnInit() {
  }

  /**
   * select / de-select all items in table
   * @param value - whether to select or de-select
   */
  public onSelectAll(value: boolean) {
    this.selectAll = value;
    this.selectedItems = value ? [...this.application.reviewQueue] : [];
  }

  /**
   * toggle selection of item
   * @param reviewQueueItem - to toggle
   * @param select - whether to select or not
   */
  public onToggleItem(item: ApplicationReviewQueueItem, select: boolean) {
    // update selectAll status
    this.selectAll = this.selectedItems.length === this.application.reviewQueue.length;

    if (select && this.selectedItems.indexOf(item) === -1) {
      return this.selectedItems.push(item);
    }
    if (!select && this.selectedItems.indexOf(item) !== -1) {
      return this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
    }
  }

  /**
   * sanity check for selected items
   * if applications are closed / deleted, this list should update
   */
  private _checkSelectedItemsSanity() {
    const invalidItems = this.selectedItems.filter(item => this.application.reviewQueue.indexOf(item) === -1);
    invalidItems.forEach(item => {
      this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
    });
    // update selectAll status
    this.selectAll = this.selectedItems.length === this.application.reviewQueue.length;
  }

  /**
   * close all edited
   * (unless the edited item also happens to have been sent to member)
   */
  public closeAllEdited() {
    const itemsToClose = [...this.editItems];
    this.applicationService.closeReviews(itemsToClose).subscribe(() => {
      itemsToClose.forEach(item => {
        this.application.reviewQueue.splice(this.application.reviewQueue.indexOf(item), 1);
      });
      this._checkSelectedItemsSanity();
      // refresh the completed reviews list
      this.applicationService.getCompletedReviews().subscribe(completed => {
        this.application.completedReviews = completed;
      });
    });
  }

  /**
   * follow up
   * @param reviewQueueItem - item to follow up on
   * copy over the section details of the review item with extra 'follow-up'
   */
  public followUp(item: ApplicationReviewQueueItem) {
    this.addToReview(item.section, null, '(Follow-up)');
  }

  /**
   * close item
   * @param reviewQueueItem - to close
   * close the given item, and push it into completed reviews list
   */
  public closeItem(item: ApplicationReviewQueueItem) {
    this.applicationService.closeReviews([item]).subscribe(() => {
      this.application.reviewQueue.splice(this.application.reviewQueue.indexOf(item), 1);
      this._checkSelectedItemsSanity();
      // refresh the completed reviews list
      this.applicationService.getCompletedReviews().subscribe(completed => {
        this.application.completedReviews = completed;
      });
    });
  }

  /**
   * delete
   * delete all selected items
   */
  public delete() {
    this.applicationService.deleteReviews(this.selectedItems).subscribe(() => {
      this.selectedItems.forEach(item => {
        this.application.reviewQueue.splice(this.application.reviewQueue.indexOf(item), 1);
      });
      this._checkSelectedItemsSanity();
    });
  }

  /**
   * send to menmber
   * send all the selected & seendable items to member to await response
   */
  public sendToMember() {
    this.applicationService.sendClarificationsToMember(this.sendableItems).subscribe();
  }

  /**
   * on view response attachment
   * show the view attachment modal, for the given attachment
   * @param reviewQueue to show
   */
  public onViewResponseAttachment(item: ApplicationReviewQueueItem) {
    this.viewAttachment = { attachment: item.response.attachment, action: 'download' };
  }

  /**
   * on view comment attachment
   * show the view attachment modal, for the given attachment
   * @param reviewQueueItem to show
   */
  public onViewCommentAttachment(item: ApplicationReviewQueueItem) {
    this.viewAttachment = {
      attachment: item.comment.attachment,
      action: item.sentToMember ? 'download' : 'upload'
    };
  }

  /**
   * update attachment
   * @param attachment object to update
   * @param file the new file to upload and replace attachment with
   * @param reviewQueueItem - the row object itself (in case attachment object is null)
   */
  public updateAttachment(attachment: AttachmentItem, file: File, item?: ApplicationReviewQueueItem) {
    if (!attachment) {
      item.comment.attachment = {} as AttachmentItem;
      attachment = item.comment.attachment;
    }
    // for now set a mock file
    // during integration, file should be uploaded to S3 or something,
    // and corresponding url will be set here
    attachment.name = file.name;
    attachment.url = '/assets/files/dummy.pdf';
  }

  public save() {
    // no-op
  }

}
