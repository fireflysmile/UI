import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ApplicationReviewQueueItem } from 'src/app/models/application-review-queue-item';
import { ApplicationTrackingDetail } from 'src/app/models/application-tracking-detail';
import {
  getMockApplicationTrackingDetail,
} from 'src/assets/data/application/mock-application';

import { StatusTrackerService } from './status-tracker.service';

describe('StatusTrackerService', () => {
  let service: StatusTrackerService;

  beforeEach(() => TestBed.configureTestingModule({}).compileComponents());

  beforeEach(() => {
    service = TestBed.inject(StatusTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get application id', () => {
    let applicationId;
    service.applicationId$.subscribe((rs) => (applicationId = rs));
    service.applicationId = '1';
    expect(applicationId).toEqual('1');
  });

  it('should get application tracking detail', () => {
    let applicationTrackingDetail: ApplicationTrackingDetail;
    let clarifications: ApplicationReviewQueueItem[];
    service.applicationTrackingDetail$.subscribe(
      (rs) => (applicationTrackingDetail = rs)
    );
    service.clarifications$.subscribe((rs) => (clarifications = rs));
    service.applicationTrackingDetail = getMockApplicationTrackingDetail();
    service.clarifications = [];
    expect(applicationTrackingDetail).toEqual(
      getMockApplicationTrackingDetail()
    );
    expect(clarifications.length).toEqual(0);

    let mockApplicationTrackingDetail = getMockApplicationTrackingDetail();
    service.applicationTrackingDetail = mockApplicationTrackingDetail;
    expect(clarifications.length).toEqual(0);

    mockApplicationTrackingDetail = getMockApplicationTrackingDetail();
    service.applicationTrackingDetail = mockApplicationTrackingDetail;
    service.clarifications = [];
    expect(clarifications.length).toEqual(0);
    const spyOnGetTrackingDetail = spyOnProperty(
      service,
      'applicationTrackingDetail$'
    ).and.returnValue(of(mockApplicationTrackingDetail).pipe(delay(10)));
    service.clarifications = [];
    expect(clarifications.length).toEqual(0);

    mockApplicationTrackingDetail = getMockApplicationTrackingDetail();
    service.clarifications = [];
    spyOnGetTrackingDetail.and.returnValue(of(mockApplicationTrackingDetail));
    service.applicationTrackingDetail = mockApplicationTrackingDetail;
  });

  it('should clear tracking detail', () => {
    service.applicationTrackingDetail = getMockApplicationTrackingDetail();
    service.clear();
    expect(service.applicationId).toEqual(undefined);
    expect(service.applicationTrackingDetail).toEqual(undefined);
  });
});
