import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { OrderService } from 'src/app/services/api/order.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { FormFieldModule } from '../form-field/form-field.module';
import { ModalModule } from '../modal/modal.module';
import { ModalService } from '../modal/modal.service';
import { TS_MODAL_DATA, TS_MODAL_REF } from '../modal/models/ts-modal-options';
import { SelectModule } from '../select/select.module';

import { ModifyPcModalComponent } from './modify-pc-modal.component';

describe('ModifyPcModalComponent', () => {
  let component: ModifyPcModalComponent;
  let fixture: ComponentFixture<ModifyPcModalComponent>;
  let orderService: OrderService;
  let modalService: ModalService;
  let onClose;
  let spyOnOpenModal;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyPcModalComponent],
      imports: [TestSharedModule, SelectModule, FormFieldModule, ModalModule],
      providers: [
        {
          provide: TS_MODAL_DATA,
          useValue: {
            selected: [],
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
    fixture = TestBed.createComponent(ModifyPcModalComponent);
    orderService = TestBed.inject(OrderService);
    modalService = TestBed.inject(ModalService);
    spyOnOpenModal = spyOn(modalService, 'open').and.callFake(
      (_component, data) => {
        onClose = data.onClose;
        return null;
      }
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should confirm modify pc codes', () => {
    component.openConfirmModal();
    expect(spyOnOpenModal).toHaveBeenCalled();
    const spyOnModify = spyOn(orderService, 'modifyPcCodes').and.returnValue(
      of(null)
    );
    onClose(false);
    expect(spyOnModify).not.toHaveBeenCalled();
    onClose(true);
    expect(spyOnModify).toHaveBeenCalled();
  });
});
