import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { OrderService } from 'src/app/services/api/order.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { mockOrderItemList } from 'src/assets/data/order/mock-order-item-list';
import { DividerModule } from '../divider/divider.module';
import { FormFieldModule } from '../form-field/form-field.module';
import { MessageService } from '../message/message.service';
import { ModalModule } from '../modal/modal.module';
import { ModalService } from '../modal/modal.service';
import { TS_MODAL_DATA, TS_MODAL_REF } from '../modal/models/ts-modal-options';
import { OtrAllocatorModule } from '../otr-allocator/otr-allocator.module';

import { OtrAllocationModalComponent } from './otr-allocation-modal.component';

describe('OtrAllocationModalComponent', () => {
  let component: OtrAllocationModalComponent;
  let fixture: ComponentFixture<OtrAllocationModalComponent>;
  let orderService: OrderService;
  let modalService: ModalService;
  let messageService: MessageService;
  let onClose;
  let spyOnOpenModal;
  let spyOnOpenMessage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OtrAllocationModalComponent],
      imports: [
        TestSharedModule,
        OtrAllocatorModule,
        ModalModule,
        FormFieldModule,
        DividerModule,
      ],
      providers: [
        {
          provide: TS_MODAL_DATA,
          useValue: {
            order: mockOrderItemList[0],
          },
        },
        {
          provide: TS_MODAL_REF,
          useValue: {
            close: () => {},
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtrAllocationModalComponent);
    orderService = TestBed.inject(OrderService);
    modalService = TestBed.inject(ModalService);
    spyOnOpenModal = spyOn(modalService, 'open').and.callFake(
      (_component, data) => {
        onClose = data.onClose;
        return null;
      }
    );
    messageService = TestBed.inject(MessageService);
    spyOnOpenMessage = spyOn(messageService, 'open');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check remains', () => {
    expect(component._hasRemains).toEqual(false);
  });

  it('should open modal allocation confirm when click confirm', () => {
    spyOn(orderService, 'allocatePCCodes').and.returnValue(of(null));
    const spyOnHasRemains = spyOnProperty(
      component,
      '_hasRemains'
    ).and.returnValue(false);
    component.onConfirm();
    expect(spyOnOpenModal).not.toHaveBeenCalled();
    expect(spyOnOpenMessage).toHaveBeenCalled();
    spyOnOpenMessage.calls.reset();

    spyOnHasRemains.and.returnValue(true);
    component.onConfirm();
    expect(spyOnOpenModal).toHaveBeenCalled();
    onClose(false);
    expect(spyOnOpenMessage).not.toHaveBeenCalled();
    onClose(true);
    expect(spyOnOpenMessage).toHaveBeenCalled();
  });
});
