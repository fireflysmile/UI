import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { AutoCloserModule } from '../auto-closer/auto-closer.module';
import { CalendarModule } from '../calendar/calendar.module';
import { DateInputModule } from '../date-input/date-input.module';
import { MoreOptionsModule } from '../more-options/more-options.module';

import { DateOfChangeItemComponent } from './date-of-change-item.component';

describe('DateOfChangeItemComponent', () => {
  let component: DateOfChangeItemComponent;
  let fixture: ComponentFixture<DateOfChangeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DateOfChangeItemComponent],
      imports: [
        TestSharedModule,
        MoreOptionsModule,
        DateInputModule,
        CalendarModule,
        AutoCloserModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateOfChangeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
