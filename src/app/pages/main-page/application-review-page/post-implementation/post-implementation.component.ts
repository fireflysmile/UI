import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

import { ApplicationReviewSectionBaseComponent } from '../application-review-section-base/application-review-section-base.component';

import { ApplicationPersonnel } from 'src/app/models/application-personnel';

const STATUS = environment.applicationPostImplementationStatus;

@Component({
  selector: 'app-post-implementation',
  templateUrl: './post-implementation.component.html',
  styleUrls: [
    '../application-review-section-base/application-review-section-base.component.scss',
    './post-implementation.component.scss'
  ]
})
export class PostImplementationComponent extends ApplicationReviewSectionBaseComponent implements OnInit {

  public columns = [
    { label: 'Applicant Name', property: 'name' },
    { label: 'DIN', property: 'din' },
    { label: 'Type of Request', property: 'requestType' },
    { label: 'Extension Date (if any)', property: 'extensionDate', tooltip: true, displayType: 'date' },
    { label: 'Actual Date of Change', property: 'actualDateOfChange', tooltip: true, displayType: 'date' },
    { label: 'Status', property: 'status', tooltip: true }
  ];

  public personnel: ApplicationPersonnel[];
  public postImplementationNeeded: boolean;

  public approvalDate: Date | string;
  public deadlineDate: Date | string;

  public showPostFactoChangesModal: boolean;
  shouldMockFailureRate = () => Math.random() > 0.25;
  shouldMockNotFound = () => Math.random() < 0.25;
  shouldMockPostFacto = () => Math.random() < 0.25;
  shouldSetNegativeDeltaTime = () => Math.random() > 0.5;

  get complete() {
    return this.personnel.filter(person => person.actualDateOfChange).length === this.personnel.length;
  }

  get disableMcaButton() {
    return !this.application.postImplementation
      || this.application.postImplementation.mcaFailureCount === 3
      || !this.application.postImplementation.memberConfirmation
      || this.application.postImplementation.mcaVerified;
  }

  ngOnInit() {
    // check if post-implementation is needed (for not only on approved applications)
    if (this.application.approvals && this.application.approvals.prior
      && this.application.approvals.prior.status === environment.applicationApprovalStatuses.APPROVED) {
      this.postImplementationNeeded = true;
      this.approvalDate = this.application.approvals.prior.date;
      this.deadlineDate = new Date(this.approvalDate);
      this.deadlineDate.setMonth(this.deadlineDate.getMonth() + 6);
    }

    // all the directors
    this.personnel = [...this.application.applicants];

    if (this.application.postImplementation && this.application.postImplementation.mcaFailureCount === 1) {
      // tslint:disable-next-line:max-line-length
      return this.messageService.open('error', 'The auto trigger of MCA API after member verification has failed. Please try again');
    }
  }


  /**
   * is manudal date entry
   * @param person - the particular row in table
   * @param column - the column (could be extension date or actual date of change)
   * returns whether the date should be manullay set via datepicker or not
   */
  public isManualDateEntry(person: ApplicationPersonnel, column: any): boolean {
    if (this.viewType === 'checker') { return false; }
    // if column is extensionDate, then return true if that person has an extenion request approved
    if (column.property === 'extensionDate') {
      if (this.application.postImplementation && this.application.postImplementation.extensionRequest) {
        return this.application.postImplementation.extensionRequest.accepted &&
          !!this.application.postImplementation.extensionRequest.personnel.find(p => p.id === person.id);
      }
    }
    // if column is actualDateOfChange, then only if the given person has a DIR12
    if (column.property === 'actualDateOfChange') {
      if (!this.application.postImplementation || !this.application.postImplementation.dir12s) { return false; }
      const receivedDir12s = this.application.postImplementation.dir12s.filter(dir => dir.document);
      const dir12Personnel = receivedDir12s.reduce((acc, dir) => [...acc, ...dir.personnel], []);
      return !!dir12Personnel.find(p => p.id === person.id);
    }
    return false;
  }

  /**
   * is date entry disabled
   * @param column - the particular date field column
   * if member has confirmed the extension, then those can't be edited.
   */
  public isDateEntryDisabled(column: any): boolean {
    if (column.property === 'extensionDate') {
      return this.application.postImplementation.memberConfirmation === true;
    }
    return false;
  }

