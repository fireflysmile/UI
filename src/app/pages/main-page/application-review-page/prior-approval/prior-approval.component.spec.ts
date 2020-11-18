import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { ApplicationReviewCardModule } from 'src/app/components/application-review-card/application-review-card.module';
import { AutoSizeTextareaModule } from 'src/app/components/auto-size-textarea/auto-size-textarea.module';
import { CardActionItemModule } from 'src/app/components/card-action-item/card-action-item.module';
import { MessageService } from 'src/app/components/message/message.service';
import { ModalModule } from 'src/app/components/modal/modal.module';
import { PreviewPdfModule } from 'src/app/components/preview-pdf/preview-pdf.module';
import { SelectModule } from 'src/app/components/select/select.module';
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
import { CheckerCommentsComponent } from './checker-comments/checker-comments.component';
import { CheckerMakerFieldComponent } from './checker-maker-field/checker-maker-field.component';
import { GrantApprovalComponent } from './grant-approval/grant-approval.component';
import { LetterAttachmentCellComponent } from './letter-attachment-cell/letter-attachment-cell.component';
import { PostFactoApprovalTableComponent } from './post-facto-approval-table/post-facto-approval-table.component';
import { PriorApprovalTableComponent } from './prior-approval-table/prior-approval-table.component';

import { PriorApprovalComponent } from './prior-approval.component';
import { RejectionTableComponent } from './rejection-table/rejection-table.component';

