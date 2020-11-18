import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import * as _ from 'lodash';
import { mockWaterfallBarChartData } from 'src/assets/data/waterfallBarChart/mock-waterfall-bart-chart';

import { WaterfallBarChartComponent } from './waterfall-bar-chart.component';

describe('WaterfallBarChartComponent', () => {
  let component: WaterfallBarChartComponent;
  let fixture: ComponentFixture<WaterfallBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WaterfallBarChartComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterfallBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set chart data', fakeAsync(() => {
    component.data = null;
    expect(component.bars).toEqual([]);
    component.data = _.cloneDeep(mockWaterfallBarChartData);
    tick();
    fixture.detectChanges();
    expect(component.bars.length).toEqual(6);
    component.data = null;
    const mockChartData = _.cloneDeep(mockWaterfallBarChartData);
    mockChartData.values = [0];
    component.data = mockChartData;
    expect(component.bars.length).toEqual(5);
    tick();
    fixture.detectChanges();
  }));

  it('should update ui when window resize', fakeAsync(() => {
    const spyOnSetWidth = spyOn(component as any, '_setWidthOfDashedLines');
    component.onWindowResize();
    tick();
    fixture.detectChanges();
    expect(spyOnSetWidth).toHaveBeenCalled();
  }));
});
