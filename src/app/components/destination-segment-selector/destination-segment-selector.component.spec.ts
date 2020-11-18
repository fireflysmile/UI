import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationSegmentSelectorComponent } from './destination-segment-selector.component';
import { AutoCloserModule } from '../auto-closer/auto-closer.module';
import { AutoPositionerModule } from '../auto-positioner/auto-positioner.module';
import { AutoScrollModule } from '../auto-scroll/auto-scroll.module';
import { NgControl, FormControl } from '@angular/forms';
import { RectCardModule } from '../rect-card/rect-card.module';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { OtrRequestSummaryModule } from '../otr-request-summary/otr-request-summary.module';

describe('DestinationSegmentSelectorComponent', () => {
  let component: DestinationSegmentSelectorComponent;
  let fixture: ComponentFixture<DestinationSegmentSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DestinationSegmentSelectorComponent],
      imports: [
        AutoCloserModule,
        AutoPositionerModule,
        AutoScrollModule,
        RectCardModule,
        TestSharedModule,
        OtrRequestSummaryModule,
      ],
    })
      .overrideComponent(DestinationSegmentSelectorComponent, {
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
    fixture = TestBed.createComponent(DestinationSegmentSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
