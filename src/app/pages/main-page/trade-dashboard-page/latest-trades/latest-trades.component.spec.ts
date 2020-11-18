import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as _ from 'lodash';
import { ToggleFilterModule } from 'src/app/components/toggle-filter/toggle-filter.module';
import { TradeCardModule } from 'src/app/components/trade-card/trade-card.module';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { mockTradeItems } from 'src/assets/data/trade/mock-trade-items';

import { LatestTradesComponent } from './latest-trades.component';

describe('LatestTradesComponent', () => {
  let component: LatestTradesComponent;
  let fixture: ComponentFixture<LatestTradesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LatestTradesComponent],
      imports: [TestSharedModule, TradeCardModule, ToggleFilterModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestTradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change filter', () => {
    component.ngOnChanges();
    expect(component.filteredTrades).toBeFalsy();

    component.allTrades = _.cloneDeep(mockTradeItems);
    component.onTradeTypeChanged('pc');
    expect(component.filteredTrades).toBeTruthy();

    component.allTrades = _.cloneDeep(mockTradeItems);
    component.onTradeTypeChanged('non-pc');
    expect(component.filteredTrades).toBeTruthy();

    component.allTrades = _.cloneDeep(mockTradeItems);
    component.onTradeTypeChanged('');
    expect(component.filteredTrades).toBeTruthy();

    component.allTrades = _.cloneDeep(mockTradeItems);
    component.onStatusChanged('Modified');
    expect(component.filteredTrades).toBeTruthy();

    component.allTrades = _.cloneDeep(mockTradeItems);
    component.onStatusChanged('Confirmed');
    expect(component.filteredTrades).toBeTruthy();

    component.allTrades = _.cloneDeep(mockTradeItems);
    component.onStatusChanged('Rejected');
    expect(component.filteredTrades).toBeTruthy();
  });
});