describe('PriorApprovalComponent', () => {
  let component: PriorApprovalComponent;
  let fixture: ComponentFixture<PriorApprovalComponent>;
  let cacheService: ApplicationReviewCacheService;
  let messageService: MessageService;
  let appService: AppService;
  let applicationService: ApplicationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PriorApprovalComponent,
        CheckerMakerFieldComponent,
        PriorApprovalTableComponent,
        RejectionTableComponent,
        PostFactoApprovalTableComponent,
        GrantApprovalComponent,
        LetterAttachmentCellComponent,
        CheckerCommentsComponent,
      ],
      imports: [
        CardActionItemModule,
        ApplicationReviewCardModule,
        WarningNoteModule,
        ModalModule,
        SelectModule,
        TestSharedModule,
        PreviewPdfModule,
        AutoSizeTextareaModule,
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
    spyOn(applicationService, 'assignChecker').and.returnValue(of({} as any));
    spyOn(applicationService, 'updateApprovals').and.returnValue(of({} as any));
    cacheService = TestBed.inject(ApplicationReviewCacheService);
    cacheService.originalApplication = _.cloneDeep(mockApplicationReview);
    fixture = TestBed.createComponent(PriorApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    messageService = TestBed.inject(MessageService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init value', () => {
    component.application.applicants = [];
    component.application.postFactos = [];
    component.application.checker = {
      id: '1',
      name: 'name',
    };
    component.viewType = 'checker';
    component.ngOnInit();
    expect(component.application.approvals.prior).toBeTruthy();

    component.application.approvals = null;
    component.viewType = 'maker';
    component.ngOnInit();
    expect(component.application.approvals.prior).toEqual(null);
  });

  it('should select checker', () => {
    component.onCheckerSelected({
      id: 'id',
      name: 'name',
    });
    expect(component.application.checker).toEqual({
      id: 'id',
      name: 'name',
    });
  });

  it('should check can change approval letter', () => {
    spyOn(messageService, 'open');
    component.viewType = 'checker';
    expect(component.canChangeApprovalLetter()).toEqual(true);
    component.viewType = 'maker';
    expect(component.canChangeApprovalLetter()).toEqual(true);
    component.application.approvals.prior.status =
      environment.applicationApprovalStatuses.WITH_CHECKER;
    component.application.approvals.prior.approvalLetter = {
      name: 'name',
      url: 'url',
    };
    expect(component.canChangeApprovalLetter()).toEqual(false);
  });

  it('should accept prior approval', () => {
    component.acceptPriorApproval(true, true);
    component.application.approvals.prior = null;
    component.acceptPriorApproval(false, false);
    expect(component.application.approvals.prior.comments.length).toEqual(0);
    component.acceptPriorApproval(true, false);
    expect(component.application.approvals.prior.comments.length).toEqual(0);
  });

  it('should accept post factor', () => {
    const spyOnMessageOpen = spyOn(messageService, 'open');
    component.viewType = 'maker';
    component.acceptPostFactos(true);

    component.viewType = 'checker';
    component.acceptPostFactos(false);

    component.viewType = 'maker';
    component.application.approvals.postFacto.status =
      environment.applicationApprovalStatuses.WITH_CHECKER;
    component.acceptPostFactos(false);
    expect(spyOnMessageOpen).toHaveBeenCalled();

    component.viewType = 'checker';
    component.application.approvals.postFacto.comments = null;
    component.acceptPostFactos(false);
    expect(component.application.approvals.postFacto.comments.length).toEqual(
      0
    );
  });

  it('should generate warning letter', () => {
    component.generateWarningLetter();
    expect(
      component.application.approvals.postFacto.warningLetter
    ).toBeTruthy();
  });

  it('should public letter', () => {
    component.application.approvals.postFacto.warningLetter = {
      name: 'string',
      url: 'string',
    };
    component.application.approvals.prior.approvalLetter = {
      name: 'string',
      url: 'string',
    };
    component.publishApprovalLetter();
    component.publishWarningLetter();
    expect(
      component.application.approvals.postFacto.warningLetter.published
    ).toBeTruthy();
    expect(
      component.application.approvals.prior.approvalLetter.published
    ).toBeTruthy();
  });

  it('should get status display text', () => {
    component.viewType = 'maker';
    expect(
      component.getStatusDisplayText({
        status: null,
        accepted: false,
        comments: null,
      })
    ).toEqual('Not sent to Checker');
    expect(
      component.getStatusDisplayText({
        status: environment.applicationApprovalStatuses.WITH_CHECKER,
        accepted: false,
        comments: null,
      })
    ).toEqual('Sent to Checker');
    expect(
      component.getStatusDisplayText({
        status: environment.applicationApprovalStatuses.WITH_MAKER,
        accepted: false,
        comments: null,
      })
    ).toEqual('Comments from Checker');
    expect(
      component.getStatusDisplayText({
        status: environment.applicationApprovalStatuses.REJECTED,
        accepted: false,
        comments: null,
      })
    ).toEqual(environment.applicationApprovalStatuses.REJECTED);
    component.viewType = 'checker';
    expect(
      component.getStatusDisplayText({
        status: environment.applicationApprovalStatuses.WITH_CHECKER,
        accepted: false,
        comments: null,
      })
    ).toEqual('Received from Maker');
    expect(
      component.getStatusDisplayText({
        status: environment.applicationApprovalStatuses.WITH_MAKER,
        accepted: false,
        comments: null,
      })
    ).toEqual('Sent to Maker');
  });

  it('should validate form', () => {
    expect(component.validateForm()).toEqual(false);
    component.application.applicants = [];
    expect(component.validateForm()).toEqual(false);
    component.application.applicants = [_.cloneDeep(mockPersonnel)];
    component.application.checker = {
      id: 'id',
      name: 'name',
    };
    expect(component.validateForm()).toEqual(false);
    component.application.approvals.prior = null;
    expect(component.validateForm()).toEqual(false);
    component.application.approvals.prior = _.cloneDeep(
      mockApplicationPriorApproval
    );
    expect(component.validateForm()).toEqual(false);
    component.application.postFactos = [];
    expect(component.validateForm()).toEqual(true);
    component.application.postFactos = [_.cloneDeep(mockPersonnel)];
    component.application.approvals.postFacto = null;
    expect(component.validateForm()).toEqual(false);
    component.application.approvals.postFacto = mockApplicationPostFactoApproval;
    component.application.approvals.postFacto.warningLetter = null;
    component.application.approvals.postFacto.warningCancellationReason = null;
    expect(component.validateForm()).toEqual(true);
    component.application.approvals.postFacto.warningLetter = {
      name: 'name',
      url: 'url',
    };
    component.application.approvals.postFacto.warningCancellationReason =
      'string';
    expect(component.validateForm()).toEqual(true);

    component.application.approvals.postFacto.accepted = true;
    component.application.approvals.postFacto.warningLetter = null;
    component.application.approvals.postFacto.warningCancellationReason = null;
    expect(component.validateForm()).toEqual(false);
  });

  it('should send to checker', () => {
    const spyOnMessageOpen = spyOn(messageService, 'open');
    component.sendToChecker();
    expect(spyOnMessageOpen).toHaveBeenCalled();
    component.application.reviewQueue = [];
    component.sendToChecker();
    expect(component.application.approvals.prior.status).toEqual(
      environment.applicationApprovalStatuses.WITH_CHECKER
    );
    expect(component.application.approvals.postFacto.status).toEqual(
      environment.applicationApprovalStatuses.WITH_CHECKER
    );
    component.application.approvals.prior = null;
    component.application.approvals.postFacto = null;
    component.sendToChecker();
    expect(component.application.approvals.prior).toEqual(null);
    expect(component.application.approvals.postFacto).toEqual(null);
  });

  it('should send to maker', () => {
    spyOn(component.elemRef.nativeElement, 'querySelectorAll').and.returnValue([
      {},
    ]);
    component.sendToMaker();
    expect(component.application.postImplementation).toBeTruthy();
    component.priorApprovalNewComment = 'true';
    component.postFactoApprovalNewComment = 'true';
    component.sendToMaker();
    expect(component.priorApprovalNewComment).toEqual(null);
    expect(component.postFactoApprovalNewComment).toEqual(null);
  });

  it('should send to member', () => {
    const spyOnMessageOpen = spyOn(messageService, 'open');
    component.sendToMember();
    expect(spyOnMessageOpen).toHaveBeenCalled();
    spyOnMessageOpen.calls.reset();
    component.application.reviewQueue = [];
    component.application.approvals.prior.approvalLetter = {
      name: 'name',
      url: 'url',
      published: false,
    };
    component.sendToMember();
    expect(spyOnMessageOpen).not.toHaveBeenCalled();
    spyOnMessageOpen.calls.reset();
    component.application.approvals.prior.approvalLetter = {
      name: 'name',
      url: 'url',
      published: true,
    };
    component.sendToMember();
    expect(spyOnMessageOpen).not.toHaveBeenCalled();
    component.application.approvals.postFacto.warningLetter = {
      name: 'name',
      url: 'url',
      published: false,
    };
    component.sendToMember();
    expect(spyOnMessageOpen).toHaveBeenCalled();
    spyOnMessageOpen.calls.reset();
    component.application.approvals.postFacto.warningLetter = {
      name: 'name',
      url: 'url',
      published: true,
    };
    component.sendToMember();
    expect(spyOnMessageOpen).not.toHaveBeenCalled();
    component.application.approvals.postFacto.warningLetter = null;
    component.sendToMember();
    expect(component.application.approvals.postFacto.status).toEqual(
      environment.applicationApprovalStatuses.REJECTED
    );
    component.sendToMember();
    expect(component.application.approvals.postFacto.status).toEqual(
      environment.applicationApprovalStatuses.REJECTED
    );
    component.application.approvals.prior = null;
    component.application.approvals.postFacto = null;
    component.sendToMember();
    component.viewType = 'maker';
    component.save();
    component.viewType = 'checker';
    component.save();
    expect(component.application.approvals.postFacto).toEqual(null);

    component.application.approvals.prior = {
      accepted: true,
      comments: [],
      approvalLetter: {
        name: 'string',
        url: 'string',
        published: true,
      },
    };

    component.application.approvals.postFacto = {
      accepted: true,
      comments: [],
    };
    component.sendToMember();
    expect(spyOnMessageOpen).not.toHaveBeenCalled();

    component.application.approvals.prior.approvalLetter.published = false;
    component.sendToMember();
    expect(spyOnMessageOpen).toHaveBeenCalled();
    spyOnMessageOpen.calls.reset();
  });
});
