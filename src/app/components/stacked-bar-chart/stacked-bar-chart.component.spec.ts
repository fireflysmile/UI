import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { StackedBarChartComponent } from './stacked-bar-chart.component';
import { StackedBarChartModule } from './stacked-bar-chart.module';

describe('StackedBarChartComponent', () => {
  let component: StackedBarChartComponent;
  let fixture: ComponentFixture<StackedBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [StackedBarChartModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackedBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show correct data style', fakeAsync(() => {
    component.data = null;
    component.data = [
      {
        label: 'January',
        values: [
          { key: 'Key Approvals', value: 97 },
          { key: 'Mandatory Submissions', value: 779 },
          { key: 'Other Compliances', value: 121 },
        ],
      },
      {
        label: 'February',
        values: [
          { key: 'Key Approvals', value: 636 },
          { key: 'Mandatory Submissions', value: 618 },
          { key: 'Other Compliances', value: 190 },
        ],
      },
      {
        label: 'March',
        values: [
          { key: 'Key Approvals', value: 192 },
          { key: 'Mandatory Submissions', value: 861 },
          { key: 'Other Compliances', value: 564 },
        ],
      },
      {
        label: 'April',
        values: [
          { key: 'Key Approvals', value: 464 },
          { key: 'Mandatory Submissions', value: 239 },
          { key: 'Other Compliances', value: 198 },
        ],
      },
      {
        label: 'May',
        values: [
          { key: 'Key Approvals', value: 571 },
          { key: 'Mandatory Submissions', value: 889 },
          { key: 'Other Compliances', value: 192 },
        ],
      },
      {
        label: 'June',
        values: [
          { key: 'Key Approvals', value: 742 },
          { key: 'Mandatory Submissions', value: 176 },
          { key: 'Other Compliances', value: 42 },
        ],
      },
      {
        label: 'July',
        values: [
          { key: 'Key Approvals', value: 317 },
          { key: 'Mandatory Submissions', value: 526 },
          { key: 'Other Compliances', value: 189 },
        ],
      },
      {
        label: 'August',
        values: [
          { key: 'Key Approvals', value: 821 },
          { key: 'Mandatory Submissions', value: 884 },
          { key: 'Other Compliances', value: 480 },
        ],
      },
      {
        label: 'September',
        values: [
          { key: 'Key Approvals', value: 144 },
          { key: 'Mandatory Submissions', value: 549 },
          { key: 'Other Compliances', value: 652 },
        ],
      },
    ];
    component.colors = [
      { key: 'Key Approvals', color: '#16325C' },
      { key: 'Mandatory Submissions', color: '#0070D1' },
      { key: 'Other Compliances', color: '#0A7E78' },
    ];
    component.steps = 1;
    tick(1000);
    expect(
      (component.getGridPosition(1) as any)
        .changingThisBreaksApplicationSecurity
    ).toEqual('calc((100% / 1) * 2)');

    component.steps = 10;
    component.data = [
      {
        label: 'January',
        values: [{ key: 'Key Approvals', value: 1 }],
      },
    ];
    tick(1000);
    expect(component.maximum).toEqual(11);

    expect(component.anyBarSelected).toEqual(false);

    const spyOnSelectionChange = spyOn(component.selectionChange, 'emit');
    component.data = [
      {
        label: 'January',
        values: [
          { key: 'Key Approvals', value: 1 },
          { key: 'Key Approvals', value: 1, selected: true },
        ],
      },
    ];
    component.onToggleSelection([
      {
        key: 'January',
        value: 0,
        selected: true,
        tooltipText: 'string',
      },
    ]);
    tick(1000);
    expect(spyOnSelectionChange).toHaveBeenCalled();
    spyOnSelectionChange.calls.reset();

    component.data = [
      {
        label: 'January',
        values: [
          { key: 'Key Approvals', value: 1 },
          { key: 'Key Approvals', value: 1, selected: true },
        ],
      },
    ];
    component.onToggleSelection([component.data[0].values[1]]);
    expect(spyOnSelectionChange).toHaveBeenCalled();
    spyOnSelectionChange.calls.reset();
    tick(1000);
  }));
});
