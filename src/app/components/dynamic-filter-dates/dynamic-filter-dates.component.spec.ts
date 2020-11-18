import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxMaskModule } from 'ngx-mask';

import { DynamicFilterDatesComponent } from './dynamic-filter-dates.component';
import { TimeSelectorModule } from '../time-selector/time-selector.module';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { DividerModule } from '../divider/divider.module';
import { RangeCalendarModule } from '../range-calendar/range-calendar.module';

describe('DynamicFilterDatesComponent', () => {
  let component: DynamicFilterDatesComponent;
  let fixture: ComponentFixture<DynamicFilterDatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicFilterDatesComponent],
      imports: [
        TimeSelectorModule,
        TestSharedModule,
        NgxMaskModule.forRoot(),
        DividerModule,
        RangeCalendarModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFilterDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show correct start/end date when set date value', () => {
    component.value = null;
    expect(component.start).toEqual('');
    component.value = {
      start: new Date(2010, 7, 5),
      end: null,
    };
    expect(component.start).toEqual('5/8/2010');
    expect(component.end).toEqual('');
    component.value = {
      start: null,
      end: new Date(2010, 7, 5),
    };
    expect(component.end).toEqual('5/8/2010');
    expect(component.start).toEqual('');
  });

  it('should call output event when date input change', () => {
    const spyOnValueChange = spyOn(component.valueChange, 'emit');
    component.value = {
      start: null,
      end: null,
    };
    component.onDateInputChange('start', 'invalidDate');
    component.value = {
      start: new Date(2010, 7, 5),
      end: new Date(2010, 7, 5),
    };
    component.onDateInputChange('start', '5/9/2015');
    component.onDateInputChange('start', '5/8/2010');
    expect(spyOnValueChange).toHaveBeenCalled();
    spyOnValueChange.calls.reset();

    component.value = {
      start: null,
      end: null,
    };
    component.onDateInputChange('end', 'invalidDate');
    component.value = {
      start: new Date(2010, 7, 5),
      end: new Date(2010, 7, 5),
    };
    component.onDateInputChange('end', '5/9/2015');
    component.onDateInputChange('end', '5/8/2010');
    expect(spyOnValueChange).toHaveBeenCalled();
    spyOnValueChange.calls.reset();

    component.endDate = null;
    component.onDateInputChange('start', '5/9/2015');
    expect(spyOnValueChange).toHaveBeenCalled();
    spyOnValueChange.calls.reset();

    component.startDate = null;
    component.onDateInputChange('end', '5/9/2015');
    expect(spyOnValueChange).toHaveBeenCalled();
    spyOnValueChange.calls.reset();

    component.startDate = new Date(2020, 7, 5);
    expect(component.invalidEndDate).toEqual(false);
    component.onDateInputChange('end', '5/9/2015');
    expect(component.invalidEndDate).toEqual(true);
  });

  it('should update correct start/end date when date change', () => {
    const spyOnValueChange = spyOn(component.valueChange, 'emit');
    component.value = {
      start: null,
      end: null,
    };
    component.onDateChange('start', new Date(2010, 7, 5));
    component.onDateChange('end', new Date(2010, 7, 5));
    expect(component.start).toEqual('5/8/2010');
    expect(component.end).toEqual('5/8/2010');
    expect(spyOnValueChange).toHaveBeenCalledTimes(2);
    component.onDateChange('start', null);
    component.onDateChange('end', null);
    expect(component.start).toEqual(null);
    expect(component.end).toEqual(null);

  });
});
