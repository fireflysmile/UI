import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeCalendarComponent } from './range-calendar.component';
import { DividerModule } from '../divider/divider.module';

describe('RangeCalendarComponent', () => {
  let component: RangeCalendarComponent;
  let fixture: ComponentFixture<RangeCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RangeCalendarComponent],
      imports: [DividerModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set correct date', () => {
    const spyOnEndDateChange = spyOn(component.endDateChange, 'emit');
    const spyOnStartDateChange = spyOn(component.startDateChange, 'emit');
    component.endDate = null;
    component.startDate = new Date(2010, 7, 5);
    component.onDateSelected(new Date(2011, 7, 5));
    expect(spyOnEndDateChange).toHaveBeenCalled();
    spyOnEndDateChange.calls.reset();


    component.endDate = new Date(2010, 7, 5);
    component.onDateSelected(new Date(2011, 7, 5));
    expect(spyOnEndDateChange).toHaveBeenCalled();
    expect(spyOnStartDateChange).toHaveBeenCalled();
  });
});
