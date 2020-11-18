import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { AutoCloserModule } from '../auto-closer/auto-closer.module';
import { AutoPositionerModule } from '../auto-positioner/auto-positioner.module';
import { CalendarModule } from '../calendar/calendar.module';
import { DateInputModule } from '../date-input/date-input.module';
import { LoginAccessTabRouterModule } from '../login-access-tab-router/login-access-tab-router.module';
import { MoreOptionsModule } from '../more-options/more-options.module';
import { RectCardModule } from '../rect-card/rect-card.module';

import { DateSelectorComponent } from './date-selector.component';

describe('DateSelectorComponent', () => {
  let component: DateSelectorComponent;
  let fixture: ComponentFixture<DateSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DateSelectorComponent],
      imports: [
        TestSharedModule,
        MoreOptionsModule,
        DateInputModule,
        CalendarModule,
        AutoCloserModule,
        AutoPositionerModule,
        RectCardModule,
        LoginAccessTabRouterModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
