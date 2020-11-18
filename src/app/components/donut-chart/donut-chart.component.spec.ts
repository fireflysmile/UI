import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import * as _ from 'lodash';
import * as d3 from 'd3';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { MoreOptionsModule } from '../more-options/more-options.module';

import { DonutChartComponent } from './donut-chart.component';

const chartData = [
  { label: 'Review Pending', value: 4531, color: '#76DED9' },
  { label: 'In-Progress', value: 2780, color: '#0070D1' },
  { label: 'Post Checks', value: 1566, color: '#16325C' },
  {
    label: 'Final Approval',
    value: 1827,
    color: '#0DA69E',
    tooltipText: 'tooltipText',
  },
];
describe('DonutChartComponent', () => {
  let component: DonutChartComponent;
  let fixture: ComponentFixture<DonutChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DonutChartComponent],
      imports: [TestSharedModule, MoreOptionsModule],
    }).compileComponents();
  }));

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(DonutChartComponent);
    component = fixture.componentInstance;
    component.data = null;
    fixture.detectChanges();
    tick();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show correct data', fakeAsync(() => {
    component.data = _.cloneDeep(chartData);
    tick();
    fixture.detectChanges();
    const tspans = component.canvas
      .selectAll('tspan')
      .nodes()
      .map((d) => (d as any).textContent);
    let isMatch = true;
    _.forEach(chartData, (data) => {
      if (tspans.indexOf(data.label) < 0) {
        isMatch = false;
      }
    });
    expect(isMatch).toEqual(true);

    component.showLabels = false;
    component.showTotal = false;
    component.data = _.cloneDeep(chartData);
    component.data[0].selected = true;
    tick();
    fixture.detectChanges();
    _.forEach(chartData, (data) => {
      if (tspans.indexOf(data.label) < 0) {
        isMatch = false;
      }
    });
    expect(isMatch).toEqual(true);
  }));

  it('should update ui with mouse event', fakeAsync(() => {
    component.data = _.cloneDeep(chartData);
    tick(1000);
    fixture.detectChanges();
    tick(1000);

    const path = component.canvas.selectAll('path').nodes()[0];
    const path2 = component.canvas.selectAll('path').nodes()[1];
    const evtClick = new MouseEvent('click');
    const spyOnStop = spyOn(evtClick, 'stopPropagation');
    (path as any).dispatchEvent(evtClick);
    expect(spyOnStop).not.toHaveBeenCalled();
    component.clickable = true;
    (path as any).dispatchEvent(evtClick);
    expect(spyOnStop).toHaveBeenCalled();

    const evtMouseover = new MouseEvent('mouseover');
    (path as any).dispatchEvent(evtMouseover);
    component.data[0].tooltipText = 'tooltip';
    (path as any).dispatchEvent(evtMouseover);
    expect(d3.select('app-more-options p').text()).toEqual('tooltip');

    component.data[0].tooltipText = '';
    const evtMouseout = new MouseEvent('mouseout');
    (path as any).dispatchEvent(evtMouseout);
    expect(d3.select('app-more-options').classed('hidden')).toEqual(false);

    component.data[0].tooltipText = 'tooltip';
    (path as any).dispatchEvent(evtMouseout);
    expect(d3.select('app-more-options').classed('hidden')).toEqual(true);

    component.data[0].tooltipText = '';
    const evtMousemove = new MouseEvent('mousemove');
    (path as any).dispatchEvent(evtMousemove);
    expect(d3.select('app-more-options').style('left')).toBeTruthy();

    component.data[0].tooltipText = 'tooltip';
    (path as any).dispatchEvent(evtMousemove);
    expect(d3.select('app-more-options').style('left')).toBeTruthy();

    const spyOnSelectionChange = spyOn(component.selectionChange, 'emit');
    component.clickable = false;
    component.canvas.node().dispatchEvent(evtClick);
    expect(spyOnSelectionChange).not.toHaveBeenCalled();

    component.clickable = true;
    _.forEach(component.data, (d) => {
      d.selected = false;
    });
    component.canvas.node().dispatchEvent(evtClick);
    expect(spyOnSelectionChange).not.toHaveBeenCalled();
  }));
});
