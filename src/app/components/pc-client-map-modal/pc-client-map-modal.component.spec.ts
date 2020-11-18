import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { OrderService } from 'src/app/services/api/order.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { MessageService } from '../message/message.service';
import { ModalModule } from '../modal/modal.module';
import { TS_MODAL_DATA, TS_MODAL_REF } from '../modal/models/ts-modal-options';

import { PcClientMapModalComponent } from './pc-client-map-modal.component';

describe('PcClientMapModalComponent', () => {
  let component: PcClientMapModalComponent;
  let fixture: ComponentFixture<PcClientMapModalComponent>;
  let orderService: OrderService;
  let messageService: MessageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PcClientMapModalComponent],
      imports: [TestSharedModule, ModalModule],
      providers: [
        {
          provide: TS_MODAL_DATA,
          useValue: {},
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
    fixture = TestBed.createComponent(PcClientMapModalComponent);
    orderService = TestBed.inject(OrderService);
    messageService = TestBed.inject(MessageService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get submitable', () => {
    component.clientMaps = [
      {
        pcCode: 'string',
        clientCode: 'string',
      },
    ];
    component.pcClientMapItemRefs = {
      toArray: () => [
        {
          valid: true,
        },
      ],
    } as any;
    expect(component.submittable).toBeTruthy();
  });

  it('should get used client codes', () => {
    component.clientMaps = [
      {
        pcCode: 'string',
        clientCode: '',
      },
      {
        pcCode: 'string',
        clientCode: 'string',
      },
    ];
    expect(
      component.getUsedClientCodes({
        pcCode: 'string',
        clientCode: 'string',
      })
    ).toBeTruthy();
  });

  it('should get used pc codes', () => {
    component.clientMaps = [
      {
        pcCode: 'string',
        clientCode: '',
      },
      {
        pcCode: 'string',
        clientCode: 'string',
      },
    ];
    expect(
      component.getUsedPcCodes({
        pcCode: 'string',
        clientCode: 'string',
      })
    ).toBeTruthy();
  });

  it('should add client map', () => {
    component.addClientMap();
    expect(component.clientMaps.length).toBeTruthy();
  });

  it('should check validation for items', () => {
    let checkDuplicatedClientCode = false;
    component.pcClientMapItemRefs = [
      {
        data: {
          pcCode: 'string',
          clientCode: 'string',
        },
        checkDuplicatedClientCode: () => {
          checkDuplicatedClientCode = true;
        },
      },
    ] as any;
    component.checkValidationForItems();

    expect(checkDuplicatedClientCode).toEqual(true);
  });

  it('should clear mapping', () => {
    component.clearMapping();
    expect(component.clientMaps.length).toEqual(1);
  });

  it('should update client map', () => {
    const spyOnOpenMessage = spyOn(messageService, 'open');
    spyOn(
      orderService,
      'updateClientMap'
    ).and.returnValue(of(null));
    component.updateClientMap();
    expect(spyOnOpenMessage).toHaveBeenCalled();
  });
});
