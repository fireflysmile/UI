import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { TimePassedModule } from 'src/app/pipes/time-passed/time-passed.module';
import { ApplicationService } from 'src/app/services/api/application.service';
import { ApplicationReviewCacheService } from 'src/app/services/components/application-review-cache.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { mockApplicationReview } from 'src/assets/data/application/mock-application-review';
import { AutoCloserModule } from '../../auto-closer/auto-closer.module';
import { AutoPositionerModule } from '../../auto-positioner/auto-positioner.module';
import { AutoSizeTextareaModule } from '../../auto-size-textarea/auto-size-textarea.module';
import { CalendarModule } from '../../calendar/calendar.module';
import { DateInputModule } from '../../date-input/date-input.module';
import { MonthPickerModule } from '../../month-picker/month-picker.module';
import { MoreOptionsModule } from '../../more-options/more-options.module';
import { SelectModule } from '../../select/select.module';
import { YesNoToggleModule } from '../../yes-no-toggle/yes-no-toggle.module';

import { ApplicationReviewTableCellComponent } from './application-review-table-cell.component';

describe('ApplicationReviewTableCellComponent', () => {
  let component: ApplicationReviewTableCellComponent;
  let fixture: ComponentFixture<ApplicationReviewTableCellComponent>;
  let cacheService: ApplicationReviewCacheService;
  let applicationService: ApplicationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationReviewTableCellComponent],
      imports: [
        TestSharedModule,
        SelectModule,
        MoreOptionsModule,
        CalendarModule,
        YesNoToggleModule,
        AutoSizeTextareaModule,
        DateInputModule,
        MonthPickerModule,
        AutoCloserModule,
        AutoPositionerModule,
        TimePassedModule,
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
    fixture = TestBed.createComponent(ApplicationReviewTableCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get correct data base on column setting', () => {
    const testDate = new Date(2019, 10, 4);
    const testDateFuture = new Date(2020, 10, 4);
    const testDatePast = new Date(2018, 10, 4);
    component.column = {
      label: '',
      property: '',
      displayType: '',
      editable: true,
      minProperty: '',
      maxProperty: '',
    };
    expect(component.data).toEqual(undefined);

    component.data = {
      prop1: false,
    };
    component.column.property = 'prop1';
    component.ngOnInit();
    component.validateMinMaxAndUpdate('test');
    expect(component.nonEmptyOriginally).toEqual(false);

    component.data.minDate = 'test';
    component.column.displayType = 'month';
    component.column.property = 'dateTest';
    component.column.minProperty = 'minDate';
    component.validateMinMaxAndUpdate(testDate.toString());
    expect(component.data.dateTest).toEqual('test');

    component.data.minDate = testDate.toString();
    component.validateMinMaxAndUpdate(testDateFuture.toString());
    expect(component.data.dateTest).toEqual(testDateFuture.toString());

    component.data.maxDate = 'test';
    component.column.minProperty = null;
    component.column.maxProperty = 'maxDate';
    component.validateMinMaxAndUpdate(testDate.toString());
    expect(component.data.dateTest).toEqual('test');
    component.data.maxDate = testDate.toString();
    component.validateMinMaxAndUpdate(testDatePast.toString());
    expect(component.data.dateTest).toEqual(testDatePast.toString());
  });
});
