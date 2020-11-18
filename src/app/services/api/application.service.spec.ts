import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import {
  mockApplication,
  mockApplicationReviewQueueItem,
} from 'src/assets/data/application/mock-application';
import {
  mockApplicationReview,
  mockPersonnel,
} from 'src/assets/data/application/mock-application-review';

import { ApplicationService } from './application.service';
import { AvailableDirector } from 'src/app/models/post-implementation-detail';

const KEY = 'application';
const ORIGINAL_KEY = 'original_application';

describe('ApplicationService', () => {
  let http: HttpClient;
  let service: ApplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestSharedModule],
    }).compileComponents();

    http = TestBed.inject(HttpClient);
    service = TestBed.inject(ApplicationService);
    localStorage.removeItem(KEY);
    localStorage.removeItem(ORIGINAL_KEY);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show mock condition', () => {
    const demoApplicationWithoutPostFactos = service.demoApplicationWithoutPostFactos();
    expect(
      demoApplicationWithoutPostFactos === true ||
        demoApplicationWithoutPostFactos === false
    ).toBeTruthy();
  });

  it('should return correct application', () => {
    spyOn(http, 'get').and.returnValue(of(mockApplication));
    let result = [];
    service
      .searchApplications({
        year: {
          year: 0,
          month: 0,
          start: 0,
          end: 0,
        },
        memberCode: '',
        memberName: '',
        requestType: '',
        applicationId: '',
      })
      .subscribe({
        next: (res) => (result = res),
      });
    expect(result.length).toEqual(100);
    service
      .searchApplications({
        year: {
          year: 10,
          month: 10,
          start: 0,
          end: 0,
        },
        memberCode: '',
        memberName: '',
        requestType: '',
        applicationId: '',
      })
      .subscribe({
        next: (res) => (result = res),
      });
    expect(result.length).toEqual(0);
    service
      .searchApplications({
        year: {
          year: 2018,
          month: 10,
          start: 0,
          end: 0,
        },
        memberCode: '',
        memberName: '',
        requestType: '',
        applicationId: '',
      })
      .subscribe({
        next: (res) => (result = res),
      });
    expect(result.length).toEqual(3);
    service
      .searchApplications({
        year: {
          year: 10,
          month: null,
          start: 10,
          end: 10,
        },
        memberCode: '',
        memberName: '',
        requestType: '',
        applicationId: '',
      })
      .subscribe({
        next: (res) => (result = res),
      });
    expect(result.length).toEqual(0);
    service
      .searchApplications({
        year: {
          year: 10,
          month: null,
          start: null,
          end: 10,
        },
        memberCode: '',
        memberName: '',
        requestType: '',
        applicationId: '',
      })
      .subscribe({
        next: (res) => (result = res),
      });
    expect(result.length).toEqual(0);
    service
      .searchApplications({
        year: {
          year: 10,
          month: null,
          start: 10,
          end: null,
        },
        memberCode: '',
        memberName: '',
        requestType: '',
        applicationId: '',
      })
      .subscribe({
        next: (res) => (result = res),
      });
    expect(result.length).toEqual(0);
    service
      .searchApplications({
        year: {
          year: 2018,
          month: null,
          start: 10,
          end: 10,
        },
        memberCode: '',
        memberName: '',
        requestType: '',
        applicationId: '',
      })
      .subscribe({
        next: (res) => (result = res),
      });
    expect(result.length).toEqual(3);
    service
      .searchApplications({
        year: {
          year: 10,
          month: null,
          start: null,
          end: null,
        },
        memberCode: 'test',
        memberName: 'test',
        requestType: 'test',
        applicationId: 'test',
      })
      .subscribe({
        next: (res) => (result = res),
      });
    expect(result.length).toEqual(0);
  });

  it('should return correct application detail', () => {
    spyOn(http, 'get').and.returnValue(of(_.cloneDeep(mockApplicationReview)));
    service.demoApplicationWithoutPostFactos = () => true;
    service.getApplicationById('1').subscribe((applicationInfo) => {
      expect(applicationInfo.postFactos.length).toEqual(0);
    });
    service.demoApplicationWithoutPostFactos = () => false;
    localStorage.removeItem(KEY);
    service.getApplicationById('1').subscribe((applicationInfo) => {
      expect(applicationInfo.postFactos.length).toEqual(0);
    });

    const mockApplicationInfo = _.cloneDeep(mockApplicationReview);
    localStorage.setItem(KEY, JSON.stringify(mockApplicationInfo));
    service.getApplicationById('1').subscribe((applicationInfo) => {
      expect(applicationInfo).toEqual(mockApplicationInfo);
    });
  });

  it('should return correct original application detail', () => {
    const mockApplicationInfo = _.cloneDeep(mockApplicationReview);
    spyOn(http, 'get').and.returnValue(of(mockApplicationInfo));
    service.getOriginalApplicationById('1').subscribe((applicationInfo) => {
      expect(applicationInfo).toEqual(mockApplicationInfo);
    });

    localStorage.setItem(ORIGINAL_KEY, JSON.stringify(mockApplicationInfo));
    service.getOriginalApplicationById('1').subscribe((applicationInfo) => {
      expect(applicationInfo).toEqual(mockApplicationInfo);
    });
  });

  it('should return correct application chart data', fakeAsync(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    service
      .getApplicationChartData()
      .subscribe((datas) => expect(datas.length).toEqual(currentMonth + 1));
    tick(1000);
  }));

  it('should return correct last monthly applications', fakeAsync(() => {
    service.getLastMonthlyApplications().subscribe((data) => {
      expect(data.applicationCompleted).toBeTruthy();
      expect(data.actionUnderReview).toBeTruthy();
    });
    tick(1000);
  }));

  it('should return correct split application summary', fakeAsync(() => {
    service.getSplitApplicationSummary().subscribe((data) => {
      expect(data.keyApprovals).toBeTruthy();
      expect(data.mandatorySubmissions).toBeTruthy();
      expect(data.otherCompliances).toBeTruthy();
    });
    tick(1000);
  }));

  it('should return correct split application detailed summaries', fakeAsync(() => {
    service.getApplicationDetailedSummaries().subscribe((data) => {
      expect(data.applicationUnderReview).toBeTruthy();
      expect(data.applicationCompleted).toBeTruthy();
    });
    tick(1000);
  }));

  it('should return correct member applications', () => {
    spyOn(http, 'get').and.returnValue(of(mockApplication));
    service
      .getMemberApplications(new Date(2010, 7, 6), new Date(2010, 7, 6))
      .subscribe((datas) => {
        expect(datas.length).toEqual(0);
      });
    service.getMemberApplications(null, null).subscribe((datas) => {
      expect(datas.length).toEqual(100);
    });
  });

  it('should return correct oloc application chart data', fakeAsync(() => {
    service.getOlocApplicationChartData().subscribe((datas) => {
      expect(datas.length).toBeTruthy();
    });
    tick(2000);
  }));

  it('should return correct kcar status', () => {
    service.getKcarStatus().subscribe((data) => {
      expect(data).toBeTruthy();
    });
  });

  it('should return correct oloc application summary', fakeAsync(() => {
    service.getOlocApplicationSummary().subscribe((data) => {
      expect(data.keyApprovals).toBeTruthy();
      expect(data.mandatorySubmissions).toBeTruthy();
      expect(data.otherCompliances).toBeTruthy();
    });
    tick(2000);
  }));

  it('should return correct oloc split application summary', fakeAsync(() => {
    service.getOlocSplitApplicationSummary().subscribe((data) => {
      expect(data.keyApprovals).toBeTruthy();
      expect(data.mandatorySubmissions).toBeTruthy();
      expect(data.otherCompliances).toBeTruthy();
    });
    tick(2000);
  }));

  it('should delete applications success', fakeAsync(() => {
    spyOn(http, 'get').and.returnValue(of(mockApplication));
    service.deleteApplications(mockApplication).subscribe((rs) => {
      expect(rs).toEqual(null);
    });
    tick(1000);
  }));

  it('should return correct application tracking detail', fakeAsync(() => {
    const applicationReview = _.cloneDeep(mockApplicationReview);
    applicationReview.reviewQueue = [];
    applicationReview.completedReviews = [];
    applicationReview.approvals = {
      completed: true,
      prior: {
        accepted: false,
        comments: [],
        approvalLetter: null,
      },
      postFacto: null,
    };
    spyOn(service, 'getApplicationById').and.returnValue(of(applicationReview));
    service.getApplicationTrackingDetail().subscribe((data) => {
      expect(data.clarificationRequired).toEqual(false);
    });
    tick(1000);
  }));

  it('should return correct under review detail', fakeAsync(() => {
    const spyOnGetApplicationInfo = spyOn(
      service,
      'getApplicationById'
    ).and.returnValue(of(_.cloneDeep(mockApplicationReview)));
    service.getUnderReviewDetail().subscribe((data) => {
      expect(data.reviewClosed).toBeNull();
    });
    tick(1000);

    const applicationInfo = _.cloneDeep(mockApplicationReview);
    applicationInfo.approvals = {
      completed: true,
      prior: {
        accepted: false,
        comments: [],
        approvalLetter: null,
        date: new Date(2015, 1, 1),
      },
      postFacto: null,
    };
    spyOnGetApplicationInfo.and.returnValue(of(applicationInfo));
    service.getUnderReviewDetail().subscribe((data) => {
      expect(data.reviewClosed).toEqual(new Date(2015, 1, 1));
    });
    tick(1000);
  }));

  it('should send classification', fakeAsync(() => {
    spyOn(service, 'getApplicationById').and.returnValue(
      of(_.cloneDeep(mockApplicationReview))
    );
    const classifications = [
      _.cloneDeep(mockApplicationReviewQueueItem),
      _.cloneDeep(mockApplicationReviewQueueItem),
    ];
    classifications[1].origin = classifications[0];
    classifications[1].comment = null;
    service.sendClarificationsToMaker(classifications).subscribe((data) => {
      expect(data).toEqual(null);
    });
    tick(1000);
    service.sendClarificationsToMember(classifications).subscribe((data) => {
      expect(data).toEqual(null);
    });
    tick(1000);
  }));

  it('should delete reviews', fakeAsync(() => {
    const applicationReview = _.cloneDeep(mockApplicationReview);
    spyOn(service, 'getApplicationById').and.returnValue(of(applicationReview));
    const classifications = [
      _.cloneDeep(mockApplicationReviewQueueItem),
      _.cloneDeep(mockApplicationReviewQueueItem),
    ];
    classifications[1].origin = classifications[0];
    classifications[1].comment = null;
    applicationReview.reviewQueue = _.cloneDeep(classifications);
    service.deleteReviews(classifications).subscribe((data) => {
      expect(applicationReview.reviewQueue.length).toEqual(0);
    });
    tick(1000);
  }));

  it('should close reviews', fakeAsync(() => {
    const applicationReview = _.cloneDeep(mockApplicationReview);
    spyOn(service, 'getApplicationById').and.returnValue(of(applicationReview));
    const classifications = [
      _.cloneDeep(mockApplicationReviewQueueItem),
      _.cloneDeep(mockApplicationReviewQueueItem),
    ];
    classifications[1].origin = classifications[0];
    classifications[1].comment = null;
    applicationReview.reviewQueue = _.cloneDeep(classifications);
    service.closeReviews(classifications).subscribe((data) => {
      expect(applicationReview.reviewQueue.length).toEqual(0);
    });
    tick(1000);
  }));

  it('should add reviews', fakeAsync(() => {
    const applicationReview = _.cloneDeep(mockApplicationReview);
    spyOn(service, 'getApplicationById').and.returnValue(of(applicationReview));
    service
      .addToReviews(_.cloneDeep(mockApplicationReviewQueueItem))
      .subscribe((data) => {
        expect(applicationReview.reviewQueue.length).toEqual(6);
      });
    tick(1000);
  }));

  it('should get prior approval detail', fakeAsync(() => {
    const applicationReview = _.cloneDeep(mockApplicationReview);
    spyOn(service, 'getApplicationById').and.returnValue(of(applicationReview));
    service.getPriorApprovalDetail().subscribe((data) => {
      expect(data.approvals).toBeTruthy();
      expect(data.documents).toBeTruthy();
    });

    applicationReview.approvals = {
      completed: true,
      prior: {
        accepted: false,
        comments: [],
        approvalLetter: null,
        status: 'Rejected',
      },
      postFacto: null,
    };
    service.getPriorApprovalDetail().subscribe((data) => {
      expect(data.approvals.length).toEqual(1);
      expect(data.documents.length).toEqual(0);
    });

    applicationReview.approvals = {
      completed: true,
      prior: {
        accepted: false,
        comments: [],
        approvalLetter: {
          name: 'string',
          url: 'string',
        },
        status: 'Granted',
      },
      postFacto: {
        accepted: false,
        comments: [],
        status: 'Granted',
        warningLetter: {
          name: 'string',
          url: 'string',
        },
      },
    };
    applicationReview.reviewQueue = [
      _.cloneDeep(mockApplicationReviewQueueItem),
    ];
    applicationReview.reviewQueue[0].sentToMember = true;
    applicationReview.reviewQueue[0].isEdit = true;
    service.getPriorApprovalDetail().subscribe((data) => {
      expect(data.approvals.length).toEqual(2);
      expect(data.documents.length).toEqual(3);
    });

    applicationReview.approvals.postFacto.status = 'Rejected';
    service.getPriorApprovalDetail().subscribe((data) => {
      expect(data.approvals.length).toEqual(2);
      expect(data.documents.length).toEqual(3);
    });
    tick(1000);
  }));

  it('should update approvals', fakeAsync(() => {
    const oldApplication = _.cloneDeep(mockApplicationReview);
    spyOn(service, 'getApplicationById').and.returnValue(of(oldApplication));
    const application = _.cloneDeep(mockApplicationReview);
    service.updateApprovals(application).subscribe((data) => {
      expect(data).toEqual(null);
    });

    application.postImplementation = null;
    application.approvals = {
      completed: true,
      prior: {
        accepted: true,
        comments: [],
        approvalLetter: {
          name: 'string',
          url: 'string',
        },
        status: 'Granted',
      },
      postFacto: {
        accepted: false,
        comments: [],
        status: 'Granted',
        warningLetter: {
          name: 'string',
          url: 'string',
        },
      },
    };
    service.updateApprovals(application).subscribe((data) => {
      expect(data).toEqual(null);
    });
    tick(1000);
  }));

  it('should create prior approval', fakeAsync(() => {
    spyOn(service, 'getApplicationById').and.returnValue(
      of(_.cloneDeep(mockApplicationReview))
    );
    service.getPriorApprovalDetail().subscribe((data) => {
      expect(data.approvals).toBeTruthy();
      expect(data.documents).toBeTruthy();
    });
    tick(1000);
    service.getPriorApprovalDetail().subscribe((data) => {
      expect(data.approvals).toBeTruthy();
      expect(data.documents).toBeTruthy();
    });
    tick(1000);
    service.getPriorApprovalDetail().subscribe((data) => {
      expect(data.approvals).toBeTruthy();
      expect(data.documents.length).toEqual(0);
    });
    tick(1000);
  }));

  it('should get classifications', fakeAsync(() => {
    spyOn(service, 'getApplicationById').and.returnValue(
      of(_.cloneDeep(mockApplicationReview))
    );
    service.getClarifications().subscribe((data) => {
      expect(data).toBeTruthy();
    });
    tick(1000);
  }));

  it('should get completed classifications', fakeAsync(() => {
    const applicationReview = _.cloneDeep(mockApplicationReview);
    applicationReview.completedReviews = [
      _.cloneDeep(mockApplicationReviewQueueItem),
    ];
    applicationReview.completedReviews[0].sentToMember = true;
    applicationReview.completedReviews[0].response = null;
    spyOn(service, 'getApplicationById').and.returnValue(of(applicationReview));
    service.getCompletedClarifications().subscribe((data) => {
      expect(data).toBeTruthy();
    });
    tick(1000);
  }));

  it('should get post implementation detail', fakeAsync(() => {
    const applicationReview = _.cloneDeep(mockApplicationReview);
    spyOn(service, 'getApplicationById').and.returnValue(of(applicationReview));
    applicationReview.postImplementation.dir12s[0].personnel.push({
      id: '2',
      name: 'Rishab Kapoor 2',
    });
    applicationReview.postImplementation.dir12s.push(
      _.cloneDeep(applicationReview.postImplementation.dir12s[0])
    );
    applicationReview.postImplementation.dir12s[1].document = null;
    applicationReview.postImplementation.dir12s[1].personnel[0].id = '2';
    applicationReview.applicants.push(
      _.cloneDeep(applicationReview.applicants[0])
    );
    applicationReview.applicants[1].id = '2';
    applicationReview.applicants[1].requestType = 'DD to NDD';

    service.getPostImplementationDetail().subscribe((data) => {
      expect(data).toBeTruthy();
      expect(data.notIncomingResigningDirectors.length).toEqual(1);
    });

    applicationReview.postImplementation = null;
    applicationReview.postFactoChanges = [];
    service.getPostImplementationDetail().subscribe((data) => {
      expect(data).toBeTruthy();
      expect(data.postFactoChanged).toBeTruthy();
    });
    tick(1000);
  }));

  it('should get completed review', fakeAsync(() => {
    const applicationReview = _.cloneDeep(mockApplicationReview);
    applicationReview.completedReviews = [
      _.cloneDeep(mockApplicationReviewQueueItem),
    ];
    applicationReview.completedReviews[0].sentToMember = true;
    applicationReview.completedReviews[0].response = null;
    spyOn(service, 'getApplicationById').and.returnValue(of(applicationReview));
    service.getCompletedReviews().subscribe((datas) => {
      expect(datas).toBeTruthy();
    });
    tick(1000);
  }));

  it('should get application edits', fakeAsync(() => {
    const application = _.cloneDeep(mockApplicationReview);
    spyOn(service, 'getApplicationById').and.returnValue(of(application));
    application.reviewQueue[0].sentToMember = true;
    application.reviewQueue[0].isEdit = true;
    service.getApplicationEdits().subscribe((datas) => {
      expect(datas.length).toEqual(1);
    });
    tick(1000);
  }));

  it('should update basic details', fakeAsync(() => {
    const application = _.cloneDeep(mockApplicationReview);
    spyOn(service, 'getApplicationById').and.returnValue(of(application));
    service
      .updateBasicDetails([_.cloneDeep(mockPersonnel)])
      .subscribe((datas) => {
        expect(datas).toEqual(null);
      });
    tick(1000);
  }));

  it('should update experience details', fakeAsync(() => {
    const application = _.cloneDeep(mockApplicationReview);
    spyOn(service, 'getApplicationById').and.returnValue(of(application));
    service
      .updateExperienceDetails([_.cloneDeep(mockPersonnel)])
      .subscribe((datas) => {
        expect(datas).toEqual(null);
      });
    tick(1000);
  }));

  it('should update proposed changes', fakeAsync(() => {
    const application = _.cloneDeep(mockApplicationReview);
    spyOn(service, 'getApplicationById').and.returnValue(of(application));
    service
      .updateProposedChanges([_.cloneDeep(mockPersonnel)])
      .subscribe((datas) => {
        expect(datas).toEqual(null);
      });

    localStorage.setItem(KEY, JSON.stringify(application));
    service
      .updateProposedChanges([_.cloneDeep(mockPersonnel)])
      .subscribe((datas) => {
        expect(datas).toEqual(null);
      });
    tick(1000);
  }));

  it('should update declarations', fakeAsync(() => {
    const application = _.cloneDeep(mockApplicationReview);
    spyOn(service, 'getApplicationById').and.returnValue(of(application));
    service
      .updateDeclarations(_.cloneDeep(mockPersonnel))
      .subscribe((datas) => {
        expect(datas).toEqual(null);
      });
    tick(1000);
  }));

  it('should assign maker', fakeAsync(() => {
    const application = _.cloneDeep(mockApplicationReview);
    spyOn(service, 'getApplicationById').and.returnValue(of(application));
    service.assignMaker().subscribe((datas) => {
      expect(datas).toEqual(null);
    });
    tick(1000);
  }));

  it('should assign checker', fakeAsync(() => {
    const application = _.cloneDeep(mockApplicationReview);
    spyOn(service, 'getApplicationById').and.returnValue(of(application));
    service
      .assignChecker({
        id: '1',
        name: 'name',
      })
      .subscribe((datas) => {
        expect(datas).toEqual(null);
      });
    tick(1000);
  }));

  it('should confirm member post implementation', fakeAsync(() => {
    const application = _.cloneDeep(mockApplicationReview);
    application.approvals = {
      completed: true,
      prior: {
        accepted: false,
        comments: [],
        approvalLetter: null,
        date: new Date(2010, 7, 6),
      },
      postFacto: null,
    };

    spyOn(service, 'getApplicationById').and.returnValue(of(application));
    service
      .confirmMemberPostImplementation([
        {
          name: 'Rishab Kapoor',
          direction: 'string',
          date: new Date(2010, 7, 6),
        },
      ])
      .subscribe((datas) => {
        expect(datas).toEqual(null);
      });

    service
      .confirmMemberPostImplementation([
        {
          name: 'Rishab Kapoor',
          direction: 'string',
          date: new Date(2015, 7, 6),
        },
      ])
      .subscribe((datas) => {
        expect(datas).toEqual(null);
      });

    application.applicants[0].extensionDate = new Date(2015, 7, 6);
    service
      .confirmMemberPostImplementation([
        {
          name: 'Rishab Kapoor',
          direction: 'string',
          date: new Date(2015, 7, 6),
        },
      ])
      .subscribe((datas) => {
        expect(datas).toEqual(null);
      });
    tick(1000);
  }));

  it('should start review', fakeAsync(() => {
    const application = _.cloneDeep(mockApplicationReview);
    spyOn(service, 'getApplicationById').and.returnValue(of(application));
    service.startReview().subscribe((datas) => {
      expect(datas).toEqual(null);
    });

    application.reviewOpenedOn = null;
    service.startReview().subscribe((datas) => {
      expect(datas).toEqual(null);
    });
    tick(1000);
  }));

  it('should update extension letter', fakeAsync(() => {
    service
      .uploadExtensionLetter(
        '1234',
        new File([new Blob()], 'dummy.pdf', { type: 'pdf' })
      )
      .subscribe((data) => {
        expect(data.name).toContain('1234');
      });
    tick(1000);
  }));

  it('should submit extension request', fakeAsync(() => {
    const application = _.cloneDeep(mockApplicationReview);
    spyOn(service, 'getApplicationById').and.returnValue(of(application));
    service
      .submitExtensionRequest(['Rishab Kapoor'], {
        name: 'string',
        url: 'string',
      })
      .subscribe((data) => {
        expect(data).toEqual(null);
      });
    application.postImplementation = null;
    service
      .submitExtensionRequest([], {
        name: 'string',
        url: 'string',
      })
      .subscribe((data) => {
        expect(data).toEqual(null);
      });
    tick(1000);
  }));

  it('should submit extension request', fakeAsync(() => {
    const application = _.cloneDeep(mockApplicationReview);
    spyOn(service, 'getApplicationById').and.returnValue(of(application));
    service.respondToExtensionRequest(true).subscribe((data) => {
      expect(data).toEqual(null);
    });
    application.postImplementation = null;
    service.respondToExtensionRequest(false).subscribe((data) => {
      expect(data).toEqual(null);
    });
    tick(1000);
  }));

  it('should update post implementation dates', fakeAsync(() => {
    const application = _.cloneDeep(mockApplicationReview);
    spyOn(service, 'getApplicationById').and.returnValue(of(application));
    service.updatePostImplementationDates([mockPersonnel]).subscribe((data) => {
      expect(data).toEqual(null);
    });
    tick(1000);
  }));

  it('should submit mca failure', fakeAsync(() => {
    const application = _.cloneDeep(mockApplicationReview);
    spyOn(service, 'getApplicationById').and.returnValue(of(application));
    service.onMcaFailure().subscribe((data) => {
      expect(data).toEqual(undefined);
    });
    tick(1000);
  }));

  it('should submit mca success', fakeAsync(() => {
    const application = _.cloneDeep(mockApplicationReview);
    spyOn(service, 'getApplicationById').and.returnValue(of(application));
    service.onMcaSuccess().subscribe((data) => {
      expect(data).toEqual(undefined);
    });
    tick(1000);
  }));

  it('should request dir 12s', fakeAsync(() => {
    const application = _.cloneDeep(mockApplicationReview);
    spyOn(service, 'getApplicationById').and.returnValue(of(application));
    service.requestDir12s([mockPersonnel]).subscribe((data) => {
      expect(data.length).toEqual(1);
    });
    application.postImplementation = null;
    service.requestDir12s([mockPersonnel]).subscribe((data) => {
      expect(data.length).toEqual(1);
    });
    tick(1000);
  }));

  it('should submit dir 12s', fakeAsync(() => {
    const application = _.cloneDeep(mockApplicationReview);
    const groups: AvailableDirector[] = [
      {
        name: 'Rishab Kapoor',
        success: false,
        directors: [],
        uploaded: {
          name: 'string',
          url: 'string',
        },
      },
    ];
    spyOn(service, 'getApplicationById').and.returnValue(of(application));
    service.submitDir12s(groups).subscribe((data) => {
      expect(data).toEqual(null);
    });
    application.postImplementation = null;
    service.submitDir12s(groups).subscribe((data) => {
      expect(data).toEqual(null);
    });
    tick(1000);
  }));

  it('should get changed post facto', fakeAsync(() => {
    const application = _.cloneDeep(mockApplicationReview);
    application.postFactoChanges = [];
    spyOn(service, 'getApplicationById').and.returnValue(of(application));
    service.getChangedPostFacto().subscribe((datas) => {
      expect(datas.length).toEqual(0);
    });
    tick(1000);
  }));

  it('should set post facto changes', fakeAsync(() => {
    const application = _.cloneDeep(mockApplicationReview);
    spyOn(service, 'getApplicationById').and.returnValue(of(application));
    service.setPostFactoChanges([mockPersonnel]).subscribe((datas) => {
      expect(datas).toBeTruthy();
    });
    tick(1000);
  }));

  it('should notify member of post facto changes', fakeAsync(() => {
    const application = _.cloneDeep(mockApplicationReview);
    spyOn(service, 'getApplicationById').and.returnValue(of(application));
    service.memberNotifiedOfPostFactoChanges().subscribe((datas) => {
      expect(datas).toEqual(null);
    });
    tick(1000);
  }));
});
