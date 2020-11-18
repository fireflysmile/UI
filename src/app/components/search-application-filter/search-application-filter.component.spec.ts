import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import * as _ from 'lodash';
import { LookupService } from 'src/app/services/api/lookup.service';
import { ApplicationReviewCacheService } from 'src/app/services/components/application-review-cache.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { mockApplicationReview } from 'src/assets/data/application/mock-application-review';
import { FormFieldModule } from '../form-field/form-field.module';
import { PageActionsModule } from '../page-actions/page-actions.module';
import { RectCardModule } from '../rect-card/rect-card.module';
import { SelectModule } from '../select/select.module';
import { YearSelectorModule } from '../year-selector/year-selector.module';

import { SearchApplicationFilterComponent } from './search-application-filter.component';
import { ApplicationService } from 'src/app/services/api/application.service';

describe('SearchApplicationFilterComponent', () => {
  let component: SearchApplicationFilterComponent;
  let fixture: ComponentFixture<SearchApplicationFilterComponent>;
  let lookupService: LookupService;
  let cacheService: ApplicationReviewCacheService;
  let applicationService: ApplicationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchApplicationFilterComponent],
      imports: [RectCardModule, YearSelectorModule, SelectModule, FormFieldModule, PageActionsModule, TestSharedModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    applicationService = TestBed.inject(ApplicationService);
    spyOn(applicationService, 'getApplicationById').and.returnValue(
      of(_.cloneDeep(mockApplicationReview))
    );
    cacheService = TestBed.inject(ApplicationReviewCacheService);
    cacheService.originalApplication = _.cloneDeep(mockApplicationReview);
    fixture = TestBed.createComponent(SearchApplicationFilterComponent);
    component = fixture.componentInstance;
    lookupService = TestBed.inject(LookupService);
    fixture.detectChanges();
  });

  it('should create', () => {
    spyOn(lookupService, 'getMembers').and.returnValue(of(null));
    spyOn(lookupService, 'getRequestTypes').and.returnValue(of(null));
    spyOn(lookupService, 'getAvailableApplicationIds').and.returnValue(of(null));
    expect(component).toBeTruthy();
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should get correct form value', () => {
    expect(component.year.value).toEqual({
      year: null,
      month: null,
      start: null,
      end: null,
    });
    expect(component.memberName.value).toEqual('');
    expect(component.memberCode.value).toEqual('');
    expect(component.requestType.value).toEqual('');

    component.onApplicationIdChange(null);
    expect(component.year.value).toEqual({
      year: null,
      month: null,
      start: null,
      end: null,
    });
    expect(component.memberName.value).toEqual('');
    expect(component.memberCode.value).toEqual('');
    expect(component.requestType.value).toEqual('');

    component.onApplicationIdChange('newId');
    expect(component.year.value).toEqual({
      year: null,
      month: null,
      start: null,
      end: null,
    });
    expect(component.memberName.value).toEqual('');
    expect(component.memberCode.value).toEqual('');
    expect(component.requestType.value).toEqual('');
  });
});
