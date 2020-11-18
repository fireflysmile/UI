import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { OrderService } from 'src/app/services/api/order.service';
import { SubscriptionService } from 'src/app/services/subscription/subscription.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { MessageService } from '../message/message.service';
import { ModalService } from '../modal/modal.service';
import { RectCardModule } from '../rect-card/rect-card.module';
import { SwitchModule } from '../switch/switch.module';

import { PcModificationFooterComponent } from './pc-modification-footer.component';

describe('PcModificationFooterComponent', () => {
  let component: PcModificationFooterComponent;
  let fixture: ComponentFixture<PcModificationFooterComponent>;
  let subscriptionService: SubscriptionService;
  let spyOnUnsubscribe;
  let modalService: ModalService;
  let messageService: MessageService;
  let orderService: OrderService;
  let onClose;
  let spyOnOpenModal;
  let spyOnOpenMessage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PcModificationFooterComponent],
      imports: [TestSharedModule, RectCardModule, SwitchModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcModificationFooterComponent);
    modalService = TestBed.inject(ModalService);
    onClose = null;
    spyOnOpenModal = spyOn(modalService, 'open').and.callFake(
      (_component, data) => {
        if (!onClose) {
          onClose = data.onClose;
        }
        return {
          close: () => {},
        } as any;
      }
    );
    messageService = TestBed.inject(MessageService);
    spyOnOpenMessage = spyOn(messageService, 'open');
    orderService = TestBed.inject(OrderService);
    component = fixture.componentInstance;
    subscriptionService = TestBed.inject(SubscriptionService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open pc client map modal', () => {
    component.openPcClientMapModal();
    expect(spyOnOpenModal).toHaveBeenCalled();
  });

  it('should open pc client map modal', () => {
    component.openPcClientMapUploader();
    expect(spyOnOpenModal).toHaveBeenCalled();

    const spyOnUpload = spyOn(
      orderService,
      'uploadPcClientMap'
    ).and.returnValue(
      of({
        errors: 0,
        total: 0,
        reasons: [],
      })
    );
    onClose(false);
    expect(spyOnUpload).not.toHaveBeenCalled();
    onClose(true);
    expect(spyOnUpload).toHaveBeenCalled();
    spyOnOpenModal.calls.reset();

    spyOnUpload.and.returnValue(
      of({
        errors: 12,
        total: 0,
        reasons: [],
      })
    );
    onClose(true);
    expect(spyOnOpenModal).toHaveBeenCalled();
  });

  it('should open upload pending modal', () => {
    (component as any)._openUploadPendingModal();
    expect(spyOnOpenModal).toHaveBeenCalled();
    spyOnUnsubscribe = spyOn(subscriptionService, 'unSubscribe');
    onClose();
    const spyOnClose = spyOn((component as any)._pendingModal, 'close');
    (component as any)._pendingModal = null;
    (component as any)._closeUploadPendingModal();
    expect(spyOnClose).not.toHaveBeenCalled();
  });

  it('should open error modal', () => {
    (component as any)._openErrorModal();
    expect(spyOnOpenModal).toHaveBeenCalled();
    spyOnOpenModal.calls.reset();

    onClose(false);
    expect(spyOnOpenModal).not.toHaveBeenCalled();
    onClose(true);
    expect(spyOnOpenModal).toHaveBeenCalled();
  });

  it('should open complete modal', () => {
    const spyOnDownloadErrorFile = spyOn(
      component as any,
      '_downloadErrorFile'
    ).and.callThrough();
    (component as any)._openCompleteModal();
    expect(spyOnOpenModal).toHaveBeenCalled();
    spyOnOpenModal.calls.reset();

    onClose(false);
    expect(spyOnDownloadErrorFile).not.toHaveBeenCalled();
    onClose(true);
    expect(spyOnDownloadErrorFile).toHaveBeenCalled();
  });

  it('should open ucc auto modification change popup', () => {
    component.onUccAutoModificationChange(false);
    expect(spyOnOpenMessage).toHaveBeenCalled();
    spyOnOpenMessage.calls.reset();

    component.onUccAutoModificationChange(true);
    expect(spyOnOpenModal).toHaveBeenCalled();
    spyOnOpenModal.calls.reset();

    onClose(false);
    expect(spyOnOpenMessage).not.toHaveBeenCalled();

    onClose(true);
    expect(spyOnOpenMessage).toHaveBeenCalled();
  });

  it('should open auto modification change popup', () => {
    component.onAllAutoModificationChange(false);
    expect(spyOnOpenMessage).toHaveBeenCalled();
    spyOnOpenMessage.calls.reset();

    component.onAllAutoModificationChange(true);
    expect(spyOnOpenModal).toHaveBeenCalled();
    spyOnOpenModal.calls.reset();

    onClose(false);
    expect(spyOnOpenMessage).not.toHaveBeenCalled();

    onClose(true);
    expect(spyOnOpenMessage).toHaveBeenCalled();
  });
});
