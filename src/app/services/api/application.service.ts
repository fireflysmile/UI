import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiBaseService} from './api-base.service';
import {Observable, of} from 'rxjs';
import {ApplicationItem} from '../../models/application-item';
import {randomDate, randomNumber, randomPick} from '../../utils/random.util';
import {ApplicationDetails} from '../../models/application-details';
import {map, tap} from 'rxjs/operators';
import {SearchApplicationFilter} from '../../models/search-application-filter';
import {isDefined} from '../../utils/validation.util';
import {ApplicationChartData} from '../../models/application-chart-data';
import {DatePipe} from '@angular/common';
import {ApplicationSummary} from '../../models/application-summary';
import {SplitApplicationSummary} from '../../models/split-application-summary';
import {ApplicationDetailedSummary} from '../../models/application-detailed-summary';
import {ApplicationTrackingDetail} from '../../models/application-tracking-detail';
import {ApplicationReviewQueueItem} from '../../models/application-review-queue-item';
import {ApplicationPersonnel} from '../../models/application-personnel';
import {AttachmentItem} from '../../models/attachment-item';
import {ApplicationEditsItem} from '../../models/application-edits-item';
import { OfficialInfoItem } from '../../models/official-info-item';
import {PriorApprovalItem, PriorApprovalStatus, PriorApprovalType} from '../../models/prior-approval-item';
import {PriorApprovalDocument} from '../../models/prior-approval-document';
import {PriorApprovalDetail} from '../../models/prior-approval-detail';
import {UnderReviewDetail} from '../../models/under-review-detail';
import {PostImplementationDetail, NotIncomingResigningDirector, AvailableDirector} from '../../models/post-implementation-detail';
import {ChangedPostFacto} from '../../models/changed-post-facto';
import { environment } from 'src/environments/environment';

const KEY = 'application';
const ORIGINAL_KEY = 'original_application';

const PI_STATUS = environment.applicationPostImplementationStatus;

@Injectable({
  providedIn: 'root'
})
export class ApplicationService extends ApiBaseService {

  // to demo applications without post factos
  demoApplicationWithoutPostFactos = () => Math.random() < 0.5;

  constructor(
    private http: HttpClient,
  ) {
    super('/application');
  }

  /**
   * get application
   * @param id of the the application
   */
  getApplicationById(id?: string): Observable<ApplicationDetails> {
    if (localStorage.getItem(KEY)) {
      return of(JSON.parse(localStorage.getItem(KEY)));
    }
    return this.http.get<ApplicationDetails>(this.endpoint('/application-details.json'))
      .pipe(tap(application => {
        if (this.demoApplicationWithoutPostFactos()) {
          application.postFactos = [];
        }
        localStorage.setItem(KEY, JSON.stringify(application));
        localStorage.setItem(ORIGINAL_KEY, JSON.stringify(application));
      }));
  }

  getOriginalApplicationById(id?: string): Observable<ApplicationDetails> {
    if (localStorage.getItem(ORIGINAL_KEY)) {
      return of(JSON.parse(localStorage.getItem(ORIGINAL_KEY)));
    }
    return this.http.get<ApplicationDetails>(this.endpoint('/application-details.json'))
      .pipe(tap(application => {
        localStorage.setItem(KEY, JSON.stringify(application));
        localStorage.setItem(ORIGINAL_KEY, JSON.stringify(application));
      }));
  }

  /**
   * search application
   * @param filters application filter
   */
  searchApplications(filters: SearchApplicationFilter): Observable<ApplicationItem[]> {
    return this.http.get<ApplicationItem[]>(this.endpoint('/applications.json'))
      .pipe(map(res => {
        return res.filter(item => {
          const date = new Date(item.applicationReceivedOn);

          // year filter
          let year = true;

          if (filters.year.year && isDefined(filters.year.month)) {
            year = date.getFullYear() === filters.year.year && date.getMonth() === filters.year.month;
          } else if (filters.year.year && (isDefined(filters.year.start) || isDefined(filters.year.end))) {
            const over = isDefined(filters.year.start) ? date.getMonth() >= filters.year.start : true;
            const under = isDefined(filters.year.end) ? date.getMonth() <= filters.year.end : true;

            year = date.getFullYear() === filters.year.year && over && under;
          } else if (filters.year.year) {
            year = date.getFullYear() === filters.year.year;
          }

          const memberCode = filters.memberCode ? item.memberCode === filters.memberCode : true;
          const memberName = filters.memberName ? item.memberName === filters.memberName : true;
          const requestType = filters.requestType ? item.requestType === filters.requestType : true;
          const applicationId = filters.applicationId ? item.id === filters.applicationId : true;

          return year && memberCode && memberName && requestType && applicationId;
        }).map(item => ({...item, maker: item.maker ? item.maker : 'Not Assigned'}));
      }));
  }

