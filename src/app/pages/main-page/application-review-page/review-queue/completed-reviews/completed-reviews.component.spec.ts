import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { CardActionItemModule } from 'src/app/components/card-action-item/card-action-item.module';
import { ApplicationService } from 'src/app/services/api/application.service';
import { ApplicationReviewCacheService } from 'src/app/services/components/application-review-cache.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { mockApplicationReviewQueueItem } from 'src/assets/data/application/mock-application';
import { mockApplicationReview } from 'src/assets/data/application/mock-application-review';

import { CompletedReviewsComponent } from './completed-reviews.component';

describe('CompletedReviewsComponent', () => {
  let component: CompletedReviewsComponent;
  let fixture: ComponentFixture<CompletedReviewsComponent>;
  let cacheService: ApplicationReviewCacheService;
  let applicationService: ApplicationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CompletedReviewsComponent],
      imports: [CardActionItemModule, TestSharedModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    applicationService = TestBed.inject(ApplicationService);
    spyOn(applicationService, 'getCompletedReviews').and.returnValue(
      of([_.cloneDeep(mockApplicationReviewQueueItem)])
    );
    cacheService = TestBed.inject(ApplicationReviewCacheService);
    cacheService.originalApplication = _.cloneDeep(mockApplicationReview);
    fixture = TestBed.createComponent(CompletedReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should export to excel', () => {
    const spyOnDownloadableClarifications = spyOnProperty(
      component,
      'downloadableClarifications'
    ).and.callThrough();
    component.exportToExcel();
    expect(spyOnDownloadableClarifications).toHaveBeenCalled();
  });
});
