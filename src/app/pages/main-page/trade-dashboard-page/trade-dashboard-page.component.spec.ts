import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { PageContentModule } from 'src/app/components/page-content/page-content.module';
import { UserInfoItem } from 'src/app/models/user-info-item';
import { TradeService } from 'src/app/services/api/trade.service';
import { AppService } from 'src/app/services/components/app.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { mockTradeItems } from 'src/assets/data/trade/mock-trade-items';

import { TradeDashboardPageComponent } from './trade-dashboard-page.component';

describe('TradeDashboardPageComponent', () => {
  let component: TradeDashboardPageComponent;
  let fixture: ComponentFixture<TradeDashboardPageComponent>;
  let appService: AppService;
  let tradeService: TradeService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TradeDashboardPageComponent],
      imports: [TestSharedModule, PageContentModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeDashboardPageComponent);
    appService = TestBed.inject(AppService);
    tradeService = TestBed.inject(TradeService);
    spyOn(tradeService, 'getTrades').and.returnValue(
      of(_.cloneDeep(mockTradeItems))
    );
    const userInfo: UserInfoItem = {
      role: 'RO',
    };
    appService.userInfo = userInfo;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update user type', () => {
    let userInfo: UserInfoItem = {
      role: 'LCN Admin',
    };
    appService.userInfo = userInfo;
    expect(component.userType).toEqual('lcn');

    userInfo = {
      role: 'CM & TM',
    };
    appService.userInfo = userInfo;
    expect(component.userType).toEqual('cm');

    userInfo = {
      role: 'CM',
    };
    appService.userInfo = userInfo;
    expect(component.userType).toEqual('cm');

    userInfo = {
      role: 'TM',
    };
    appService.userInfo = userInfo;
    expect(component.userType).toEqual('tm');

    component.onViewModeChanged('cm');
    expect(component.userType).toEqual('cm');
  });
});
