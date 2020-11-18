import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconCalendarRangeComponent } from './icon-calendar-range.component';

describe('IconCalendarRangeComponent', () => {
  let component: IconCalendarRangeComponent;
  let fixture: ComponentFixture<IconCalendarRangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconCalendarRangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconCalendarRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
