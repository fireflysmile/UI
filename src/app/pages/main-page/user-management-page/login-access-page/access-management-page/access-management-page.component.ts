import { Component, OnInit } from '@angular/core';
import {UserManagementService} from '../../../../../services/api/user-management.service';
import {SubscriptionService} from '../../../../../services/subscription/subscription.service';
import {UserAccessInfoItem} from '../../../../../models/user-access-info-item';
import {AccessManagementFilterValue} from '../../../../../components/access-management-filter/access-management-filter.component';

@Component({
  selector: 'app-access-management-page',
  templateUrl: './access-management-page.component.html',
  styleUrls: ['./access-management-page.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class AccessManagementPageComponent implements OnInit {
  // data
  data: UserAccessInfoItem[] = [];
  // filter
  filter: AccessManagementFilterValue;

  constructor(
    private subscriptionService: SubscriptionService,
    private userManagementService: UserManagementService,
  ) { }

  ngOnInit() {
    this.getUserAccessInfo();
  }

  /**
   * return true when some data are selected
   */
  get hasSelected(): boolean {
    return this.data.some(item => item.selected);
  }

  /**
   * get user access info
   */
  getUserAccessInfo(filter: AccessManagementFilterValue = this.filter): void {
    const sub = this.userManagementService
      .getUserAccessInfo(filter)
      .subscribe({
        next: res => {
          this.data = res;
          this.filter = filter;
        },
      });

    this.subscriptionService.store('getUserAccessInfo', sub);
  }

  /**
   * set enabled state for selected users
   * @param enabled enabled
   */
  setEnabledStateForSelectedUsers(enabled: boolean): void {
    this.data.filter(item => item.selected).forEach(item => item.enabled = enabled);
  }
}
