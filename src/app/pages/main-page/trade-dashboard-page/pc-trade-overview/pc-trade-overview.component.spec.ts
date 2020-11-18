import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as _ from 'lodash';
import { mockTradeItems } from 'src/assets/data/trade/mock-trade-items';

import { PcTradeOverviewComponent } from './pc-trade-overview.component';

describe('PcTradeOverviewComponent', () => {
  let component: PcTradeOverviewComponent;
  let fixture: ComponentFixture<PcTradeOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PcTradeOverviewComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcTradeOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update chart', () => {
    component.level = 'cm';
    component.filteredTrades = null;
    component.updateCharts.next();
    expect(component.donutChart).toBeFalsy();

    component.filteredTrades = _.cloneDeep(mockTradeItems);
    component.param = null;
    component.updateCharts.next();
    expect(component.donutChart).toBeFalsy();

    component.param = 'value';
    component.updateCharts.next();
    expect(component.donutChart).toBeTruthy();

    component.param = 'number';
    component.updateCharts.next();
    expect(component.donutChart).toBeTruthy();

    component.level = 'tm';
    component.updateCharts.next();
    expect(component.tableTrades).toBeTruthy();

    component.filteredTrades = _.cloneDeep(mockTradeItems);
    component.columnChart.data = [
      {
        // label
        label: 'string',
        // values
        values: [
          {
            key: 'string',
            value: 0,
            selected: false,
            tooltipText: 'string',
            codes: {
              PC22: 'string',
            },
          } as any,
          {
            key: 'string',
            value: 0,
            selected: true,
            tooltipText: 'string',
            codes: {
              PC22: 'string',
            },
          },
        ],
        highlighted: false,
        highlightedLabel: 'string',
        tooltipText: 'string',
        fullData: null,
        codes: {
          code1: 'string',
        },
      } as any,
    ];
    component.onStatusChanged('Confirmed');
    expect(component.tableTrades).toBeTruthy();

    component.level = 'cm';
    component.onColumnChartSelectionChanged();
    expect(component.donutChart).toBeTruthy();

    component.level = 'ec';
    component.onColumnChartSelectionChanged();
    expect(component.tableTrades).toBeTruthy();

    component.level = 'pc';
    component.onStatusChanged('Confirmed');
    expect(component.tableTrades).toBeTruthy();

    component._columnTrades = _.cloneDeep(mockTradeItems);
    component.level = 'tm';
    component.onColumnChartSelectionChanged();
    expect(component.tableTrades).toBeTruthy();

    component.donutChart.data = [
      {
        label: 'string',
        values: [
          {
            key: 'string',
            value: 0,
            selected: false,
            tooltipText: 'string',
            codes: {
              PC22: 'string',
            },
          } as any,
          {
            key: 'string',
            value: 0,
            selected: true,
            tooltipText: 'string',
            codes: {
              PC22: 'string',
            },
          },
        ],
        highlighted: false,
        highlightedLabel: 'string',
        tooltipText: 'string',
        fullData: null,
        codes: {
          code1: 'string',
        },
      } as any,
      {
        // label
        label: 'string',
        selected: true,
        values: [
          {
            key: 'string',
            value: 0,
            selected: false,
            tooltipText: 'string',
            codes: {
              PC22: 'string',
            },
          } as any,
          {
            key: 'string',
            value: 0,
            selected: true,
            tooltipText: 'string',
            codes: {
              PC26: 'string',
            },
          },
        ],
        highlighted: false,
        highlightedLabel: 'string',
        tooltipText: 'string',
        fullData: null,
        codes: {
          code1: 'string',
        },
      } as any,
    ];

    component._columnTrades = _.cloneDeep(mockTradeItems);
    component.onConfirmationByChanged('me');
    component.onDonutChartSelectionChanged();
    expect(component.tableTrades).toBeTruthy();
  });

  it('should set up column chart data', () => {
    component.userType = 'cm';
    (component as any)._setUpColumnChartData(_.cloneDeep(mockTradeItems));
    expect(component._columnTrades).toBeTruthy();

    component.confirmedBy = 'others';
    (component as any)._setUpColumnChartData(_.cloneDeep(mockTradeItems));
    expect(component._columnTrades).toBeTruthy();

    component.confirmedBy = null;
    (component as any)._setUpColumnChartData(_.cloneDeep(mockTradeItems));
    expect(component._columnTrades).toBeTruthy();
  });

  it('should set level options', () => {
    component.userType = 'cm';
    component.ngOnInit();
    expect(component.levelOptions.length).toEqual(2);

    component.userType = 'tm';
    component.ngOnInit();
    expect(component.levelOptions.length).toEqual(1);
  });
});
