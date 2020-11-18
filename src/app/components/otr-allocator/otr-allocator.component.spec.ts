import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { QuantityPipeModule } from 'src/app/pipes/quantity-pipe/quantity-pipe.module';
import { OrderService } from 'src/app/services/api/order.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { mockOrderItemList } from 'src/assets/data/order/mock-order-item-list';

import { OtrAllocatorComponent } from './otr-allocator.component';
import { OtrAllocatorModule } from './otr-allocator.module';

describe('OtrAllocatorComponent', () => {
  let component: OtrAllocatorComponent;
  let fixture: ComponentFixture<OtrAllocatorComponent>;
  let orderService: OrderService;
  let spyOnGetOrder;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [TestSharedModule, QuantityPipeModule, OtrAllocatorModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtrAllocatorComponent);
    orderService = TestBed.inject(OrderService);
    component = fixture.componentInstance;
    fixture.detectChanges();

    spyOnGetOrder = spyOn(
      orderService,
      'getOrderAllocationDetail'
    ).and.returnValue(
      of({
        totalQty: 1,
        totalValue: 1,
        allocations: [
          {
            pcCode: 'string',
            allocatedQty: 'string',
            allocatedValue: 'string',
            contactNoteNumber: 'string',
            confirmed: false,
          },
        ],
      })
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get confirmable', () => {
    expect(component.confirmable).toEqual(false);
    component.data = null;
    component.data = mockOrderItemList[0];
    fixture.detectChanges();
    expect(component.confirmable).toEqual(true);
  });

  it('should get only qty not fully allocated', () => {
    component.data = mockOrderItemList[0];
    fixture.detectChanges();
    expect(component.onlyQtyNotFullyAllocated).toEqual(false);
    component.detail.totalValue = 0;
    expect(component.onlyQtyNotFullyAllocated).toEqual(true);
  });

  it('should get only value not fully allocated', () => {
    component.data = mockOrderItemList[0];
    fixture.detectChanges();
    expect(component.onlyValueNotFullyAllocated).toEqual(false);
    component.detail = null;
    spyOnProperty(component, 'totalAllocatedValue').and.returnValue(-1);
    expect(component.onlyValueNotFullyAllocated).toEqual(true);
  });

  it('should get allocalted pc code map', () => {
    component.data = mockOrderItemList[0];
    fixture.detectChanges();
    expect(component.allocatedPCCodeMap).toBeTruthy();
  });

  it('should get un confirmed allocations', () => {
    component.data = mockOrderItemList[0];
    fixture.detectChanges();
    expect(component.unConfirmedAllocations.length).toEqual(1);
    component.detail = null;
    expect(component.unConfirmedAllocations).toBeFalsy();
  });

  it('should set initial allocation', () => {
    spyOnGetOrder.and.returnValue(
      of({
        totalQty: 1,
        totalValue: 1,
        allocations: [],
      })
    );
    component.data = mockOrderItemList[0];
    expect(component.detail.allocations.length).toEqual(1);
  });

  it('should remove allocation', () => {
    spyOnGetOrder.and.returnValue(
      of({
        totalQty: 1,
        totalValue: 1,
        allocations: [
          {
            pcCode: 'string',
            allocatedQty: 'string',
            allocatedValue: 'string',
            contactNoteNumber: 'string',
            confirmed: false,
          },
          {
            pcCode: 'string',
            allocatedQty: 'string',
            allocatedValue: 'string',
            contactNoteNumber: 'string',
            confirmed: false,
          },
        ],
      })
    );
    component.data = mockOrderItemList[0];
    component.removeAllocation(component.detail.allocations[0]);
    expect(component.detail.allocations.length).toEqual(1);
  });

  it('should clear allocations', () => {
    spyOnGetOrder.and.returnValue(
      of({
        totalQty: 1,
        totalValue: 1,
        allocations: [
          {
            pcCode: 'string',
            allocatedQty: 'string',
            allocatedValue: 'string',
            contactNoteNumber: 'string',
            confirmed: false,
          },
          {
            pcCode: 'string',
            allocatedQty: 'string',
            allocatedValue: 'string',
            contactNoteNumber: 'string',
            confirmed: false,
          },
        ],
      })
    );
    component.data = mockOrderItemList[0];
    fixture.detectChanges();
    component.clearAllocations();
    component.unConfirmedAllocations.forEach((item) =>
      expect(item.allocatedQty).toEqual('')
    );
  });

  it('should clear entries', () => {
    spyOnGetOrder.and.returnValue(
      of({
        totalQty: 1,
        totalValue: 1,
        allocations: [
          {
            pcCode: 'string',
            allocatedQty: 'string',
            allocatedValue: 'string',
            contactNoteNumber: 'string',
            confirmed: false,
          },
          {
            pcCode: 'string',
            allocatedQty: 'string',
            allocatedValue: 'string',
            contactNoteNumber: 'string',
            confirmed: false,
          },
        ],
      })
    );
    component.data = mockOrderItemList[0];
    fixture.detectChanges();
    component.clearEntries();
    expect(component.detail.allocations.length).toEqual(1);
  });
});
