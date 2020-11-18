import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { ApplicationReviewCardModule } from 'src/app/components/application-review-card/application-review-card.module';
import { CardActionItemModule } from 'src/app/components/card-action-item/card-action-item.module';
import { DateSelectorModule } from 'src/app/components/date-selector/date-selector.module';
import { TsMessageType } from 'src/app/components/message/message-item/message-item.component';
import { MessageService } from 'src/app/components/message/message.service';
import { ModalModule } from 'src/app/components/modal/modal.module';
import { PreviewPdfModule } from 'src/app/components/preview-pdf/preview-pdf.module';
import { WarningNoteModule } from 'src/app/components/warning-note/warning-note.module';
import { ApplicationService } from 'src/app/services/api/application.service';
import { AppService } from 'src/app/services/components/app.service';
import { ApplicationReviewCacheService } from 'src/app/services/components/application-review-cache.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import {
  mockApplicationPostFactoApproval,
  mockApplicationPriorApproval,
  mockApplicationReview,
  mockPersonnel,
} from 'src/assets/data/application/mock-application-review';
import { environment } from 'src/environments/environment';
import { DirTableComponent } from './dir-table/dir-table.component';
import { ExtensionTableComponent } from './extension-table/extension-table.component';
import { InlineDocumentComponent } from './inline-document/inline-document.component';
import { PostFactoAttentionAlertComponent } from './post-facto-attention-alert/post-facto-attention-alert.component';

import { PostImplementationComponent } from './post-implementation.component';

