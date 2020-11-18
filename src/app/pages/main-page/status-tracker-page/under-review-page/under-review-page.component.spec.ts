import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RectCardModule } from 'src/app/components/rect-card/rect-card.module';
import { StatusTrackerSubHeaderModule } from 'src/app/components/status-tracker-sub-header/status-tracker-sub-header.module';
import { UnderReviewStatusItemModule } from 'src/app/components/under-review-status-item/under-review-status-item.module';
import { ApplicationService } from 'src/app/services/api/application.service';
import { StatusTrackerService } from 'src/app/services/components/status-tracker.service';
import { SubscriptionService } from 'src/app/services/subscription/subscription.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { getMockApplicationTrackingDetail, mockUnderReviewDetail } from 'src/assets/data/application/mock-application';

import { UnderReviewPageComponent } from './under-review-page.component';

describe('UnderReviewPageComponent', () => {
  let component: UnderReviewPageComponent;
  let fixture: ComponentFixture<UnderReviewPageComponent>;
  let statusTrackerService: StatusTrackerService;
  let applicationService: ApplicationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UnderReviewPageComponent],
      imports: [
        StatusTrackerSubHeaderModule,
        TestSharedModule,
        UnderReviewStatusItemModule,
        RectCardModule,
      ],
      providers: [SubscriptionService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderReviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    statusTrackerService = TestBed.inject(StatusTrackerService);
    applicationService = TestBed.inject(ApplicationService);
    statusTrackerService.applicationTrackingDetail = getMockApplicationTrackingDetail();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get correct status', () => {
    statusTrackerService.underReviewDetail = mockUnderReviewDetail;

    expect(component.pendingStatus).toBeTruthy();
    expect(component.reviewStatus).toBeTruthy();

    let applicationTrackingDetail = getMockApplicationTrackingDetail();
    statusTrackerService.applicationTrackingDetail = applicationTrackingDetail;
    expect(component.pendingStatus).toBeTruthy();

    applicationTrackingDetail = getMockApplicationTrackingDetail();
    statusTrackerService.applicationTrackingDetail = applicationTrackingDetail;
    expect(component.pendingStatus).toBeTruthy();

    applicationTrackingDetail = getMockApplicationTrackingDetail();
    statusTrackerService.applicationTrackingDetail = applicationTrackingDetail;
    expect(component.reviewStatus).toBeTruthy();
  });

  it('should not get under review detail if loaded', () => {
    spyOnProperty(statusTrackerService, 'underReviewLoaded').and.returnValue(
      true
    );
    const spyOnGetReviewDetail = spyOn(
      applicationService,
      'getUnderReviewDetail'
    );
    component.ngOnInit();
    expect(spyOnGetReviewDetail).not.toHaveBeenCalled();
  });

  it('should update correct status', () => {
    const spyOnUnderReviewDetail = spyOnProperty(
      statusTrackerService,
      'underReviewDetail$'
    ).and.returnValue(of(null));
    component.ngOnInit();

    spyOnUnderReviewDetail.and.returnValue(
      of({
        applicationSubmissionCompleted: null,
        officialAssigned: null,
        reviewOpened: null,
        reviewClosed: null,
      })
    );
    component.ngOnInit();
    expect(component.pendingStatus).toEqual('disabled');
    expect(component.reviewStatus).toEqual('disabled');

    spyOnUnderReviewDetail.and.returnValue(
      of({
        applicationSubmissionCompleted: new Date(2010, 7, 9),
        officialAssigned: new Date(2010, 7, 9),
        reviewOpened: new Date(2010, 7, 9),
        reviewClosed: new Date(2010, 7, 9),
      })
    );
    component.ngOnInit();
    expect(component.pendingStatus).toEqual('completed');
    expect(component.reviewStatus).toEqual('completed');

    spyOnUnderReviewDetail.and.returnValue(
      of({
        applicationSubmissionCompleted: new Date(2010, 7, 9),
        officialAssigned: null,
        reviewOpened: new Date(2010, 7, 9),
        reviewClosed: new Date(2010, 7, 9),
      })
    );
    component.ngOnInit();
    expect(component.pendingStatus).toEqual('pending');
    expect(component.reviewStatus).toEqual('disabled');

    spyOnUnderReviewDetail.and.returnValue(
      of({
        applicationSubmissionCompleted: new Date(2010, 7, 9),
        officialAssigned: new Date(2010, 7, 9),
        reviewOpened: null,
        reviewClosed: null,
      })
    );
    component.ngOnInit();
    expect(component.pendingStatus).toEqual('completed');
    expect(component.reviewStatus).toEqual('pending');
  });
});