  /**
   * on date picked
   * @param person - the particular person for whom date is picked
   * @param column - the column in the table (extension / actual)
   * @param date - the date itself
   * this method is needed just to check if the STATUS should change based on inputted date
   */
  public onDatePicked(person: ApplicationPersonnel, column: any, date: Date | string) {
    // set the date
    person[column.property] = date;
    // just check if actualDateOfChange is greater or less than the deadline
    if (person.actualDateOfChange) {
      person.status = new Date(person.actualDateOfChange)
        > (person.extensionDate ? new Date(person.extensionDate) : new Date(this.deadlineDate))
        ? STATUS.INCORPORATED_AFTER_DEADLINE : STATUS.INCORPORATED;
    }

    this.applicationService.updatePostImplementationDates([person]).subscribe();
  }


  /**
   * request DIR12s if needed
   * DIR12s are requested in two cases:
   * 1. When MCA verification returns NOT FOUND for some personnel
   * 2. When MCA verification doesn't work
   */
  private _requestDIRsIfNeeded() {
    if (this.application.postImplementation.mcaFailureCount === 3) {
      // MCA failed the max times, so request DIR for EVERYONE (EXCEPT NDD to DD or DD to NDD)
      return this.applicationService.requestDir12s(this.personnel.filter(person => !person.actualDateOfChange)).subscribe(res => {
        this.application.postImplementation.dir12s = res;
      });
    }

    // Request DIR only for those whom MCA couldn't find records for
    this.applicationService
      .requestDir12s(this.personnel.filter(person => person.status === STATUS.NOT_FOUND))
      .subscribe(res => {
        this.application.postImplementation.dir12s = res;
      });
  }

  /**
   * on mca verification
   */
  public onMCAVerification() {
    // random fn to mock a failure rate (25%)
    // NOTE: Only for prototype
    if (this.shouldMockFailureRate()) {
      // what happens when MCA API fails
      this.application.postImplementation.mcaFailureCount += 1;
      this.applicationService.onMcaFailure().subscribe();
      if (this.application.postImplementation.mcaFailureCount === 2) {
        return this.messageService.open('error', 'The API has failed. Please try again');
      }
      // MCA API failed max times
      if (this.application.postImplementation.mcaFailureCount === 3) {
        this._requestDIRsIfNeeded();
        // tslint:disable-next-line:max-line-length
        return this.messageService.open('error', 'DIR 12 has been requested from the member since maximum 2 API triggers on clicking \`MCA Verfication\' button have failed');
      }
    }

    // disable the MCA button
    this.applicationService.onMcaSuccess().subscribe(() => {
      this.application.postImplementation.mcaVerified = true;
    });

    this.personnel.forEach(person => {
      if (this.shouldMockNotFound() && !person.actualDateOfChange) {
        // simulate / mock NOT FOUND 25% of the time
        return person.status = STATUS.NOT_FOUND;
      }

      const randomDeltaTime = (this.shouldSetNegativeDeltaTime() ? -1 : 1) * 4 * 24 * 60 * 60 * 1000;
      // assign a random date near deadline
      person.actualDateOfChange = person.actualDateOfChange || (new Date(new Date(this.deadlineDate).getTime() + randomDeltaTime).toJSON());
      if (this.shouldMockPostFacto()) {
        // simulate / mock POST FACTO 25% of the time
        return person.status = STATUS.POST_FACTO;
      }

      // set the status of applicants accordingly
      person.status = new Date(person.actualDateOfChange)
        > (person.extensionDate ? new Date(person.extensionDate) : new Date(this.deadlineDate))
        ? STATUS.INCORPORATED_AFTER_DEADLINE : STATUS.INCORPORATED;
    });

    this.applicationService.updatePostImplementationDates(this.personnel).subscribe();

    const postFactoChanges = this.personnel.filter(person => person.status === STATUS.POST_FACTO);
    if (postFactoChanges.length) {
      this.applicationService.setPostFactoChanges(postFactoChanges).subscribe(rs => {
        this.application.postFactoChanges = rs;
        this.showPostFactoChangesModal = true;
      });
    }

    // check if DIR needs to be requested for anyone
    this._requestDIRsIfNeeded();
  }

  public save() {
    // no-op
  }

}
