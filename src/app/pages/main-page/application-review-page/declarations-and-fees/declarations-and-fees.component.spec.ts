import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { ApplicationReviewCardModule } from 'src/app/components/application-review-card/application-review-card.module';
import { CheckboxModule } from 'src/app/components/checkbox/checkbox.module';
import { ApplicationService } from 'src/app/services/api/application.service';
import { AppService } from 'src/app/services/components/app.service';
import { ApplicationReviewCacheService } from 'src/app/services/components/application-review-cache.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { mockApplicationReview } from 'src/assets/data/application/mock-application-review';

import { DeclarationsAndFeesComponent } from './declarations-and-fees.component';
import { DeclarationsAndFeesModule } from './declarations-and-fees.module';

describe('DeclarationsAndFeesComponent', () => {
  let component: DeclarationsAndFeesComponent;
  let fixture: ComponentFixture<DeclarationsAndFeesComponent>;
  let cacheService: ApplicationReviewCacheService;
  let appService: AppService;
  let applicationService: ApplicationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DeclarationsAndFeesModule,
        ApplicationReviewCardModule,
        CheckboxModule,
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
    fixture = TestBed.createComponent(DeclarationsAndFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.save(); // call redundant method
    expect(component).toBeTruthy();
  });

  it('should set empty data if application is null', () => {
    component.application = null;
    component.ngOnInit();
    expect(component.data.length).toEqual(0);
  });
});
