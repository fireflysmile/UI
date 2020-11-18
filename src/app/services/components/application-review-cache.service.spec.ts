import { TestBed } from '@angular/core/testing';

import { ApplicationReviewCacheService } from './application-review-cache.service';

describe('DataCacheService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApplicationReviewCacheService = TestBed.inject(ApplicationReviewCacheService);
    expect(service).toBeTruthy();
  });
});
