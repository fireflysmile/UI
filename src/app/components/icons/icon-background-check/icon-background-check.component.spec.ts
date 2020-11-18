import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { ApplicationService } from 'src/app/services/api/application.service';
import { ApplicationReviewCacheService } from 'src/app/services/components/application-review-cache.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { mockApplicationReview } from 'src/assets/data/application/mock-application-review';
import { ApplicationReviewCardModule } from '../../application-review-card/application-review-card.module';
import { CardActionItemModule } from '../../card-action-item/card-action-item.module';
import { ModalModule } from '../../modal/modal.module';

import { IconBackgroundCheckComponent } from './icon-background-check.component';

describe('IconBackgroundCheckComponent', () => {
  let component: IconBackgroundCheckComponent;
  let fixture: ComponentFixture<IconBackgroundCheckComponent>;
  let cacheService: ApplicationReviewCacheService;
  let applicationService: ApplicationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        CardActionItemModule,
        ApplicationReviewCardModule,
        TestSharedModule,
        ModalModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    applicationService = TestBed.inject(ApplicationService);
    spyOn(applicationService, 'getApplicationById').and.returnValue(
      of(_.cloneDeep(mockApplicationReview))
    );
    cacheService = TestBed.inject(ApplicationReviewCacheService);
    cacheService.originalApplication = _.cloneDeep(mockApplicationReview);
    fixture = TestBed.createComponent(IconBackgroundCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
