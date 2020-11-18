import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import * as _ from 'lodash';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { mockOrderItemList } from 'src/assets/data/order/mock-order-item-list';

import { OrderService } from './order.service';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [TestSharedModule] });
    service = TestBed.inject(OrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get order allocation summary', fakeAsync(() => {
    service.getOrderAllocationSummary().subscribe((rs) => {
      expect(rs.allocationUnderProcess).toBeTruthy();
      expect(rs.unsuccessful).toBeTruthy();
    });
    tick(1000);
  }));

  it('should get order allocation status', fakeAsync(() => {
    service.getOrderAllocationStatus().subscribe((rs) => {
      expect(rs.unallocated).toBeTruthy();
      expect(rs.allocated).toBeTruthy();
    });
    tick(1000);
  }));

  it('should get order allocation detail', fakeAsync(() => {
    service
      .getOrderAllocationDetail(_.cloneDeep(mockOrderItemList[0]))
      .subscribe((rs) => {
        expect(rs).toBeTruthy();
      });
    tick(1000);
  }));

  it('should get order modification status', fakeAsync(() => {
    service.getOrderModificationStatuses().subscribe((rs) => {
      expect(rs).toBeTruthy();
    });
    tick(1000);
  }));

  it('should upload pc client map', fakeAsync(() => {
    service.uploadPcClientMap(null).subscribe((rs) => {
      expect(rs).toBeTruthy();
    });
    tick(5000);
  }));

  it('should get client map', fakeAsync(() => {
    service.getClientMap().subscribe((rs) => {
      expect(rs).toBeTruthy();
    });
    tick(5000);
  }));

  it('should update client map', fakeAsync(() => {
    service.updateClientMap([]).subscribe((rs) => {
      expect(rs).toEqual(null);
    });
    tick(5000);
  }));

  it('should get order modification summary', fakeAsync(() => {
    service.getOrderModificationSummary(true).subscribe((rs) => {
      expect(rs).toBeTruthy();
    });
    tick(1000);
    service.getOrderModificationSummary(false).subscribe((rs) => {
      expect(rs).toBeTruthy();
    });
    tick(1000);
  }));

  it('should allocate PC codes', fakeAsync(() => {
    service.allocatePCCodes(null).subscribe((rs) => {
      expect(rs).toEqual(null);
    });
    tick(1000);
  }));

  it('should get order for allocation', fakeAsync(() => {
    service.getOrderForAllocation().subscribe((rs) => {
      expect(rs.length).toBeTruthy();
    });
    tick(1000);
  }));

  it('should get order for modification', fakeAsync(() => {
    service.getOrderForModification().subscribe((rs) => {
      expect(rs.length).toBeTruthy();
    });
    tick(1000);
  }));

  it('should modify PC codes', fakeAsync(() => {
    service
      .modifyPcCodes(_.cloneDeep(mockOrderItemList), 'test')
      .subscribe((rs) => {
        expect(rs).toEqual(null);
      });
    tick(1000);
  }));

  it('should upload OTR File', fakeAsync(() => {
    service.uploadOTRFile(null).subscribe((rs) => {
      expect(rs.total).toBeTruthy();
    });
    tick(5000);
  }));

  it('should upload PC Code File', fakeAsync(() => {
    service.uploadPCCodeFile(null).subscribe((rs) => {
      expect(rs.total).toBeTruthy();
    });
    tick(5000);
  }));
});
