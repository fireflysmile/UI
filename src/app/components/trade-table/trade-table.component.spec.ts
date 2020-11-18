import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as _ from 'lodash';
import { EDART_INITIAL_COLUMNS } from 'src/app/services/components/column-config/trade-table';
import { TableColumnService } from 'src/app/services/components/table-column.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { mockTradeItems } from 'src/assets/data/trade/mock-trade-items';
import { CardActionsModule } from '../card-actions/card-actions.module';
import { RectCardModule } from '../rect-card/rect-card.module';
import { TableModule } from '../table/table.module';

import { TradeTableComponent } from './trade-table.component';

describe('TradeTableComponent', () => {
  let component: TradeTableComponent;
  let fixture: ComponentFixture<TradeTableComponent>;
  let tableColumnService: TableColumnService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TradeTableComponent],
      imports: [
        TestSharedModule,
        RectCardModule,
        CardActionsModule,
        TableModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeTableComponent);
    tableColumnService = TestBed.inject(TableColumnService);
    component = fixture.componentInstance;
    component.trades = _.cloneDeep(mockTradeItems);
    component.ngOnChanges({
      trades: {
        previousValue: _.cloneDeep(mockTradeItems),
        currentValue: _.cloneDeep(mockTradeItems),
        firstChange: false,
        isFirstChange: () => false,
      },
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should download file', () => {
    const spyOnCreateURL = spyOn(window.URL, 'createObjectURL');
    component.actionGroups[0][0].action();
    expect(spyOnCreateURL).toHaveBeenCalled();
  });

  it('should clear all search', () => {
    component.filters = [
      {
        value: 'value',
        property: 'value',
        type: 'default',
      },
    ];
    expect(component.actionGroups[1][0].disabled()).toEqual(false);
    component.actionGroups[1][0].action();
    expect(component.filters).toEqual([]);
  });

  it('should clear all sort', () => {
    component.actionGroups[1][1].action();
    expect(component.sort).toBeFalsy();
  });

  it('should save filter', () => {
    component.columns = _.cloneDeep(EDART_INITIAL_COLUMNS);
    component.filters = [
      {
        value: ['value'],
        property: 'value',
        type: 'default',
      },
      {
        value: ['value'],
        property: 'tmCode',
        type: 'default',
      },
    ];
    component.actionGroups[1][2].action();
    expect(tableColumnService.tradeColumnFilters.length).toEqual(2);
  });

  it('should load filter', () => {
    tableColumnService.tradeColumnFilters = [
      {
        value: ['value'],
        property: 'tmCode',
        type: 'default',
      },
      {
        value: null,
        property: 'pcCode',
        type: 'default',
      },
    ];
    component.filters = [
      {
        value: ['value'],
        property: 'tmCode',
        type: 'default',
      },
      {
        value: null,
        property: 'pcCode',
        type: 'default',
      },
    ];
    component.actionGroups[1][3].action();
    expect(component.displayableData).toBeTruthy();
  });

  it('should show grid', () => {
    component.actionGroups[2][0].action();
    expect(component.layoutView).toEqual(true);
  });

  it('should update limit displayable data', () => {
    component.trades = null;
    component.limitedDisplayableData = null;
    component.ngOnChanges({});
    expect(component.limitedDisplayableData).toBeFalsy();

    component.trades = _.cloneDeep(mockTradeItems);
    component.maxRows = 5;
    component.ngOnChanges({});
    expect(component.limitedDisplayableData).toBeFalsy();

    component.ngOnChanges({
      maxRows: {
        previousValue: 5,
        currentValue: 5,
        firstChange: false,
        isFirstChange: () => false,
      },
    });
    expect(component.limitedDisplayableData.length <= 5).toEqual(true);

    component.limitedDisplayableData = null;
    component.displayableData = null;
    component.ngOnChanges({
      maxRows: {
        previousValue: 5,
        currentValue: 5,
        firstChange: false,
        isFirstChange: () => false,
      },
    });
    expect(component.limitedDisplayableData).toBeFalsy();
  });
});
