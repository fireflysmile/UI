import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { WaterfallBarChartModule } from '../icons/waterfall-bar-chart/waterfall-bar-chart.module';

import { PcModificationStatusComponent } from './pc-modification-status.component';

describe('PcModificationStatusComponent', () => {
  let component: PcModificationStatusComponent;
  let fixture: ComponentFixture<PcModificationStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PcModificationStatusComponent],
      imports: [TestSharedModule, WaterfallBarChartModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcModificationStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set chart data', () => {
    component.data = null;
    expect(component.chartData).toBeFalsy();
    component.data = {
      confirmed: 10,
      unconfirmed: {
        modified: 10,
        manuallyModified: 10,
        unmodified: 10,
      },
      nonPcTrades: 10,
    };
    expect(component.chartData).toBeTruthy();
  });
});
