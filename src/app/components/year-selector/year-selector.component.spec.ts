import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgControl, FormControl } from '@angular/forms';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { ApplicationService } from 'src/app/services/api/application.service';
import { ApplicationReviewCacheService } from 'src/app/services/components/application-review-cache.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { mockApplicationReview } from 'src/assets/data/application/mock-application-review';
import { FormFieldModule } from '../form-field/form-field.module';
import { SelectModule } from '../select/select.module';

import { YearSelectorComponent } from './year-selector.component';

describe('YearSelectorComponent', () => {
  let component: YearSelectorComponent;
  let fixture: ComponentFixture<YearSelectorComponent>;
  let cacheService: ApplicationReviewCacheService;
  let applicationService: ApplicationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [YearSelectorComponent],
      imports: [SelectModule, FormFieldModule, TestSharedModule],
    })
      .overrideComponent(YearSelectorComponent, {
        add: {
          providers: [
            {
              provide: NgControl,
              useClass: class extends NgControl {
                control = new FormControl();
                viewToModelUpdate() {}
              },
            },
          ],
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    applicationService = TestBed.inject(ApplicationService);
    spyOn(applicationService, 'getApplicationById').and.returnValue(
      of(_.cloneDeep(mockApplicationReview))
    );
    cacheService = TestBed.inject(ApplicationReviewCacheService);
    cacheService.originalApplication = _.cloneDeep(mockApplicationReview);
    fixture = TestBed.createComponent(YearSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change to correct type', () => {
    component.changeType('year');
    expect(component.type).toEqual('year');

    component.changeType('month');
    expect(component.type).toEqual('month');

    component.onCancel();
    expect(component.type).toEqual('year');

    component.changeType('year');
    component.onCancel();
    expect(component.type).toEqual('year');
  });

  it('should change to correct value', () => {
    component.changeType('year');

    component.clearMonth();
    expect(component.value.month).toEqual(null);

    component.clearRange();
    expect(component.value.start).toEqual(null);
    expect(component.value.end).toEqual(null);

    component.setYearValue(1020);
    expect(component.value.year).toEqual(null);

    component.setMonthValue(10);
    expect(component.value.month).toEqual(null);

    component.setStartMonthValue(10);
    expect(component.value.start).toEqual(null);

    component.setEndMonthValue(10);
    expect(component.value.end).toEqual(null);

    component.createRangeMonthOptions();
    expect(component.startMonthOptions.length).toEqual(12);

    component.value.end = 12;
    component.value.start = 1;
    component.createRangeMonthOptions();
    expect(component.startMonthOptions.length).toEqual(12);
  });
});
