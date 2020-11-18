import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApplicationReviewSectionBaseComponent } from '../application-review-section-base/application-review-section-base.component';

import { ApplicationPriorApproval } from 'src/app/models/application-prior-approval';
import { ApplicationPostFactoApproval } from 'src/app/models/application-post-facto-approval';
import { OfficialInfoItem } from 'src/app/models/official-info-item';

const STATUS = environment.applicationApprovalStatuses;

@Component({
  selector: 'app-prior-approval',
  templateUrl: './prior-approval.component.html',
  styleUrls: [
    '../application-review-section-base/application-review-section-base.component.scss',
    './prior-approval.component.scss'
  ]
})
export class PriorApprovalComponent extends ApplicationReviewSectionBaseComponent implements OnInit {

  public showGrantModal: boolean;

  public priorApprovalNewComment: string;
  public postFactoApprovalNewComment: string;

  ngOnInit() {
    if (!this.application.approvals) {
      // set empty approval objects initially
      const approvals: any = {
        prior: this.application.applicants.length ? { comments: [] } : null,
        postFacto: this.application.postFactos.length ? { comments: [] } : null
      };
      this.application.approvals = approvals;
    }
  }

  public onCheckerSelected(checker: OfficialInfoItem) {
    this.applicationService.assignChecker(checker).subscribe(() => {
      this.application.checker = checker;
    });
  }

  /**
   * check if can change approval letter
   * maker cannot change approval letter while checker is reviewing it
   */
  public canChangeApprovalLetter() {
    if (this.viewType === 'maker') {
      if (this.application.approvals.prior.status === STATUS.WITH_CHECKER &&
          this.application.approvals.prior.approvalLetter) {
          // tslint:disable-next-line:max-line-length
          this.messageService.open('error', 'Letter has been sent to the checker for review. Please wait for response, before you can send another attachment');
          return false;
      }
    }
    return true;
  }

  /**
   * accept prior approval
   * @param value - whether to accept or reject
   * @param partial - whether prior approval is being given partially or not
   */
  public acceptPriorApproval(value: boolean, partial: boolean) {
    this.showGrantModal = false;

    // the approval object (without the comments from checker as that should not be replaced)
    const approvalObj = {
      accepted: value,
      approvalLetter: value ? {
        name: `${partial ? 'Partial ' : ''}Approval Letter_${this.application.id}`,
        url: '/assets/files/sample.pdf'
      } : null,
      rejectionReason: null
    };

    if (this.application.approvals.prior) {
      return Object.assign(this.application.approvals.prior, approvalObj);
    }
    this.application.approvals.prior = Object.assign(approvalObj, { comments: [] });
  }

  /**
   * accept post factos
   * @param value - whether to accept or reject the postFactos
   */
  public acceptPostFactos(value: boolean) {
    // maker cannot change the state while checker is reviewing it
    if (this.viewType === 'maker') {
      if (this.application.approvals.postFacto.status === STATUS.WITH_CHECKER) {
          // tslint:disable-next-line:max-line-length
          return this.messageService.open('error', 'Decision has been sent to checker for review. Please wait for resonse before you can revise the decision');
      }
    }

    this.application.approvals.postFacto = {
      accepted: value,
      comments: (this.application.approvals.postFacto && this.application.approvals.postFacto.comments) || []
    };
  }

  /**
   * generate warning letter
   * for postFacto Approvals
   */
  public generateWarningLetter() {
    const changes: any = {
      warningLetter: {
        name: `Warning Letter_${this.application.id}`,
        url: '/assets/files/sample.pdf'
      }
    };

    Object.assign(this.application.approvals.postFacto, changes);
  }

  public publishWarningLetter() {
    this.application.approvals.postFacto.warningLetter.published = true;
  }

  public publishApprovalLetter() {
    this.application.approvals.prior.approvalLetter.published = true;
  }

  /**
   * get status display texts
   * the status for approval is either "WITH_CHECKER" or "WITH_MAKER",
   * but, depending on who's viewing it (checker vs maker), the display text should be different
   */
  public getStatusDisplayText(approval: ApplicationPriorApproval | ApplicationPostFactoApproval) {
    if (!approval.status) { return 'Not sent to Checker'; }
    if (approval.status === STATUS.WITH_CHECKER) {
      return this.viewType === 'maker' ? 'Sent to Checker' : 'Received from Maker';
    }
    if (approval.status === STATUS.WITH_MAKER) {
      return this.viewType === 'maker' ? 'Comments from Checker' : 'Sent to Maker';
    }
    return approval.status;
  }

  /**
   * validate prior approval form
   */
  private _validatePriorApprovalForm(): boolean {
    if (!this.application.applicants.length) { return true; }
    if (!this.application.checker) { return false; }

    const approval = this.application.approvals.prior;
    if (!approval)  { return false; }
    if (!approval.accepted && !approval.rejectionReason) { return false; }

    return true;
  }