describe('PostImplementationComponent', () => {
  let component: PostImplementationComponent;
  let fixture: ComponentFixture<PostImplementationComponent>;
  let cacheService: ApplicationReviewCacheService;
  let messageService: MessageService;
  let appService: AppService;
  let applicationService: ApplicationService;
  let spyOnMessageOpen: jasmine.Spy<(
    type: TsMessageType,
    message: string
  ) => void>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PostImplementationComponent,
        DirTableComponent,
        ExtensionTableComponent,
        PostFactoAttentionAlertComponent,
        InlineDocumentComponent,
      ],
      imports: [
        TestSharedModule,
        CardActionItemModule,
        WarningNoteModule,
        DateSelectorModule,
        ApplicationReviewCardModule,
        ModalModule,
        PreviewPdfModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    appService = TestBed.inject(AppService);
    appService.userInfo = {
      role: 'RO',
      checker: false,
    };
    applicationService = TestBed.inject(ApplicationService);
    spyOn(applicationService, 'getApplicationById').and.returnValue(
      of(_.cloneDeep(mockApplicationReview))
    );
    spyOn(applicationService, 'onMcaFailure').and.returnValue(of({} as any));
    cacheService = TestBed.inject(ApplicationReviewCacheService);
    cacheService.originalApplication = _.cloneDeep(mockApplicationReview);
    fixture = TestBed.createComponent(PostImplementationComponent);
    component = fixture.componentInstance;
    messageService = TestBed.inject(MessageService);
    spyOnMessageOpen = spyOn(messageService, 'open');
    fixture.detectChanges();
  });

  it('should create', () => {
    component.save(); // empty method, do nothing
    expect(component).toBeTruthy();
  });

  it('should show mock condition', () => {
    const shouldMockFailureRate = component.shouldMockFailureRate();
    expect(
      shouldMockFailureRate === true || shouldMockFailureRate === false
    ).toBeTruthy();
    const shouldMockNotFound = component.shouldMockNotFound();
    expect(
      shouldMockNotFound === true || shouldMockNotFound === false
    ).toBeTruthy();
    const shouldMockPostFacto = component.shouldMockPostFacto();
    expect(
      shouldMockPostFacto === true || shouldMockPostFacto === false
    ).toBeTruthy();
    const shouldSetNegativeDeltaTime = component.shouldSetNegativeDeltaTime();
    expect(
      shouldSetNegativeDeltaTime === true ||
        shouldSetNegativeDeltaTime === false
    ).toBeTruthy();
  });

  it('should init value', () => {
    const application = _.cloneDeep(mockApplicationReview);
    application.approvals = {
      prior: _.cloneDeep(mockApplicationPriorApproval),
      postFacto: _.cloneDeep(mockApplicationPostFactoApproval),
      completed: false,
    };
    component.application = application;
    component.ngOnInit();
    expect(component.complete).toEqual(false);
    expect(component.postImplementationNeeded).toEqual(true);
    component.application.approvals.prior.status =
      environment.applicationApprovalStatuses.REJECTED;
    component.ngOnInit();
    expect(component.complete).toEqual(false);
    expect(component.showPostFactoChangesModal).toEqual(undefined);
    expect(component.application.postFactoChanges).toEqual(undefined);

    component.application.approvals = {
      completed: true,
      prior: null,
      postFacto: null,
    };
    component.ngOnInit();
    expect(component.complete).toEqual(false);

    component.application.approvals = null;
    component.application.postImplementation = {
      memberConfirmation: false,
      mcaVerified: false,
      extensionRequest: null,
      mcaFailureCount: 1,
      dir12sSubmitted: false,
      dir12s: null,
    };
    component.ngOnInit();
    expect(spyOnMessageOpen).toHaveBeenCalled();
    spyOnMessageOpen.calls.reset();
  });

  it('should check if is manual date entry', () => {
    component.viewType = 'checker';
    expect(
      component.isManualDateEntry(null, {
        property: '',
      })
    ).toEqual(false);
    component.viewType = 'maker';
    component.application.postImplementation = null;
    expect(
      component.isManualDateEntry(_.cloneDeep(mockPersonnel), {
        property: 'extensionDate',
      })
    ).toEqual(false);
    component.application.postImplementation = {
      extensionRequest: null,
      dir12s: null,
      mcaFailureCount: 0,
    };
    expect(
      component.isManualDateEntry(_.cloneDeep(mockPersonnel), {
        property: 'extensionDate',
      })
    ).toEqual(false);
    component.application.postImplementation = {
      extensionRequest: {
        document: {
          type: 'type',
          name: 'name',
          url: 'url',
        },
        accepted: false,
        personnel: [],
      },
      dir12s: null,
      mcaFailureCount: 0,
    };
    expect(
      component.isManualDateEntry(_.cloneDeep(mockPersonnel), {
        property: 'extensionDate',
      })
    ).toEqual(false);
    component.application.postImplementation = {
      extensionRequest: {
        document: {
          type: 'type',
          name: 'name',
          url: 'url',
        },
        accepted: true,
        personnel: [
          {
            id: '2',
            name: 'robot',
          },
        ],
      },
      dir12s: null,
      mcaFailureCount: 0,
    };
    expect(
      component.isManualDateEntry(_.cloneDeep(mockPersonnel), {
        property: 'extensionDate',
      })
    ).toEqual(false);

    component.application.postImplementation = null;
    expect(
      component.isManualDateEntry(_.cloneDeep(mockPersonnel), {
        property: 'actualDateOfChange',
      })
    ).toEqual(false);
    component.application.postImplementation = {
      extensionRequest: null,
      dir12s: null,
      mcaFailureCount: 0,
    };
    expect(
      component.isManualDateEntry(_.cloneDeep(mockPersonnel), {
        property: 'actualDateOfChange',
      })
    ).toEqual(false);
    component.application.postImplementation = {
      extensionRequest: null,
      dir12s: [
        {
          personnel: [
            {
              id: '2',
              name: 'robot',
            },
          ],
          document: {
            type: 'type',
            name: 'name',
            url: 'url',
          },
        },
      ],
      mcaFailureCount: 0,
    };
    expect(
      component.isManualDateEntry(_.cloneDeep(mockPersonnel), {
        property: 'actualDateOfChange',
      })
    ).toEqual(false);
  });

  it('should check if is date entry disabled', () => {
    expect(
      component.isDateEntryDisabled({
        property: '',
      })
    ).toEqual(false);
    expect(
      component.isDateEntryDisabled({
        property: 'extensionDate',
      })
    ).toEqual(false);
  });

  it('should update person info when change date', () => {
    const mockPerson = _.cloneDeep(mockPersonnel);
    component.onDatePicked(
      mockPerson,
      { property: 'actualDateOfChange' },
      new Date(2010, 7, 5)
    );
    expect(mockPerson.status).toEqual(
      environment.applicationPostImplementationStatus.INCORPORATED
    );
    mockPerson.extensionDate = null;
    component.deadlineDate = new Date(2010, 7, 5);
    component.onDatePicked(
      mockPerson,
      { property: 'actualDateOfChange' },
      new Date(2015, 7, 5)
    );
    expect(mockPerson.status).toEqual(
      environment.applicationPostImplementationStatus
        .INCORPORATED_AFTER_DEADLINE
    );
  });

  it('should check if disable mca button', () => {
    const application = _.cloneDeep(mockApplicationReview);
    application.postImplementation = {
      mcaFailureCount: 1,
      memberConfirmation: true,
      mcaVerified: true,
    };
    component.application = application;
    expect(component.disableMcaButton).toEqual(true);
  });

  it('should check on mca verification', () => {
    component.shouldMockFailureRate = () => false;
    component.shouldMockNotFound = () => false;
    component.shouldMockPostFacto = () => false;
    component.shouldSetNegativeDeltaTime = () => false;
    component.application.postImplementation = {
      mcaFailureCount: 3,
    };
    component.personnel = [_.cloneDeep(mockPersonnel)];
    component.onMCAVerification();
    component.application.postImplementation = {
      mcaFailureCount: 2,
    };
    component.onMCAVerification();
    expect(component.application.postImplementation.dir12s).toBeTruthy();

    component.shouldMockFailureRate = () => true;
    component.application.postImplementation = {
      mcaFailureCount: 1,
    };
    component.onMCAVerification();
    expect(spyOnMessageOpen).toHaveBeenCalled();
    spyOnMessageOpen.calls.reset();
    component.onMCAVerification();
    expect(spyOnMessageOpen).toHaveBeenCalled();
    spyOnMessageOpen.calls.reset();
    component.onMCAVerification();
    expect(spyOnMessageOpen).not.toHaveBeenCalled();
    spyOnMessageOpen.calls.reset();

    component.shouldMockNotFound = () => true;
    component.personnel[0].actualDateOfChange = null;
    component.onMCAVerification();
    expect(component.personnel[0].status).toEqual(
      environment.applicationPostImplementationStatus.NOT_FOUND
    );

    component.shouldMockNotFound = () => false;
    component.shouldMockPostFacto = () => true;
    component.shouldSetNegativeDeltaTime = () => true;
    component.onMCAVerification();
    expect(component.personnel[0].status).toEqual(
      environment.applicationPostImplementationStatus.POST_FACTO
    );

    component.shouldSetNegativeDeltaTime = () => false;
    component.onMCAVerification();
    expect(component.personnel[0].status).toEqual(
      environment.applicationPostImplementationStatus.POST_FACTO
    );

    component.shouldMockPostFacto = () => false;
    component.personnel[0].actualDateOfChange = new Date(2011, 7, 5);
    component.personnel[0].extensionDate = null;
    component.deadlineDate = new Date(2010, 7, 5);
    component.onMCAVerification();
    expect(component.personnel[0].status).toEqual(
      environment.applicationPostImplementationStatus
        .INCORPORATED_AFTER_DEADLINE
    );
    component.shouldSetNegativeDeltaTime = () => true;
    component.personnel[0].extensionDate = null;
    component.deadlineDate = new Date(2015, 7, 5);
    component.onMCAVerification();
    expect(component.personnel[0].status).toEqual(
      environment.applicationPostImplementationStatus.INCORPORATED
    );
  });
});
