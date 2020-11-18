import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ApplicationClarificationTableModule
} from 'src/app/components/application-clarification-table/application-clarification-table.module';
import { PageActionsModule } from 'src/app/components/page-actions/page-actions.module';
import { RectCardModule } from 'src/app/components/rect-card/rect-card.module';
import { StatusTrackerSubHeaderModule } from 'src/app/components/status-tracker-sub-header/status-tracker-sub-header.module';
import * as _ from 'lodash';
import { StatusTrackerService } from 'src/app/services/components/status-tracker.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import {
  getMockApplicationTrackingDetail,
  mockApplicationReviewQueueItem,
} from 'src/assets/data/application/mock-application';

import { ClarificationPageComponent } from './clarification-page.component';
import { ApplicationService } from 'src/app/services/api/application.service';
import { ModalService } from 'src/app/components/modal/modal.service';
import { Observable, of } from 'rxjs';
import { ApplicationReviewQueueItem } from 'src/app/models/application-review-queue-item';

describe('ClarificationPageComponent', () => {
  let component: ClarificationPageComponent;
  let fixture: ComponentFixture<ClarificationPageComponent>;
  let statusTrackerService: StatusTrackerService;
  let applicationService: ApplicationService;
  let modalService: ModalService;
  let spyOnGetClarifications: jasmine.Spy<() => Observable<
    ApplicationReviewQueueItem[]
  >>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClarificationPageComponent],
      imports: [
        TestSharedModule,
        StatusTrackerSubHeaderModule,
        ApplicationClarificationTableModule,
        RectCardModule,
        PageActionsModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClarificationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    statusTrackerService = TestBed.inject(StatusTrackerService);
    applicationService = TestBed.inject(ApplicationService);

    spyOnGetClarifications = spyOn(applicationService, 'getClarifications');
    modalService = TestBed.inject(ModalService);
    statusTrackerService.applicationTrackingDetail = getMockApplicationTrackingDetail();
    statusTrackerService.clarifications = [
      _.cloneDeep(mockApplicationReviewQueueItem),
      _.cloneDeep(mockApplicationReviewQueueItem),
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get edited classifications', () => {
    expect(component.editedClarifications.length).toEqual(0);
  });

  it('should copy classification', () => {
    component.copyClarification(_.cloneDeep(component.clarifications[1]));
    const newItem =
      component.clarifications[component.clarifications.length - 2];
    expect(newItem.lastUpdatedDate).toEqual(null);
    expect(newItem.response).toEqual({
      text: '',
      attachment: null,
    });
    expect(newItem.origin.copied).toEqual(true);
  });

  it('should delete', () => {
    component.copyClarification(_.cloneDeep(component.clarifications[1]));
    const newItem =
      component.clarifications[component.clarifications.length - 2];

    component.deleteClarification(newItem);
    expect(component.clarifications.length).toEqual(2);
  });

  it('should open modal', () => {
    const spyOnModalOpen = spyOn(modalService, 'open');
    component.openClarificationReview();
    component.openClarificationEdits();
    expect(spyOnModalOpen).toHaveBeenCalledTimes(2);
  });

  it('should not get clarifications if loaded', () => {
    spyOnProperty(statusTrackerService, 'clarificationLoaded').and.returnValue(
      true
    );
    component.ngOnInit();
    expect(spyOnGetClarifications).not.toHaveBeenCalled();
  });

  it('should send clarifications', () => {
    const spyOnSendClarificationsToMaker = spyOn(
      applicationService,
      'sendClarificationsToMaker'
    ).and.returnValue(of({} as any));
    component.sendClarifications();
    expect(spyOnSendClarificationsToMaker).toHaveBeenCalled();
  });
});