  /**
   * get application chart data
   */
  getApplicationChartData(): Observable<ApplicationChartData[]> {
    const now = new Date();
    const currentMonth = now.getMonth();
    const data: ApplicationChartData[] = [];
    const datePipe = new DatePipe('en-US');

    for (let i = 0; i <= currentMonth; i++) {
      data.push({
        month: datePipe.transform(new Date(now.getFullYear(), i, 1), 'MMMM'),
        keyApprovals: randomNumber(0, 900),
        mandatorySubmissions: randomNumber(0, 900),
        otherCompliances: randomNumber(0, 900),
      });
    }

    return this.getFakeResponse(data);
  }

  /**
   * get last 30days applications
   */
  getLastMonthlyApplications(): Observable<ApplicationSummary> {
    return this.getFakeResponse({
      actionUnderReview: randomNumber(300, 900),
      applicationCompleted: randomNumber(50, 300),
    });
  }

  /**
   * get split application summary
   */
  getSplitApplicationSummary(): Observable<SplitApplicationSummary> {
    return this.getFakeResponse({
      keyApprovals: {
        actionUnderReview: randomNumber(2000, 6000),
        applicationCompleted: randomNumber(500, 2000),
      },
      mandatorySubmissions: {
        actionUnderReview: randomNumber(2000, 6000),
        applicationCompleted: randomNumber(500, 2000),
      },
      otherCompliances: {
        actionUnderReview: randomNumber(2000, 6000),
        applicationCompleted: randomNumber(500, 2000),
      }
    });
  }

  /**
   * get applications
   * @param start start date
   * @param end end date
   */
  getMemberApplications(start: Date, end: Date): Observable<ApplicationItem[]> {
    return this.http.get<ApplicationItem[]>(this.endpoint('/member-applications.json'))
      .pipe(map(res => {
        return res.filter(item => {
          const over = start ? new Date(item.applicationReceivedOn).valueOf() >= start.valueOf() : true;
          const under = end ? new Date(item.applicationReceivedOn).valueOf() <= end.valueOf() : true;

          return over && under;
        });
      }));
  }

  /**
   * delete applications
   * @param applications applications to delete
   */
  deleteApplications(applications: ApplicationItem[]): Observable<void> {
    return this.getFakeResponse(null)
      .pipe(this.attachDelay(400));
  }

  /**
   * get application detailed summaries
   */
  getApplicationDetailedSummaries(): Observable<ApplicationDetailedSummary> {
    return this.getFakeResponse({
      applicationUnderReview: {
        reviewPending: randomNumber(2000, 6000),
        inProgress: randomNumber(2000, 6000),
      },
      applicationCompleted: {
        finalApprovals: randomNumber(1000, 2000),
        postChecks: randomNumber(1000, 2000),
      },
    });
  }

  /**
   * get application tracking detail
   */
  getApplicationTrackingDetail(): Observable<ApplicationTrackingDetail> {
    return this.getApplicationById().pipe(map(application => {
      const clarificationRequired = !!application.reviewQueue.length || !!application.completedReviews.length;
      const priorApprovalCompleted = application.approvals && application.approvals.completed;
      const postImplementationReady = application.approvals && application.approvals.completed && application.approvals.prior.accepted;
      const postImplementationSubmitted = application.postImplementation && application.postImplementation.memberConfirmation;

      return {
        clarificationRequired,
        priorApprovalCompleted,
        postImplementationReady,
        postImplementationSubmitted,
      };
    }));
  }

