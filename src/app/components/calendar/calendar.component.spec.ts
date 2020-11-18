import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { CalendarComponent } from './calendar.component';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent) as ComponentFixture<
      CalendarComponent
    >;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update calendar view if change date', fakeAsync(() => {
    const spyOnViewChange = spyOn(
      component.viewChange,
      'emit'
    ).and.callThrough();
    const today = new Date();
    component.changeSelectedDate(today);
    component.changeCalendarDate(12, 1);
    component.selectedDate = null;
    component.selectedDate = today;
    component.displayDate = null;
    expect(component.displayDate).toBeTruthy();
    component.displayDate = today;
    component.startDay = 3;
    component.minDate = today;
    component.maxDate = today;
    tick(100);
    expect(spyOnViewChange).toHaveBeenCalledTimes(1);
    expect(component.startDay).toEqual(3);
    expect(component.minDate).toEqual(today);
    expect(component.maxDate).toEqual(today);
  }));

  it('should change display date if click to prev/next month', fakeAsync(() => {
    const today = new Date();
    const next100Date = new Date(today);
    next100Date.setDate(next100Date.getDate() + 100);
    const previous100Date = new Date(today);
    previous100Date.setDate(previous100Date.getDate() - 100);

    component.minDate = null;
    component.maxDate = null;
    component.minDate = next100Date;
    component.maxDate = previous100Date;
    component.toPrevMonth();
    component.toNextMonth();
    tick(100);
    const spyOnViewChange = spyOn(
      component.viewChange,
      'emit'
    ).and.callThrough();
    expect(spyOnViewChange).not.toHaveBeenCalled();

    component.minDate = previous100Date;
    component.maxDate = next100Date;
    component.toPrevMonth();
    component.toNextMonth();
    tick(100);
    expect(spyOnViewChange).toHaveBeenCalledTimes(1);

    spyOnViewChange.calls.reset();
    (component as any)._minDate = null;
    (component as any)._maxDate = null;
    component.toPrevMonth();
    component.toNextMonth();
    tick(100);
    expect(spyOnViewChange).toHaveBeenCalledTimes(1);
  }));

  it('should update calendar view if switch to month view', fakeAsync(() => {
    const spyOnViewChange = spyOn(
      component.viewChange,
      'emit'
    ).and.callThrough();
    component.toMonthView();
    tick(100);
    expect(spyOnViewChange).toHaveBeenCalledTimes(1);
  }));

  it('should get this year/month if selected date is null', fakeAsync(() => {
    const today = new Date();
    const thisYear = today.getFullYear();
    const thisMonth = today.getMonth();
    component.changeSelectedDate(null);
    tick(1000);
    expect(component.displayYear).toEqual(thisYear);
    expect(component.displayMonth).toEqual(thisMonth);
  }));
});
