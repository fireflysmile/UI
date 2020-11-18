import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { OrderService } from 'src/app/services/api/order.service';
import { SubscriptionService } from 'src/app/services/subscription/subscription.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { MessageService } from '../message/message.service';
import { ModalService } from '../modal/modal.service';
import { RectCardModule } from '../rect-card/rect-card.module';
import { TableModule } from '../table/table.module';
import { ToggleFilterModule } from '../toggle-filter/toggle-filter.module';

import { PcModificationTableComponent } from './pc-modification-table.component';

describe('PcModificationTableComponent', () => {
  let component: PcModificationTableComponent;
  let fixture: ComponentFixture<PcModificationTableComponent>;
  let subscriptionService: SubscriptionService;
  let modalService: ModalService;
  let messageService: MessageService;
  let onClose;
  let spyOnModalOpen;
  let spyOnMessageOpen;
  let orderService: OrderService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PcModificationTableComponent],
      imports: [
        TestSharedModule,
        TableModule,
        ToggleFilterModule,
        RectCardModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcModificationTableComponent);
    subscriptionService = TestBed.inject(SubscriptionService);
    spyOn(subscriptionService, 'store');
    modalService = TestBed.inject(ModalService);
    orderService = TestBed.inject(OrderService);
    onClose = null;
    spyOnModalOpen = spyOn(modalService, 'open').and.callFake(
      (_component, data) => {
        if (!onClose) {
          onClose = data.onClose;
        }
        return { close: () => {} } as any;
      }
    );
    messageService = TestBed.inject(MessageService);
    spyOnMessageOpen = spyOn(messageService, 'open');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open modify pc code modal', () => {
    component.openModifyPcCodeModal();
    expect(spyOnModalOpen).toHaveBeenCalled();
  });

  it('should open file upload modal', () => {
    const spyOnUploadOTRFile = spyOn(
      orderService,
      'uploadPCCodeFile'
    ).and.returnValue(
      of({
        total: 0,
        errors: 0,
        reasons: [],
      })
    );
    component.openFileUploadModal();
    expect(spyOnModalOpen).toHaveBeenCalled();
    spyOnModalOpen.calls.reset();

    onClose(false);
    expect(spyOnUploadOTRFile).not.toHaveBeenCalled();

    onClose(true);
    expect(spyOnUploadOTRFile).toHaveBeenCalled();
    expect(spyOnMessageOpen).toHaveBeenCalled();
    spyOnUploadOTRFile.calls.reset();
    spyOnMessageOpen.calls.reset();
  });

  it('should upload file', () => {
    const spyOnUploadPCCodeFile = spyOn(
      orderService,
      'uploadPCCodeFile'
    ).and.returnValue(
      of({
        total: 1,
        errors: 1,
        reasons: ['upload fail'],
      })
    );

    (component as any)._uploadFile(
      new File([new Blob()], 'dummy.pdf', { type: 'pdf' })
    );
    onClose();
    expect(spyOnModalOpen).toHaveBeenCalled();
    expect(spyOnUploadPCCodeFile).toHaveBeenCalled();
  });

  it('should show upload error modal', () => {
    (component as any)._openUploadErrorModal({});
    onClose(false);
    spyOnModalOpen.calls.reset();
    expect(spyOnModalOpen).not.toHaveBeenCalled();
    onClose('error');
    expect(spyOnModalOpen).toHaveBeenCalled();
    spyOnModalOpen.calls.reset();
    onClose('process');
    expect(spyOnModalOpen).toHaveBeenCalled();
    spyOnModalOpen.calls.reset();
  });

  it('should download csv', () => {
    (component as any)._openDownloadErrorModal({});
    onClose(false);
    spyOnModalOpen.calls.reset();
    expect(spyOnModalOpen).not.toHaveBeenCalled();
    expect(spyOnMessageOpen).not.toHaveBeenCalled();
    spyOnMessageOpen.calls.reset();
    onClose(true);

    onClose = null;
    (component as any)._openDownloadErrorModal({}, true);
    onClose(true);
    expect(spyOnMessageOpen).toHaveBeenCalled();
    spyOnMessageOpen.calls.reset();
  });

  it('should download orders', () => {
    const spyOnCreateURL = spyOn(window.URL, 'createObjectURL');
    component.downloadOrders();
    expect(spyOnCreateURL).toHaveBeenCalled();
  });
});
