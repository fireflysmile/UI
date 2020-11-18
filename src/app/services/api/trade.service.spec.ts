import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { TradeService } from './trade.service';

describe('TradeService', () => {
  let service: TradeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TradeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return correct trades', fakeAsync(() => {
    service.getTrades().subscribe((rs) => {
      expect(rs).toBeTruthy();
    });

    const tmCodes = [];
    const pcCodes = [];
    for (let i = 0; i < 2000; i++) {
      tmCodes.push(`TM${i}`);
      pcCodes.push(`PC${i}`);
    }
    service.getTrades(tmCodes, pcCodes).subscribe((rs) => {
      expect(rs).toBeTruthy();
    });
    service.getTrades(tmCodes, null).subscribe((rs) => {
      expect(rs).toBeTruthy();
    });
    service.getTrades([], []).subscribe((rs) => {
      expect(rs).toBeTruthy();
    });

    tick(1000);
  }));

  it('should get clearing member info', fakeAsync(() => {
    service.getClearingMemberInfo().subscribe((rs) => {
      expect(rs).toBeTruthy();
    });
    tick(1000);
  }));

  it('should get trading member code', fakeAsync(() => {
    service.getTradingMemberCode().subscribe((rs) => {
      expect(rs).toBeTruthy();
    });
    tick(1000);
  }));

  it('should get clearing members', fakeAsync(() => {
    service.getClearingMembers().subscribe((datas) => {
      expect(datas.length).toBeTruthy();
    });
    tick(1000);
  }));
});