  /**
   * return under review detail
   */
  getUnderReviewDetail(): Observable<UnderReviewDetail> {
    const now = new Date();
    return this.getApplicationById().pipe(map(application => {
      return {
        applicationSubmissionCompleted: randomDate(
          new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() - 80),
          new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() - 79),
        ),
        officialAssigned: application.makerAssignedOn,
        reviewOpened: application.reviewOpenedOn,
        reviewClosed: application.approvals && application.approvals.completed ? application.approvals.prior.date : null
      };
    }));
  }

  /**
   * get clarifications
   */
  getClarifications(): Observable<ApplicationReviewQueueItem[]> {
    return this.getApplicationById().pipe(map(application => {
      return application.reviewQueue
        .filter(item => item.sentToMember)
        .map(item => ({...item, response: item.response || { text: '', attachment: null }}));
    }));
  }

  /**
   * get completed clarifications
   */
  getCompletedClarifications(): Observable<ApplicationReviewQueueItem[]> {
    return this.getApplicationById().pipe(map(application => {
      return application.completedReviews
        .filter(item => item.sentToMember)
        .map(item => ({...item, response: item.response || { text: '', attachment: null }}));
    }));
  }

  /**
   * get completed reviews
   * (for official.. edits that were not sent to member for clarification would also show up here)
   */
  getCompletedReviews(): Observable<ApplicationReviewQueueItem[]> {
    return this.getApplicationById().pipe(map(application => {
      return application.completedReviews
        .map(item => ({...item, response: item.response || { text: '', attachment: null }}));
    }));
  }

  /**
   * get prior approval details
   */
  getPriorApprovalDetail(): Observable<PriorApprovalDetail> {
    return this.getApplicationById().pipe(map(application => {
      if (!application.approvals || !application.approvals.completed) { return { approvals: [], documents: [] }; }

      const approvals = [{
          type: 'prior-approval' as PriorApprovalType,
          status: (application.approvals.prior.status === 'Rejected' ? 'rejected' : 'granted') as PriorApprovalStatus,
          rejectionReason: application.approvals.prior.rejectionReason
      }];
      if (application.approvals.postFacto) {
        approvals.push({
          type: 'post-facto',
          status: (application.approvals.postFacto.status === 'Rejected' ? 'rejected' : 'granted') as PriorApprovalStatus,
          rejectionReason: application.approvals.postFacto.rejectionReason
        });
      }

      const documents = [];
      if (application.approvals.prior.approvalLetter) {
        documents.push({
          title: 'Approval Leter' as PriorApprovalType,
          name: application.approvals.prior.approvalLetter.name,
          url: application.approvals.prior.approvalLetter.url
        });
      }
      if (application.approvals.postFacto && application.approvals.postFacto.warningLetter) {
        documents.push({
          title: 'Warning Leter',
          name: application.approvals.postFacto.warningLetter.name,
          url: application.approvals.postFacto.warningLetter.url
        });
      }

      const edits = [...application.reviewQueue.filter(item => item.sentToMember), ...application.completedReviews]
        .filter(item => item.isEdit);
      if (edits.length) {
        documents.push({
          title: 'Application Form',
          name: 'application-form.pdf',
          url: application.url,
        });
      }

      return { approvals, documents };
    }));
  }

  updateApprovals(application: ApplicationDetails): Observable<void> {
    return this.getApplicationById().pipe(tap(oldApplication => {
      if (
        application.approvals &&
        application.approvals.completed &&
        application.approvals.prior.accepted
      ) {
        application.postImplementation = application.postImplementation || {
          mcaFailureCount: 0,
        };
        oldApplication.postImplementation = application.postImplementation;
      }
      oldApplication.approvals = application.approvals;
      localStorage.setItem(KEY, JSON.stringify(oldApplication));
    })).pipe(map(() => null));
  }

  /**
   * get post implementation detail
   */
  getPostImplementationDetail(): Observable<PostImplementationDetail> {
    return this.getApplicationById().pipe(map(application => {
      // DIR 12s info
      let directorsThatNeedDir12 = [];
      if (application.postImplementation && application.postImplementation.dir12s) {
        directorsThatNeedDir12 = application.postImplementation.dir12s.reduce((acc, group) => [...acc, ...group.personnel], []);
      }
      const availableDirectors = application.applicants.map(director => {
        let otherNamesInGroup = [];
        const group =
          application.postImplementation &&
          application.postImplementation.dir12s &&
          application.postImplementation.dir12s.find(
            (g) => g.personnel[0].id === director.id
          );
        if (group) {
          otherNamesInGroup = group.personnel.slice(1).map(d => d.name);
        }
        return {
          name: director.name,
          success: !directorsThatNeedDir12.filter(d => d.id === director.id).length,
          directors: otherNamesInGroup,
          uploaded: group && group.document ? { name: group.document.name, url: group.document.url } : null
        };
      });

      // Extension Request info
      let extensionDirectorNames = [];
      if (
        application.postImplementation &&
        application.postImplementation.extensionRequest
      ) {
        extensionDirectorNames = application.postImplementation.extensionRequest.personnel.map(
          (person) => person.name
        );
      }

      // NDD to DD type directors
      const notIncomingResigningDirectors = application.applicants
        .filter(person => person.requestType === 'NDD to DD' || person.requestType === 'DD to NDD')
        .map(person => ({ name: person.name, direction: person.requestType, date: person.actualDateOfChange }));

      // extension request Letter
      const extensionRequestLetter =
        application.postImplementation &&
        application.postImplementation.extensionRequest
          ? application.postImplementation.extensionRequest.document
          : null;

      const extensionAccepted =
        application.postImplementation &&
        application.postImplementation.extensionRequest
          ? application.postImplementation.extensionRequest.accepted
          : null;

      const dir12sSubmitted =
        application.postImplementation && application.postImplementation.dir12s
          ? application.postImplementation.dir12sSubmitted
          : null;

      return {
        sampleExtensionRequestLetter: '/assets/files/sample.pdf',
        availableDirectors,
        selectedRequestDirectors: extensionDirectorNames,
        selectedPostImplementationDirectors: [],
        notIncomingResigningDirectors,
        submitted: !!(application.postImplementation
          ? application.postImplementation.extensionRequest
          : false),
        uploaded: extensionRequestLetter
          ? {
              name: extensionRequestLetter.name,
              url: extensionRequestLetter.url,
            }
          : null,
        verified: application.postImplementation
          ? application.postImplementation.memberConfirmation
          : false,
        postFactoChanged:
          application.postFactoChanges &&
          !application.memberNotifiedOfPostFactoChanges,
        extensionAccepted,
        dir12sSubmitted,
      };
    }));
  }

  private _updateReviewQueueItems(reviewItems: ApplicationReviewQueueItem[]): Observable<void> {
    return this.getApplicationById().pipe(tap(application => {
      const oldReviews = application.reviewQueue;
      reviewItems.forEach(item => {
        if (oldReviews.find(oi => oi.id === item.id)) {
          oldReviews.splice(oldReviews.findIndex(oi => oi.id === item.id), 1, item);
        } else {
          item.id = `${Math.floor(Math.random() * 10000000000)}`;
          oldReviews.push(item);
        }
      });
      localStorage.setItem(KEY, JSON.stringify(application));
    })).pipe(map(() => null));
  }

  /**
   * send clarifications
   * @param clarifications clarifications
   */
  sendClarificationsToMaker(clarifications: ApplicationReviewQueueItem[]): Observable<void> {
    clarifications.forEach(item => {
      if (item.origin) {
        item.origin.copied = false;
      }

      item.response.date = new Date().toJSON();
      item.lastUpdatedDate = new Date().toJSON();
      item.checked = false;
      item.copied = false;
      item.deletable = false;
      item.origin = null;
      item.sentToMaker = true;
    });

    return this._updateReviewQueueItems(clarifications);
  }

  sendClarificationsToMember(clarifications: ApplicationReviewQueueItem[]): Observable<void> {
    clarifications.forEach(item => {
      item.sentToMember = true;
      if (item.comment) { item.comment.date = new Date().toJSON(); }
      item.lastUpdatedDate = new Date().toJSON();
    });

    return this._updateReviewQueueItems(clarifications);
  }

  deleteReviews(itemsToDelete: ApplicationReviewQueueItem[]): Observable<void> {
    return this.getApplicationById().pipe(tap(application => {
      itemsToDelete.forEach(item => {
        application.reviewQueue.splice(application.reviewQueue.findIndex(oi => oi.id === item.id), 1);
      });
      localStorage.setItem(KEY, JSON.stringify(application));
    })).pipe(map(() => null));
  }

  closeReviews(itemsToClose: ApplicationReviewQueueItem[]): Observable<void> {
    itemsToClose.forEach(item => {
      item.closed = true;
      item.lastUpdatedDate = new Date().toJSON();
    });

    return this.getApplicationById().pipe(tap(application => {
      itemsToClose.forEach(item => {
        application.reviewQueue.splice(application.reviewQueue.findIndex(oi => oi.id === item.id), 1);
        application.completedReviews.push(item);
      });
      localStorage.setItem(KEY, JSON.stringify(application));
    })).pipe(map(() => null));
  }

  addToReviews(item: ApplicationReviewQueueItem): Observable<ApplicationReviewQueueItem> {
    return this.getApplicationById().pipe(tap(application => {
      item.id = `${Math.floor(Math.random() * 10000000000)}`;
      application.reviewQueue.push(item);
      localStorage.setItem(KEY, JSON.stringify(application));
    })).pipe(map(() => item));
  }

  /**
   * get application edits
   * @param clarifications clarifications to get edits
   */
  getApplicationEdits(): Observable<ApplicationEditsItem[]> {
    return this.getApplicationById().pipe(map(application => {
      const edits = [...application.reviewQueue.filter(item => item.sentToMember), ...application.completedReviews]
        .filter(item => item.isEdit);
      return edits.map(item => {
        const sectionIndex = item.section.indexOf('\n');
        const section = item.section.slice(0, sectionIndex);
        const directorIndex = item.section.slice(sectionIndex + 1).indexOf('\n');
        const director = item.section.slice(sectionIndex + 1, sectionIndex + 1 + directorIndex);
        const details = item.section.slice(sectionIndex + 1 + directorIndex + 1);
        const dateOfEdit = item.lastUpdatedDate;

        return { dateOfEdit, director, section, details };
      });
    }));
  }

  updateBasicDetails(personnel: ApplicationPersonnel[]): Observable<void> {
    return this.getApplicationById().pipe(tap(application => {
      const oldPersonnel = [...application.applicants, ...application.postFactos];
      personnel.forEach(person => {
        const oldPerson = oldPersonnel.find(p => p.id === person.id);
        oldPerson.mobileNo = person.mobileNo;
        oldPerson.emailId = person.emailId;
        oldPerson.address = person.address;
        oldPerson.educationalQualification = person.educationalQualification;
      });
      localStorage.setItem(KEY, JSON.stringify(application));
    })).pipe(map(() => null));
  }

  updateExperienceDetails(personnel: ApplicationPersonnel[]): Observable<void> {
    return this.getApplicationById().pipe(tap(application => {
      const oldPersonnel = [...application.applicants, ...application.postFactos];
      personnel.forEach(person => {
        const oldPerson = oldPersonnel.find(p => p.id === person.id);
        oldPerson.experiences = person.experiences;
      });
      localStorage.setItem(KEY, JSON.stringify(application));
    })).pipe(map(() => null));
  }

  updateProposedChanges(personnel: ApplicationPersonnel[]): Observable<void> {
    const applicationJson = localStorage.getItem(KEY);
    if (applicationJson) {
      const application = JSON.parse(applicationJson);
      const oldPersonnel = [...application.applicants, ...application.postFactos];
      personnel.forEach(person => {
        const oldPerson = oldPersonnel.find(p => p.id === person.id);
        oldPerson.proposedDateOfChange = person.proposedDateOfChange;
      });
      localStorage.setItem(KEY, JSON.stringify(application));
    }

    return of(null);
  }

  updateDeclarations(person: ApplicationPersonnel): Observable<void> {
    return this.getApplicationById().pipe(tap(application => {
      const oldPerson = [...application.applicants, ...application.postFactos].find(p => p.id === person.id);
      oldPerson.declarations = person.declarations;
      localStorage.setItem(KEY, JSON.stringify(application));
    })).pipe(map(() => null));
  }

  assignMaker(): Observable<void> {
    return this.getApplicationById().pipe(tap(application => {
      application.maker = { id: '1', name: 'Abhishek Gusain' };
      application.makerAssignedOn = new Date().toJSON();
      localStorage.setItem(KEY, JSON.stringify(application));
    })).pipe(map(() => null));
  }

  assignChecker(checker: OfficialInfoItem): Observable<void> {
    return this.getApplicationById().pipe(tap(application => {
      application.checker = checker;
      localStorage.setItem(KEY, JSON.stringify(application));
    })).pipe(map(() => null));
  }

  startReview(): Observable<void> {
    return this.getApplicationById().pipe(tap(application => {
      if (application.reviewOpenedOn) { return; }
      application.reviewOpenedOn = new Date().toJSON();
      localStorage.setItem(KEY, JSON.stringify(application));
    })).pipe(map(() => null));
  }

  /**
   * upload extension letter
   * @param id application id
   * @param file file to upload
   */
  uploadExtensionLetter(id: string, file: File): Observable<AttachmentItem> {
    return this.getFakeResponse<AttachmentItem>({
      name: `${id}_Extension Request Letter`,
      url: '/assets/files/dummy.pdf',
    });
  }

  confirmMemberPostImplementation(notIncomingResigningDirectors: NotIncomingResigningDirector[]): Observable<void> {
    return this.getApplicationById().pipe(tap(application => {
      notIncomingResigningDirectors.forEach(director => {
        const person = application.applicants.find(p => p.name === director.name);
        const deadlineDate = new Date(application.approvals.prior.date);
        deadlineDate.setMonth(deadlineDate.getMonth() + 6);

        person.actualDateOfChange = director.date;
        person.status = new Date(person.actualDateOfChange)
          > (person.extensionDate ? new Date(person.extensionDate) : new Date(deadlineDate))
          ? PI_STATUS.INCORPORATED_AFTER_DEADLINE : PI_STATUS.INCORPORATED;
      });
      application.postImplementation.memberConfirmation = true;
      application.postImplementation.mcaFailureCount = 1; // mock a MCA failure for prototype demo
      localStorage.setItem(KEY, JSON.stringify(application));
    })).pipe(map(() => null));
  }

  /**
   * submit post implementation
   */
  submitExtensionRequest(directorNames: string[], attachment: AttachmentItem): Observable<void> {
    return this.getApplicationById().pipe(tap(application => {
      const personnel = application.applicants.filter(person => directorNames.indexOf(person.name) !== -1);
      if (application.postImplementation) {
        application.postImplementation.extensionRequest = {
          personnel: personnel.map(person => ({ id: person.id, name: person.name })),
          document: {
            name: attachment.name,
            url: attachment.url,
            type: 'Extension Letter'
          }
        };
      }
      localStorage.setItem(KEY, JSON.stringify(application));
    })).pipe(map(() => null));
  }

  respondToExtensionRequest(value: boolean): Observable<void> {
    return this.getApplicationById().pipe(tap(application => {
      if (application.postImplementation) {
        application.postImplementation.extensionRequest.accepted = value;
      }
      localStorage.setItem(KEY, JSON.stringify(application));
    })).pipe(map(() => null));
  }

  updatePostImplementationDates(personnel: ApplicationPersonnel[]): Observable<void> {
    return this.getApplicationById().pipe(tap(application => {
      personnel.forEach(person => {
        const oldPerson = application.applicants.find(p => p.id === person.id);
        oldPerson.extensionDate = person.extensionDate;
        oldPerson.actualDateOfChange = person.actualDateOfChange;
        oldPerson.status = person.status;
      });
      localStorage.setItem(KEY, JSON.stringify(application));
    })).pipe(map(() => null));
  }

  requestDir12s(personnel: ApplicationPersonnel[]): Observable<{personnel: { id: string; name: string}[]}[]> {
    const dir12s = personnel.map(person => ({ personnel: [{ id: person.id, name: person.name }] }));
    return this.getApplicationById().pipe(tap(application => {
      if (application.postImplementation) {
        application.postImplementation.dir12s = dir12s;
      }
      localStorage.setItem(KEY, JSON.stringify(application));
    })).pipe(map(() => dir12s));
  }

  onMcaFailure(): Observable<void> {
    return this.getApplicationById().pipe(tap(application => {
      application.postImplementation.mcaFailureCount += 1;
      localStorage.setItem(KEY, JSON.stringify(application));
    })).pipe(map(() => {}));
  }

  onMcaSuccess(): Observable<void> {
    return this.getApplicationById().pipe(tap(application => {
      application.postImplementation.mcaVerified = true;
      localStorage.setItem(KEY, JSON.stringify(application));
    })).pipe(map(() => {}));
  }

  /**
   * submit post implementation for dir12
   * @param id application id
   */
  submitDir12s(groups: AvailableDirector[]): Observable<void> {
    const transformedGroups = groups.filter(group => group.uploaded).map(group => {
      return {
        document: { name: group.uploaded.name, url: group.uploaded.url, type: 'DIR 12' },
        names: [group.name, ...group.directors]
      };
    });

    return this.getApplicationById().pipe(tap(application => {
      if (application.postImplementation) {
        application.postImplementation.dir12s = [];
      }
      transformedGroups.forEach(group => {
        const dir12Group = {
          personnel: group.names
            .map(name => application.applicants.find(p => p.name === name))
            .map(p => ({ id: p.id, name: p.name })),
          document: group.document
        };
        if (application.postImplementation) {
          application.postImplementation.dir12s.push(dir12Group);
        }
      });
      localStorage.setItem(KEY, JSON.stringify(application));
    })).pipe(map(() => null));
  }

  /**
   * get changed post facto
   */
  getChangedPostFacto(): Observable<ChangedPostFacto[]> {
    return this.getApplicationById().pipe(map(application => application.postFactoChanges));
  }

  setPostFactoChanges(personnel: ApplicationPersonnel[]): Observable<ChangedPostFacto[]> {
    return this.getApplicationById().pipe(map(application => {
      application.postFactoChanges = personnel.map(person => {
        return {
          director: person.name,
          change: randomPick(['Existing Director as per MCA records', 'Ex-Director as per MCA records'])
        };
      });
      localStorage.setItem(KEY, JSON.stringify(application));
      return application.postFactoChanges;
    }));
  }

  memberNotifiedOfPostFactoChanges(): Observable<void> {
    return this.getApplicationById().pipe(tap(application => {
      application.memberNotifiedOfPostFactoChanges = true;
      localStorage.setItem(KEY, JSON.stringify(application));
    })).pipe(map(() => null));
  }

  /**
   * get oloc application chart data
   */
  getOlocApplicationChartData(): Observable<ApplicationChartData[]> {
    const now = new Date();
    const currentMonth = now.getMonth();
    const data: ApplicationChartData[] = [];
    const datePipe = new DatePipe('en-US');
    // request options
    const requestOptions: string[] = [
      'Enablement',
      'Connectivity',
      'Noitacoloc',
    ];

    for (let i = currentMonth - 5; i <= currentMonth; i++) {
      const date = new Date(now.getFullYear(), i, 1);
      data.push({
        month: datePipe.transform(date, 'MMMM'),
        keyApprovals: randomNumber(0, 900),
        mandatorySubmissions: 0,
        otherCompliances: 0,
        date,
        stseuqeR: requestOptions[randomNumber(0, 2)],
      });
    }
    return this.getFakeResponse(data);
  }

  /**
   * get oloc application summary
   */
  getOlocApplicationSummary(): Observable<SplitApplicationSummary> {
    return this.getFakeResponse({
      keyApprovals: {
        actionUnderReview: randomNumber(200, 600),
        applicationCompleted: randomNumber(50, 200),
        applicationProgress: randomNumber(10, 50),
      },
      mandatorySubmissions: {
        actionUnderReview: randomNumber(200, 600),
        applicationCompleted: randomNumber(50, 200),
        applicationProgress: randomNumber(10, 50),
      },
      otherCompliances: {
        actionUnderReview: randomNumber(200, 600),
        applicationCompleted: randomNumber(50, 200),
        applicationProgress: randomNumber(10, 50),
      }
    });
  }

  /**
   * get oloc split application summary
   */
  getOlocSplitApplicationSummary(): Observable<SplitApplicationSummary> {
    return this.getFakeResponse({
      keyApprovals: {
        actionUnderReview: randomNumber(100, 200),
        applicationCompleted: randomNumber(30, 90),
        applicationProgress: randomNumber(10, 50),
      },
      mandatorySubmissions: {
        actionUnderReview: randomNumber(200, 600),
        applicationCompleted: randomNumber(50, 200),
        applicationProgress: randomNumber(10, 50),
      },
      otherCompliances: {
        actionUnderReview: randomNumber(20, 50),
        applicationCompleted: randomNumber(50, 70),
        applicationProgress: randomNumber(75, 95),
      }
    });
  }

  /**
   * get completed clarifications
   */
  getKcarStatus(): Observable<any> {
    const kcarData = {
      'Phase 1-Wing B2 Floor1': [
        [
          {
            label: 'A1-F',
            status: 'free'
          }, {
            label: 'A2-F',
            status: 'free'
          }, {
            label: 'A3-F',
            status: null
          }, {
            label: 'A4-F',
            status: null
          }, {
            label: 'A5-F',
            status: 'in-use'
          }, {
            label: 'A6-F',
            status: 'in-use'
          }, {
            label: 'A7-F',
            status: 'null'
          }, {
            label: 'A8-F',
            status: 'null'
          }, {
            label: 'A9-F',
            status: 'null'
          }
        ],
        [
          {
            label: 'B1-F',
            status: 'free'
          }, {
            label: 'B2-F',
            status: 'free'
          }, {
            label: 'B3-F',
            status: null
          }, {
            label: 'B4-F',
            status: null
          }, {
            label: 'B5-F',
            status: 'in-use'
          }, {
            label: 'B6-F',
            status: 'in-use'
          }, {
            label: 'B7-F',
            status: null
          }, {
            label: 'B8-F',
            status: null
          }, {
            label: 'B9-F',
            status: 'in-use'
          }, {
            label: 'B10-F',
            status: 'in-use'
          }, {
            label: 'B11-F',
            status: 'in-use'
          }, {
            label: 'B12-F',
            status: 'in-use'
          },
        ],
        [
          {
            label: 'C1-F',
            status: 'free'
          }, {
            label: 'C2-F',
            status: 'free'
          }, {
            label: 'C3-F',
            status: null
          }, {
            label: 'C4-F',
            status: null
          }, {
            label: 'C5-F',
            status: 'in-use'
          }, {
            label: 'C6-F',
            status: 'in-use'
          }, {
            label: 'C7-F',
            status: 'free'
          }, {
            label: 'C8-F',
            status: 'free'
          }, {
            label: 'C9-F',
            status: 'in-use'
          }, {
            label: 'C10-F',
            status: 'in-use'
          }, {
            label: 'C11-F',
            status: 'in-use'
          }, {
            label: 'C12-F',
            status: 'in-use'
          },
        ],
        [
          {
            label: 'D1-F',
            status: 'in-use'
          }, {
            label: 'D2-F',
            status: 'in-use'
          }, {
            label: 'D3-F',
            status: 'in-use'
          }, {
            label: 'D4-F',
            status: 'in-use'
          }, {
            label: 'D5-F',
            status: 'in-use'
          }, {
            label: 'D6-F',
            status: 'in-use'
          }, {
            label: 'D7-F',
            status: 'in-use'
          }, {
            label: 'D8-F',
            status: 'in-use'
          }, {
            label: 'D9-F',
            status: 'in-use'
          }, {
            label: 'D10-F',
            status: 'in-use'
          }, {
            label: 'D11-F',
            status: 'in-use'
          }, {
            label: 'D12-F',
            status: 'in-use'
          },
        ],
        [
          {
            label: 'E1-F',
            status: 'free'
          }, {
            label: 'E2-F',
            status: 'in-use'
          }, {
            label: 'E3-F',
            status: 'in-use'
          }, {
            label: 'E4-F',
            status: 'free'
          }, {
            label: 'E5-F',
            status: 'in-use'
          }, {
            label: 'E6-F',
            status: 'free'
          }, {
            label: 'E7-F',
            status: 'in-use'
          }, {
            label: 'E8-F',
            status: 'in-use'
          }, {
            label: 'E9-F',
            status: 'in-use'
          }, {
            label: 'E10-F',
            status: 'in-use'
          }, {
            label: 'E11-F',
            status: 'in-use'
          }, {
            label: 'E12-F',
            status: 'in-use'
          },
        ]
      ],
    'Phase 2-Wing B2 Floor1': [
      [
        {
          label: 'A1-F',
          status: 'free'
        }, {
          label: 'A2-F',
          status: 'free'
        }, {
          label: 'A3-F',
          status: 'free'
        }, {
          label: 'A4-F',
          status: 'free'
        }, {
          label: 'A5-F',
          status: 'free'
        }, {
          label: 'A6-F',
          status: 'free'
        }, {
          label: 'A7-F',
          status: 'free'
        }, {
          label: 'A8-F',
          status: 'free'
        }, {
          label: 'A9-F',
          status: 'free'
        }
      ],
      [
        {
          label: 'B1-F',
          status: 'free'
        }, {
          label: 'B2-F',
          status: 'free'
        }, {
          label: 'B3-F',
          status: 'free'
        }, {
          label: 'B4-F',
          status: 'free'
        }, {
          label: 'B5-F',
          status: 'free'
        }, {
          label: 'B6-F',
          status: 'free'
        }, {
          label: 'B7-F',
          status: 'free'
        }, {
          label: 'B8-F',
          status: 'free'
        }, {
          label: 'B9-F',
          status: 'free'
        }, {
          label: 'B10-F',
          status: 'free'
        }, {
          label: 'B11-F',
          status: 'free'
        }, {
          label: 'B12-F',
          status: 'free'
        },
      ],
      [
        {
          label: 'C1-F',
          status: 'free'
        }, {
          label: 'C2-F',
          status: 'free'
        }, {
          label: 'C3-F',
          status: null
        }, {
          label: 'C4-F',
          status: null
        }, {
          label: 'C5-F',
          status: 'in-use'
        }, {
          label: 'C6-F',
          status: 'in-use'
        }, {
          label: 'C7-F',
          status: 'free'
        }, {
          label: 'C8-F',
          status: 'free'
        }, {
          label: 'C9-F',
          status: 'in-use'
        }, {
          label: 'C10-F',
          status: 'in-use'
        }, {
          label: 'C11-F',
          status: 'in-use'
        }, {
          label: 'C12-F',
          status: 'in-use'
        },
      ],
      [
        {
          label: 'D1-F',
          status: 'in-use'
        }, {
          label: 'D2-F',
          status: 'in-use'
        }, {
          label: 'D3-F',
          status: 'in-use'
        }, {
          label: 'D4-F',
          status: 'in-use'
        }, {
          label: 'D5-F',
          status: 'in-use'
        }, {
          label: 'D6-F',
          status: 'in-use'
        }, {
          label: 'D7-F',
          status: 'in-use'
        }, {
          label: 'D8-F',
          status: 'in-use'
        }, {
          label: 'D9-F',
          status: 'in-use'
        }, {
          label: 'D10-F',
          status: 'in-use'
        }, {
          label: 'D11-F',
          status: 'in-use'
        }, {
          label: 'D12-F',
          status: 'in-use'
        },
      ],
      [
        {
          label: 'E1-F',
          status: 'free'
        }, {
          label: 'E2-F',
          status: 'in-use'
        }, {
          label: 'E3-F',
          status: 'in-use'
        }, {
          label: 'E4-F',
          status: 'free'
        }, {
          label: 'E5-F',
          status: 'in-use'
        }, {
          label: 'E6-F',
          status: 'free'
        }, {
          label: 'E7-F',
          status: 'in-use'
        }, {
          label: 'E8-F',
          status: 'in-use'
        }, {
          label: 'E9-F',
          status: 'in-use'
        }, {
          label: 'E10-F',
          status: 'in-use'
        }, {
          label: 'E11-F',
          status: 'in-use'
        }, {
          label: 'E12-F',
          status: 'in-use'
        },
      ]
    ],
    'Phase 3-Wing B2 Floor2': [
      [
        {
          label: 'A1-F',
          status: null
        }, {
          label: 'A2-F',
          status: null
        }, {
          label: 'A3-F',
          status: null
        }, {
          label: 'A4-F',
          status: null
        }, {
          label: 'A5-F',
          status: null
        }, {
          label: 'A6-F',
          status: null
        }, {
          label: 'A7-F',
          status: null
        }, {
          label: 'A8-F',
          status: null
        }, {
          label: 'A9-F',
          status: null
        }
      ],
      [
        {
          label: 'B1-F',
          status: null
        }, {
          label: 'B2-F',
          status: null
        }, {
          label: 'B3-F',
          status: null
        }, {
          label: 'B4-F',
          status: null
        }, {
          label: 'B5-F',
          status: null
        }, {
          label: 'B6-F',
          status: null
        }, {
          label: 'B7-F',
          status: null
        }, {
          label: 'B8-F',
          status: null
        }, {
          label: 'B9-F',
          status: null
        }, {
          label: 'B10-F',
          status: null
        }, {
          label: 'B11-F',
          status: null
        }, {
          label: 'B12-F',
          status: null
        },
      ],
      [
        {
          label: 'C1-F',
          status: 'free'
        }, {
          label: 'C2-F',
          status: 'free'
        }, {
          label: 'C3-F',
          status: null
        }, {
          label: 'C4-F',
          status: null
        }, {
          label: 'C5-F',
          status: 'in-use'
        }, {
          label: 'C6-F',
          status: 'in-use'
        }, {
          label: 'C7-F',
          status: 'free'
        }, {
          label: 'C8-F',
          status: 'free'
        }, {
          label: 'C9-F',
          status: 'in-use'
        }, {
          label: 'C10-F',
          status: 'in-use'
        }, {
          label: 'C11-F',
          status: 'in-use'
        }, {
          label: 'C12-F',
          status: 'in-use'
        },
      ],
      [
        {
          label: 'D1-F',
          status: 'in-use'
        }, {
          label: 'D2-F',
          status: 'in-use'
        }, {
          label: 'D3-F',
          status: 'in-use'
        }, {
          label: 'D4-F',
          status: 'in-use'
        }, {
          label: 'D5-F',
          status: 'in-use'
        }, {
          label: 'D6-F',
          status: 'in-use'
        }, {
          label: 'D7-F',
          status: 'in-use'
        }, {
          label: 'D8-F',
          status: 'in-use'
        }, {
          label: 'D9-F',
          status: 'in-use'
        }, {
          label: 'D10-F',
          status: 'in-use'
        }, {
          label: 'D11-F',
          status: 'in-use'
        }, {
          label: 'D12-F',
          status: 'in-use'
        },
      ],
      [
        {
          label: 'E1-F',
          status: 'free'
        }, {
          label: 'E2-F',
          status: 'in-use'
        }, {
          label: 'E3-F',
          status: 'in-use'
        }, {
          label: 'E4-F',
          status: 'free'
        }, {
          label: 'E5-F',
          status: 'in-use'
        }, {
          label: 'E6-F',
          status: 'free'
        }, {
          label: 'E7-F',
          status: 'in-use'
        }, {
          label: 'E8-F',
          status: 'in-use'
        }, {
          label: 'E9-F',
          status: 'in-use'
        }, {
          label: 'E10-F',
          status: 'in-use'
        }, {
          label: 'E11-F',
          status: 'in-use'
        }, {
          label: 'E12-F',
          status: 'in-use'
        },
      ]
    ]
  };

    return of(kcarData);
  }
}
