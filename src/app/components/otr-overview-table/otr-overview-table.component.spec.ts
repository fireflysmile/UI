import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { OrderService } from 'src/app/services/api/order.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { MessageService } from '../message/message.service';
import { ModalService } from '../modal/modal.service';
import { RectCardModule } from '../rect-card/rect-card.module';
import { TableModule } from '../table/table.module';
import { ToggleFilterModule } from '../toggle-filter/toggle-filter.module';

import { OtrOverviewTableComponent } from './otr-overview-table.component';

describe('OtrOverviewTableComponent', () => {
  let component: OtrOverviewTableComponent;
  let fixture: ComponentFixture<OtrOverviewTableComponent>;
  let messageService: MessageService;
  let orderService: OrderService;
  let modalService: ModalService;
  let spyOnModalOpen;
  let onClose;
  let spyOnMessageOpen;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OtrOverviewTableComponent],
      imports: [
        TestSharedModule,
        ToggleFilterModule,
        TableModule,
        RectCardModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtrOverviewTableComponent);
    messageService = TestBed.inject(MessageService);
    orderService = TestBed.inject(OrderService);
    onClose = null;
    modalService = TestBed.inject(ModalService);
    spyOnModalOpen = spyOn(modalService, 'open').and.callFake(
      (_component, data) => {
        if (!onClose) {
          onClose = data.onClose;
        }
        return { close: () => {} } as any;
      }
    );
    spyOnMessageOpen = spyOn(messageService, 'open');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open allocation modal', () => {
    component.openAllocationModal();
    expect(spyOnModalOpen).toHaveBeenCalled();
    spyOnModalOpen.calls.reset();
  });

  it('should open file upload modal', () => {
    const spyOnUploadOTRFile = spyOn(
      orderService,
      'uploadOTRFile'
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
    const spyOnUploadOTRFile = spyOn(
      orderService,
      'uploadOTRFile'
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
    expect(spyOnUploadOTRFile).toHaveBeenCalled();
  });

  it('should show upload error modal', () => {
    (component as any)._openUploadErrorModal({});
    onClose(false);
    spyOnModalOpen.calls.reset();
    expect(spyOnModalOpen).not.toHaveBeenCalled();
    onClose(true);
    expect(spyOnModalOpen).toHaveBeenCalled();
  });

  it('should download csv', () => {
    (component as any)._openDownloadErrorFileModal({});
    onClose(false);
    spyOnModalOpen.calls.reset();
    expect(spyOnModalOpen).not.toHaveBeenCalled();
    expect(spyOnMessageOpen).toHaveBeenCalled();
    spyOnMessageOpen.calls.reset();
    onClose(true);
  });

  it('should download otr', () => {
    const spyOnCreateURL = spyOn(window.URL, 'createObjectURL');
    component.downloadOTR();
    expect(spyOnCreateURL).toHaveBeenCalled();
  });
});
