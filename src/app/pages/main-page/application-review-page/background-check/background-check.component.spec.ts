import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { ApplicationReviewCardModule } from 'src/app/components/application-review-card/application-review-card.module';
import { CardActionItemModule } from 'src/app/components/card-action-item/card-action-item.module';
import { ApplicationService } from 'src/app/services/api/application.service';
import { AppService } from 'src/app/services/components/app.service';
import { ApplicationReviewCacheService } from 'src/app/services/components/application-review-cache.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { mockApplicationReview } from 'src/assets/data/application/mock-application-review';

import { BackgroundCheckComponent } from './background-check.component';

describe('BackgroundCheckComponent', () => {
  let component: BackgroundCheckComponent;
  let fixture: ComponentFixture<BackgroundCheckComponent>;
  let cacheService: ApplicationReviewCacheService;
  let appService: AppService;
  let applicationService: ApplicationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BackgroundCheckComponent],
      imports: [
        CardActionItemModule,
        ApplicationReviewCardModule,
        TestSharedModule,
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
    cacheService = TestBed.inject(ApplicationReviewCacheService);
    cacheService.originalApplication = _.cloneDeep(mockApplicationReview);
    fixture = TestBed.createComponent(BackgroundCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
