import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as _ from 'lodash';
import { NavigationExtras, Router } from '@angular/router';
import { StatusTrackerService } from 'src/app/services/components/status-tracker.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { getMockApplicationTrackingDetail } from 'src/assets/data/application/mock-application';
import { Location } from '@angular/common';

import { StatusTrackerRouterDistributorComponent } from './status-tracker-router-distributor.component';

describe('StatusTrackerRouterDistributorComponent', () => {
  let component: StatusTrackerRouterDistributorComponent;
  let fixture: ComponentFixture<StatusTrackerRouterDistributorComponent>;
  let statusTrackerService: StatusTrackerService;
  let router: Router;
  let goBack = false;
  let spyOnNavigate: jasmine.Spy<(
    commands: any[],
    extras?: NavigationExtras
  ) => Promise<boolean>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StatusTrackerRouterDistributorComponent],
      imports: [TestSharedModule],
      providers: [
        {
          provide: Location,
          useValue: {
            back: () => (goBack = true),
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusTrackerRouterDistributorComponent);
    component = fixture.componentInstance;

    statusTrackerService = TestBed.inject(StatusTrackerService);
    router = TestBed.inject(Router);
    spyOnNavigate = spyOn(router, 'navigate').and.returnValue(
      Promise.resolve(true)
    );
    statusTrackerService.applicationTrackingDetail = getMockApplicationTrackingDetail();
    statusTrackerService.applicationId = '1';

    fixture.detectChanges();

    statusTrackerService.applicationTrackingDetail = null;
    statusTrackerService.applicationId = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should gobal if is distributed', () => {
    statusTrackerService.distributed = true;
    component.ngOnInit();
    expect(goBack).toEqual(true);
  });

  it('should go to correct page', () => {
    let mockTrackingDetail = _.cloneDeep(getMockApplicationTrackingDetail());
    statusTrackerService.applicationTrackingDetail = mockTrackingDetail;
    expect(spyOnNavigate).toHaveBeenCalledWith([
      '/main/dashboard/status-tracker',
      '1',
      'post-implementation',
    ]);
    spyOnNavigate.calls.reset();

    mockTrackingDetail = _.cloneDeep(getMockApplicationTrackingDetail());
    mockTrackingDetail.postImplementationReady = false;
    mockTrackingDetail.priorApprovalCompleted = true;
    statusTrackerService.applicationTrackingDetail = mockTrackingDetail;
    expect(spyOnNavigate).toHaveBeenCalledWith([
      '/main/dashboard/status-tracker',
      '1',
      'approval',
    ]);
    spyOnNavigate.calls.reset();

    mockTrackingDetail = _.cloneDeep(getMockApplicationTrackingDetail());
    mockTrackingDetail.postImplementationReady = false;
    mockTrackingDetail.priorApprovalCompleted = false;
    mockTrackingDetail.clarificationRequired = true;
    statusTrackerService.applicationTrackingDetail = mockTrackingDetail;
    expect(spyOnNavigate).toHaveBeenCalledWith([
      '/main/dashboard/status-tracker',
      '1',
      'clarification',
    ]);
    spyOnNavigate.calls.reset();

    mockTrackingDetail = _.cloneDeep(getMockApplicationTrackingDetail());
    mockTrackingDetail.postImplementationReady = false;
    mockTrackingDetail.priorApprovalCompleted = false;
    mockTrackingDetail.clarificationRequired = false;
    statusTrackerService.applicationTrackingDetail = mockTrackingDetail;
    expect(spyOnNavigate).toHaveBeenCalledWith([
      '/main/dashboard/status-tracker',
      '1',
      'under-review',
    ]);
    spyOnNavigate.calls.reset();
  });
});
