import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardActionsComponent } from './card-actions.component';
import { DividerModule } from '../divider/divider.module';
import { CardActionItemModule } from '../card-action-item/card-action-item.module';
import { MoreOptionsModule } from '../more-options/more-options.module';
import { AutoCloserModule } from '../auto-closer/auto-closer.module';
import { AutoPositionerModule } from '../auto-positioner/auto-positioner.module';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { DateInputModule } from '../date-input/date-input.module';
import { FormFieldModule } from '../form-field/form-field.module';
import { RangeCalendarModule } from '../range-calendar/range-calendar.module';

describe('CardActionsComponent', () => {
  let component: CardActionsComponent;
  let fixture: ComponentFixture<CardActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardActionsComponent],
      imports: [
        TestSharedModule,
        DividerModule,
        CardActionItemModule,
        MoreOptionsModule,
        AutoCloserModule,
        AutoPositionerModule,
        DateInputModule,
        FormFieldModule,
        RangeCalendarModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
