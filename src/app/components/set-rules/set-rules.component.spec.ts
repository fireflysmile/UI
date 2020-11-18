import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RuleService } from 'src/app/services/api/rule.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { FormFieldModule } from '../form-field/form-field.module';
import { MessageService } from '../message/message.service';
import { ModalService } from '../modal/modal.service';
import { RectCardModule } from '../rect-card/rect-card.module';
import { SelectModule } from '../select/select.module';

import { SetRulesComponent } from './set-rules.component';

describe('SetRulesComponent', () => {
  let component: SetRulesComponent;
  let fixture: ComponentFixture<SetRulesComponent>;
  let ruleService: RuleService;
  let modalService: ModalService;
  let messageService: MessageService;
  let onClose;
  let spyOnOpenModal;
  let spyOnOpenMessage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SetRulesComponent],
      imports: [
        TestSharedModule,
        SelectModule,
        RectCardModule,
        FormFieldModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetRulesComponent);
    ruleService = TestBed.inject(RuleService);
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
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should upload file', () => {
    const spyOnUploadFile = spyOn(ruleService, 'uploadRule').and.returnValue(
      of({
        total: 0,
        errors: 0,
        reasons: [],
      })
    );
    component.openFileUploadModal();
    expect(spyOnOpenModal).toHaveBeenCalled();
    spyOnOpenModal.calls.reset();

    onClose(false);
    expect(spyOnUploadFile).not.toHaveBeenCalled();

    onClose(true);
    expect(spyOnUploadFile).toHaveBeenCalled();

    spyOnUploadFile.and.returnValue(
      of({
        total: 1,
        errors: 1,
        reasons: ['upload fail'],
      })
    );
    onClose(true);
    expect(spyOnOpenModal).toHaveBeenCalled();
    spyOnOpenModal.calls.reset();
  });

  it('should open pending modal', () => {
    (component as any)._openPendingModal();
    expect(spyOnOpenModal).toHaveBeenCalled();
    onClose();
    const spyOnClose = spyOn((component as any)._pendingModal, 'close');
    (component as any)._pendingModal = null;
    (component as any)._closePendingModal();
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
    (component as any)._openCompleteModal({
      total: 1,
      errors: 1,
      reasons: ['upload fail'],
    });
    expect(spyOnOpenModal).toHaveBeenCalled();
    spyOnOpenModal.calls.reset();

    onClose(false);
    expect(spyOnDownloadErrorFile).not.toHaveBeenCalled();
    onClose(true);
    expect(spyOnDownloadErrorFile).toHaveBeenCalled();
  });
});
