import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as _ from 'lodash';
import { clearingMemberInfos } from 'src/assets/data/member/clearing-member-infos';
import { mockTradeItems } from 'src/assets/data/trade/mock-trade-items';

import { TradeOverviewBaseComponent } from './trade-overview-base.component';

describe('TradeOverviewBaseComponent', () => {
  let component: TradeOverviewBaseComponent;
  let fixture: ComponentFixture<TradeOverviewBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TradeOverviewBaseComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeOverviewBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should compile cmdicts', () => {
    const spyOnUpdateCharts = spyOn(component.updateCharts, 'emit');
    component.ngOnChanges({
      clearingMembers: {
        previousValue: [],
        currentValue: [],
        firstChange: false,
        isFirstChange: () => false,
      },
    });
    expect(spyOnUpdateCharts).not.toHaveBeenCalled();
    spyOnUpdateCharts.calls.reset();

    component.clearingMembers = _.cloneDeep(clearingMemberInfos);
    component.ngOnChanges({
      clearingMembers: {
        previousValue: [],
        currentValue: [],
        firstChange: false,
        isFirstChange: () => false,
      },
    });
    expect(spyOnUpdateCharts).toHaveBeenCalled();
    spyOnUpdateCharts.calls.reset();

    component.clearingMembers = [];
  });

  it('should change filter', () => {
    const spyOnFilterChange = spyOn(
      component,
      'onFilterChange'
    ).and.callThrough();
    component.ngOnChanges({
      allTrades: {
        previousValue: [],
        currentValue: [],
        firstChange: false,
        isFirstChange: () => false,
      },
    });

    component.onSegmentChanged('');
    component.onLevelChanged('cm');
    component.onParamChanged('value');
    component.onTradeTypeChanged('');
    component.onMarginableChanged('');

    expect(spyOnFilterChange).toHaveBeenCalledTimes(5);
    spyOnFilterChange.calls.reset();

    const spyOnUpdateCharts = spyOn(component.updateCharts, 'emit');

    component.allTrades = _.cloneDeep(mockTradeItems);
    component.onSegmentChanged('MC');
    expect(spyOnUpdateCharts).toHaveBeenCalled();
    spyOnUpdateCharts.calls.reset();

    component.allTrades = [];
    component.onSegmentChanged('');
    expect(spyOnUpdateCharts).toHaveBeenCalled();
    spyOnUpdateCharts.calls.reset();

    component.allTrades = _.cloneDeep(mockTradeItems);
    component.onTradeTypeChanged('pc');
    expect(spyOnUpdateCharts).toHaveBeenCalled();
    spyOnUpdateCharts.calls.reset();

    component.allTrades = _.cloneDeep(mockTradeItems);
    component.onTradeTypeChanged('otr');
    expect(spyOnUpdateCharts).toHaveBeenCalled();
    spyOnUpdateCharts.calls.reset();

    component.allTrades = _.cloneDeep(mockTradeItems);
    component.onMarginableChanged('true');
    expect(spyOnUpdateCharts).toHaveBeenCalled();
    spyOnUpdateCharts.calls.reset();

    component.allTrades = _.cloneDeep(mockTradeItems);
    component.filters.qty = {
      type: 'default',
      value: '41',
    };
    component.filters.value = {
      type: 'eq',
      value: '9225',
    };
    component.filters.pc = [
      {
        value: 'eq',
        label: '9225',
      },
    ];
    component.filters.cm = [
      {
        value: 'eq',
        label: '9225',
      },
    ];
    component.onLevelChanged('cm');
    component.filters.qty = {
      type: 'default',
    };
    component.filters.value = {
      type: 'eq',
    };
    component.filters.tm = [
      {
        value: 'eq',
        label: '9225',
      },
    ];
    component.onLevelChanged('tm');

    component.filters.ec = [
      {
        value: 'eq',
        label: '9225',
      },
    ];
    component.onLevelChanged('ec');

    component.filters.qty = {
      type: 'lt',
    };
    component.onLevelChanged('tm');

    component.filters.qty = {
      type: 'lt',
      value: '123',
    };
    component.onLevelChanged('tm');

    component.filters.qty = {
      type: 'gt',
    };
    component.onLevelChanged('tm');

    component.filters.qty = {
      type: 'gt',
      value: '123',
    };
    component.onLevelChanged('tm');

    component.filters.qty = {
      type: 'lte',
    };
    component.onLevelChanged('tm');

    component.filters.qty = {
      type: 'lte',
      value: '123',
    };
    component.onLevelChanged('tm');

    component.filters.qty = {
      type: 'gte',
    };
    component.onLevelChanged('tm');

    component.filters.qty = {
      type: 'gte',
      value: '123',
    };
    component.onLevelChanged('tm');

    component.filters.qty = {
      type: 'range',
    };
    component.onLevelChanged('tm');

    component.filters.qty = {
      type: 'range',
      value: {
        start: '1234',
        end: '1234',
      } as any,
    };
    component.onLevelChanged('tm');

    component.filters.qty = {
      type: 'range',
      value: {
        end: '1234',
      } as any,
    };
    component.onLevelChanged('tm');

    component.filters.qty = {
      type: 'range',
      value: {} as any,
    };
    component.onLevelChanged('tm');
    expect(spyOnUpdateCharts).toHaveBeenCalledTimes(15);
    spyOnUpdateCharts.calls.reset();
  });

  it('should close other filters', () => {
    component.dynamicFilterRefs = [
      {
        closeModal: () => {},
      },
      {
        closeModal: () => {},
      },
    ] as any;
    const spyOnCloseOtherModal = spyOn(
      component.dynamicFilterRefs[1],
      'closeModal'
    );
    component.closeOtherFilters(component.dynamicFilterRefs[0]);
    expect(spyOnCloseOtherModal).toHaveBeenCalled();
  });

  it('should set column chart data', () => {
    component.columnChart = null;
    (component as any)._setUpColumnChartData(null);
    expect(component.columnChart).toEqual(null);

    (component as any)._tmToCmMap = null;
    component.level = 'cm';
    (component as any)._setUpColumnChartData([]);
    expect(component.columnChart).toEqual(null);

    component.param = null;
    component.level = 'tm';
    (component as any)._setUpColumnChartData([]);
    expect(component.columnChart).toEqual(null);

    component.param = 'value';
    (component as any)._setUpColumnChartData(_.cloneDeep(mockTradeItems));
    expect(component.columnChart).toBeTruthy();

    (component as any)._tmToCmMap = {};
    component.level = 'cm';
    component.param = 'number';
    (component as any)._setUpColumnChartData(_.cloneDeep(mockTradeItems));
    expect(component.columnChart).toBeTruthy();

    component.level = 'pc';
    component.overviewType = 'pc';
    (component as any)._setUpColumnChartData(_.cloneDeep(mockTradeItems));
    expect(component.columnChart).toBeTruthy();

    component.param = 'value';
    component.overviewType = 'overall';
    (component as any)._setUpColumnChartData(_.cloneDeep(mockTradeItems));
    expect(component.columnChart).toBeTruthy();
  });

  it('should get trade summaries', () => {
    expect(
      (component as any)._getTradeSummaries(_.cloneDeep(mockTradeItems), 'ec')
    ).toBeTruthy();
    expect(
      (component as any)._getTradeSummaries(
        _.cloneDeep(mockTradeItems),
        'status'
      )
    ).toBeTruthy();

    component.overviewType = 'pc';
    expect(
      (component as any)._getTradeSummaries(_.cloneDeep(mockTradeItems), 'tm')
    ).toBeTruthy();
  });

  it('should split top oerforming summaries', () => {
    expect(
      (component as any)._splitTopPerformingSummaries(
        {
          trade1: {
            label: 'string',
            value: 0,
            number: 0,
            tooltipText: 'string',
            sub: {
              trade2: {
                label: 'string',
                value: 0,
                number: 0,
                tooltipText: 'string',
              },
              trade3: {
                label: 'string',
                value: 0,
                number: 0,
                tooltipText: 'string',
              },
            },
          },
          trade2: {
            label: 'string',
            value: 0,
            number: 0,
            tooltipText: 'string',
            sub: {
              trade2: {
                label: 'string',
                value: 0,
                number: 0,
                tooltipText: 'string',
              },
              trade3: {
                label: 'string',
                value: 0,
                number: 0,
                tooltipText: 'string',
              },
            },
          },
          trade3: {
            label: 'string',
            value: 0,
            number: 0,
            tooltipText: 'string',
            sub: {
              trade2: {
                label: 'string',
                value: 0,
                number: 0,
                tooltipText: 'string',
              },
              trade3: {
                label: 'string',
                value: 0,
                number: 0,
                tooltipText: 'string',
              },
            },
          },
        },
        1,
        true
      )
    ).toBeTruthy();
  });

  it('should set up table trades', () => {
    component.tableTrades = null;
    (component as any)._setUpTableTrades(null);
    expect(component.tableTrades).toBeFalsy();

    (component as any)._setUpTableTrades(_.cloneDeep(mockTradeItems));
    expect(component.tableTrades).toBeTruthy();

    component.status = 'Modified';
    (component as any)._setUpTableTrades(_.cloneDeep(mockTradeItems));
    expect(component.tableTrades).toBeTruthy();

    component.status = 'Confirmed';
    (component as any)._setUpTableTrades(_.cloneDeep(mockTradeItems));
    expect(component.tableTrades).toBeTruthy();

    component.status = 'Rejected';
    (component as any)._setUpTableTrades(_.cloneDeep(mockTradeItems));
    expect(component.tableTrades).toBeTruthy();
  });
});
