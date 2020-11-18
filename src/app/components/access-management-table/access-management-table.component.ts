import {Component, HostBinding, Input, OnInit, ViewChild} from '@angular/core';
import {UserAccessInfoItem} from '../../models/user-access-info-item';
import {UserManagementService} from '../../services/api/user-management.service';
import {SubscriptionService} from '../../services/subscription/subscription.service';
import {ModalService} from '../modal/modal.service';
import {ConfirmModalComponent, ConfirmModalData} from '../confirm-modal/confirm-modal.component';
import {finalize} from 'rxjs/operators';
import {
  ModifyCredentialModalComponent,
  ModifyCredentialModalData
} from '../modify-credential-modal/modify-credential-modal.component';
import {AppService} from '../../services/components/app.service';
import { StaticTableComponent } from '../static-table/static-table.component';

@Component({
  selector: 'app-access-management-table',
  templateUrl: './access-management-table.component.html',
  styleUrls: ['./access-management-table.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class AccessManagementTableComponent implements OnInit {
  // user data
  @Input() data: UserAccessInfoItem[] = [];
  // set member admin class
  @HostBinding('class.cm-member-admin') isMemberAdmin = false;
  @ViewChild('appStaticTable') refToStaticTable: StaticTableComponent<UserAccessInfoItem>;

  constructor(
    public appService: AppService,
    private modalService: ModalService,
    private subscriptionService: SubscriptionService,
    private userManagementService: UserManagementService,
  ) { }

  ngOnInit(): void {
    this._subscribeIsMemberAdmin();
  }

  /**
   * set select all state
   * @param select select state
   */
  set selectAll(select: boolean) {
    this.data.forEach(item => item.selected = select);
  }

  /**
   * return select all state
   */
  get selectAll(): boolean {
    return this.data.length > 0 && this.data.every(item => item.selected);
  }

  /**
   * open reset password modal
   * @param user user info
   */
  openResetPasswordModal(user: UserAccessInfoItem): void {
    this.modalService.open(ConfirmModalComponent, {
      data: {
        content: `You have selected to reset the password of:
          • ${user.userId} - ${user.firstName} ${user.lastName}

          A link to set new password will be sent to
          registered email ID of the user

          Are you sure you want to continue?
        `
      } as ConfirmModalData,
      onClose: res => {
        if (res) {
          this._resetUserPassword(user);
        }
      }
    });
  }

  /**
   * reset user password
   * @param user user access item
   */
  private _resetUserPassword(user: UserAccessInfoItem): void {
    user.resetLoading = true;

    const sub = this.userManagementService
      .resetUserPassword()
      .pipe(finalize(() => user.resetLoading = false))
      .subscribe({
        next: () => null,
      });

    this.subscriptionService.append('_resetUserPassword', sub);
  }

  /**
   * open modify credentials modal
   * @param user user info
   */
  openModifyCredentialsModal(user: UserAccessInfoItem): void {
    this.modalService.open(ModifyCredentialModalComponent, {
      data: {
        user,
      } as ModifyCredentialModalData,
    });
  }

  /**
   * subscribe isMemberAdmin state
   */
  private _subscribeIsMemberAdmin(): void {
    const sub = this.appService
      .isMemberAdmin$
      .subscribe(state => this.isMemberAdmin = state);

    this.subscriptionService.store('_subscribeIsMemberAdmin', sub);
  }
}
