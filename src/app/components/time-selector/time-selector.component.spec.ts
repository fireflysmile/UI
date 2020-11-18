import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSelectorComponent } from './time-selector.component';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { NgxMaskModule } from 'ngx-mask';
import { AutoFocusModule } from '../auto-focus/auto-focus.module';
import { AutoCloserModule } from '../auto-closer/auto-closer.module';
import { PositionFixerModule } from '../position-fixer/position-fixer.module';
import { AutoScrollModule } from '../auto-scroll/auto-scroll.module';
import { NgControl, FormControl } from '@angular/forms';

describe('TimeSelectorComponent', () => {
  let component: TimeSelectorComponent;
  let fixture: ComponentFixture<TimeSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TimeSelectorComponent],
      imports: [
        TestSharedModule,
        NgxMaskModule.forRoot(),
        AutoFocusModule,
        AutoCloserModule,
        PositionFixerModule,
        AutoScrollModule,
      ],
    })
      .overrideComponent(TimeSelectorComponent, {
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
    fixture = TestBed.createComponent(TimeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