  /**
   * validate post approval form
   */
  private _validatePostFactoApprovalForm(): boolean {
    if (!this.application.postFactos.length) { return true; }
    if (!this.application.checker) { return false; }

    const approval = this.application.approvals.postFacto;
    if (!approval)  { return false; }
    if (!approval.accepted && !approval.rejectionReason) { return false; }
    if (approval.accepted
      && !approval.warningLetter
      && !approval.warningCancellationReason) {
        return false;
    }

    return true;
  }

  public validateForm(): boolean {
    return this._validatePriorApprovalForm() && this._validatePostFactoApprovalForm();
  }

  /**
   * send to checker
   */
  public sendToChecker() {
    // show error if review queue is open
    if (this.application.reviewQueue.length) {
      return this.messageService.open('error', 'Please check if Review Queue is open with reviews');
    }

    // change the status of the prior approval
    if (this.application.approvals.prior) {
      this.application.approvals.prior.status = STATUS.WITH_CHECKER;
    }
    if (this.application.approvals.postFacto) {
      this.application.approvals.postFacto.status = STATUS.WITH_CHECKER;
    }

    this.applicationService.updateApprovals(this.application).subscribe();
  }

  /**
   * add new comments
   * called when the "checker" sends back to maker
   * the new comment in the textarea should be pushed to the comments list
   */
  private _addNewComments() {
    // append the prior approval comment if any
    if (this.priorApprovalNewComment) {
      this.application.approvals.prior.comments.unshift({
        text: this.priorApprovalNewComment,
        date: new Date().toJSON()
      });
      this.application.approvals.prior.status = STATUS.WITH_MAKER;
    }
    // append the post facto approval comment if any
    if (this.postFactoApprovalNewComment) {
      this.application.approvals.postFacto.comments.unshift({
        text: this.postFactoApprovalNewComment,
        date: new Date().toJSON()
      });
      this.application.approvals.postFacto.status = STATUS.WITH_MAKER;
    }

    // clear the text boxes and new comment variables
    [...this.elemRef.nativeElement.querySelectorAll('.comments textarea')]
      .forEach((commentBox: HTMLTextAreaElement) => {
        commentBox.value = '';
      });
    this.priorApprovalNewComment = null;
    this.postFactoApprovalNewComment = null;
  }

  /**
   * confirm post facto if needed
   * CHECKER only
   * if confirmation is null, then assign true (as the checker has not made any changes apparently)
   */
  private _confirmPostFactoIfNeeded() {
    // confirm the warning letter status (if not already changed by checker)
    if (this.application.approvals.postFacto
        && (this.application.approvals.postFacto.checkerConfirmation === null
          || this.application.approvals.postFacto.checkerConfirmation === undefined)) {
      this.application.approvals.postFacto.checkerConfirmation = true;
    }
  }

  /**
   * send it back to reviewer (with comments)
   */
  public sendToMaker() {
    this._addNewComments();
    this._confirmPostFactoIfNeeded();
    this.applicationService.updateApprovals(this.application).subscribe();
  }

  /**
   * send to member
   * and close approvals (final step)
   */
  public sendToMember() {
    // if review queue is open, cannot close
    if (this.application.reviewQueue.length) {
      return this.messageService.open('error', 'Please check if Review Queue is open with reviews');
    }

    // All Docs need to be published to PDF method, before giving final decision to member
    if (this.application.approvals.prior && this.application.approvals.prior.accepted) {
      if (!this.application.approvals.prior.approvalLetter.published) {
        return this.messageService.open('error', 'Please convert all relevant letters to PDFs before sending it to the member');
      }
    }
    if (this.application.approvals.postFacto && this.application.approvals.postFacto.warningLetter) {
      if (!this.application.approvals.postFacto.warningLetter.published) {
        return this.messageService.open('error', 'Please convert all relevant letters to PDFs before sending it to the member');
      }
    }

    // set the checkerConfirmation in postFacto approval
    this._confirmPostFactoIfNeeded();

    // accept / reject the applciation
    if (this.application.approvals.prior) {
      this.application.approvals.prior.date = new Date().toJSON();
      this.application.approvals.prior.status = this.application.approvals.prior.accepted ? STATUS.APPROVED : STATUS.REJECTED;
    }
    if (this.application.approvals.postFacto) {
      this.application.approvals.postFacto.status = this.application.approvals.postFacto.accepted ? STATUS.APPROVED : STATUS.REJECTED;
    }
    this.application.approvals.completed = true;

    // save
    this.applicationService.updateApprovals(this.application).subscribe();
  }

}
