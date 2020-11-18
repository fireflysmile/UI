import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {UserAccessInfoItem} from '../../models/user-access-info-item';
import {TS_MODAL_DATA, TS_MODAL_REF} from '../modal/models/ts-modal-options';
import {TsModalRef} from '../modal/models/ts-modal-ref';
import {
  EmailIdEditableFieldComponent,
  UserEmailIdData
} from '../email-id-editable-field/email-id-editable-field.component';
import {ModalService} from '../modal/modal.service';
import {ConfirmModalComponent, ConfirmModalData} from '../confirm-modal/confirm-modal.component';
import {
  UserNameData,
  UserNameEditableFieldComponent
} from '../user-name-editable-field/user-name-editable-field.component';
import {
  PhoneNumberEditableFieldComponent,
  UserPhoneNumberData
} from '../phone-number-editable-field/phone-number-editable-field.component';
import {UserManagementService} from '../../services/api/user-management.service';
import {SubscriptionService} from '../../services/subscription/subscription.service';
import {finalize} from 'rxjs/operators';

export interface ModifyCredentialModalData {
  user: UserAccessInfoItem;
}

@Component({
  selector: 'app-modify-credential-modal',
  templateUrl: './modify-credential-modal.component.html',
  styleUrls: ['./modify-credential-modal.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class ModifyCredentialModalComponent implements OnInit {
  // loading for name
  nameLoading = false;
  // loading for email
  emailLoading = false;
  // loading for phone
  phoneLoading = false;
  // name field
  @ViewChild(UserNameEditableFieldComponent, {static: false}) nameEditableFieldRef: UserNameEditableFieldComponent;
  // email field
  @ViewChild(EmailIdEditableFieldComponent, {static: false}) emailEditableFieldRef: EmailIdEditableFieldComponent;
  // phone field
  @ViewChild(PhoneNumberEditableFieldComponent, {static: false}) phoneEditableFieldRef: PhoneNumberEditableFieldComponent;

  constructor(
    @Inject(TS_MODAL_REF) public tsModalRef: TsModalRef<ModifyCredentialModalComponent>,
    @Inject(TS_MODAL_DATA) public data: ModifyCredentialModalData,
    private modalService: ModalService,
    private subscriptionService: SubscriptionService,
    private userManagementService: UserManagementService,
  ) { }

  ngOnInit(): void {
  }

  /**
   * open name confirm modal
   * @param data user email data
   */
  openNameConfirmModal(data: UserNameData): void {
    this.modalService.open(ConfirmModalComponent, {
      data: {
        content: `You have selected to change the name of :
          • ${this.data.user.userId} - ${this.data.user.firstName} ${this.data.user.lastName} To ${data.firstName} ${data.lastName}

          Are you sure you want to continue?
        `,
      } as ConfirmModalData,
      onClose: res => {
        if (res) {
          this._updateUserName(data);
        }
      }
    });
  }

  /**
   * open email confirm modal
   * @param data email data
   */
  openEmailConfirmModal(data: UserEmailIdData): void {
    this.modalService.open(ConfirmModalComponent, {
      data: {
        content: `You have chosen to modify the email ID of:
          • ${this.data.user.userId} - ${this.data.user.firstName} ${this.data.user.lastName}

          This will change the email ID for all communication & 2 Factor authentication for the user.

          Are you sure you want to continue?
        `
      } as ConfirmModalData,
      onClose: res => {
        if (res) {
          this._updateUserEmail(data);
        }
      }
    });
  }

  /**
   * open phone number confirm modal
   * @param data changed phone number
   */
  openPhoneNumberConfirmModal(data: UserPhoneNumberData): void {
    this.modalService.open(ConfirmModalComponent, {
      data: {
        content: `You have chosen to modify the phone number of:
          • ${this.data.user.userId} - ${this.data.user.firstName} ${this.data.user.lastName}

          This will change the email ID for all communication & 2 Factor authentication for the user.

          Are you sure you want to continue?
        `
      } as ConfirmModalData,
      onClose: res => {
        if (res) {
          this._updateUserPhone(data);
        }
      }
    });
  }

  /**
   * update user name
   * @param data updated data
   */
  private _updateUserName(data: UserNameData): void {
    this.nameLoading = true;

    const sub = this.userManagementService
      .updateUserCredentials(this.data.user, data)
      .pipe(finalize(() => this.nameLoading = false))
      .subscribe({
        next: () => {
          this.data.user.firstName = data.firstName;
          this.data.user.lastName = data.lastName;
          this.nameEditableFieldRef.editing = false;
        }
      });

    this.subscriptionService.store('_updateUserName', sub);
  }

  /**
   * update user email
   * @param data updated data
   */
  private _updateUserEmail(data: UserEmailIdData): void {
    this.emailLoading = true;

    const sub = this.userManagementService
      .updateUserCredentials(this.data.user, data)
      .pipe(finalize(() => this.emailLoading = false))
      .subscribe({
        next: () => {
          this.data.user.emailId = data.emailId;
          this.emailEditableFieldRef.editing = false;
        },
      });

    this.subscriptionService.store('_updateUserEmail', sub);
  }

  /**
   * update user phone
   * @param data updated data
   */
  private _updateUserPhone(data: UserPhoneNumberData): void {
    this.phoneLoading = true;

    const sub = this.userManagementService
      .updateUserCredentials(this.data.user, data)
      .pipe(finalize(() => this.phoneLoading = false))
      .subscribe({
        next: () => {
          this.data.user.phoneNumber = data.phoneNumber;
          this.phoneEditableFieldRef.editing = false;
        },
      });

    this.subscriptionService.store('_updateUserPhone', sub);
  }
}
