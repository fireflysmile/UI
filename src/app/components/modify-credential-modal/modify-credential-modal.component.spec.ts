import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserManagementService } from 'src/app/services/api/user-management.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { mockUserList } from 'src/assets/data/user-management/mock-user-list';
import { EmailIdEditableFieldModule } from '../email-id-editable-field/email-id-editable-field.module';
import { ModalModule } from '../modal/modal.module';
import { ModalService } from '../modal/modal.service';
import { TS_MODAL_DATA, TS_MODAL_REF } from '../modal/models/ts-modal-options';
import { PhoneNumberEditableFieldModule } from '../phone-number-editable-field/phone-number-editable-field.module';
import { UserNameEditableFieldModule } from '../user-name-editable-field/user-name-editable-field.module';

import { ModifyCredentialModalComponent } from './modify-credential-modal.component';

describe('ModifyCredentialModalComponent', () => {
  let component: ModifyCredentialModalComponent;
  let fixture: ComponentFixture<ModifyCredentialModalComponent>;
  let userManagementService: UserManagementService;
  let modalService: ModalService;
  let onClose;
  let spyOnOpenModal;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyCredentialModalComponent],
      imports: [
        TestSharedModule,
        EmailIdEditableFieldModule,
        PhoneNumberEditableFieldModule,
        UserNameEditableFieldModule,
        ModalModule,
      ],
      providers: [
        {
          provide: TS_MODAL_DATA,
          useValue: {
            user: mockUserList[0],
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
    fixture = TestBed.createComponent(ModifyCredentialModalComponent);
    userManagementService = TestBed.inject(UserManagementService);
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

  it('should open name confirm modal', () => {
    component.openNameConfirmModal(mockUserList[0]);
    expect(spyOnOpenModal).toHaveBeenCalled();

    const spyOnUpdateUser = spyOn(
      userManagementService,
      'updateUserCredentials'
    ).and.returnValue(of(null));
    onClose(null);
    expect(spyOnUpdateUser).not.toHaveBeenCalled();
    onClose(true);
    expect(spyOnUpdateUser).toHaveBeenCalled();
  });

  it('should open email confirm modal', () => {
    component.openEmailConfirmModal(mockUserList[0]);
    expect(spyOnOpenModal).toHaveBeenCalled();

    const spyOnUpdateUser = spyOn(
      userManagementService,
      'updateUserCredentials'
    ).and.returnValue(of(null));
    onClose(null);
    expect(spyOnUpdateUser).not.toHaveBeenCalled();
    onClose(true);
    expect(spyOnUpdateUser).toHaveBeenCalled();
  });

  it('should open phone number confirm modal', () => {
    component.openPhoneNumberConfirmModal(mockUserList[0]);
    expect(spyOnOpenModal).toHaveBeenCalled();

    const spyOnUpdateUser = spyOn(
      userManagementService,
      'updateUserCredentials'
    ).and.returnValue(of(null));
    onClose(null);
    expect(spyOnUpdateUser).not.toHaveBeenCalled();
    onClose(true);
    expect(spyOnUpdateUser).toHaveBeenCalled();
  });
});
