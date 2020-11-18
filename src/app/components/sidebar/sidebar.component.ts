import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NavigationItem } from '../../models/navigation-item';
import { AppService } from '../../services/components/app.service';
import { SubscriptionService } from '../../services/subscription/subscription.service';
import { UserInfoItem } from '../../models/user-info-item';
import { TaskService } from '../../services/api/task.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [SubscriptionService],
})
export class SidebarComponent implements OnInit {
  // navigations
  navigations: NavigationItem[] = [];
  // user
  private _user: UserInfoItem;
  // my task count for notification
  private _myTasks = 0;

  constructor(
    private router: Router,
    private appService: AppService,
    private taskService: TaskService,
    private subscriptionService: SubscriptionService
  ) {}

  ngOnInit() {
    this._getUserInfo();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this._setNavigationsByRoles();
      }
    });
  }

  /**
   * get user info from app service to render proper navs
   */
  private _getUserInfo(): void {
    const sub = this.appService.userInfo$.subscribe((user) => {
      this._user = user;
      this._setNavigationsByRoles();
    });

    this.subscriptionService.store('_getUserInfo', sub);
  }

  /**
   * set navigation by roles
   */
  private _setNavigationsByRoles(): void {
    if (this._user) {
      switch (this._user.role) {
        case 'Tester': {
          this._setTesterNavigations();
          break;
        }

        case 'HO': {
          this._setOfficialNavigations();
          break;
        }

        case 'Member': {
          this._setMemberNavigations();
          break;
        }

        case 'Member Admin': {
          this._setMemberAdminNavigations();
          break;
        }

        case 'LCN Admin': {
          this._setLCNAdminNavigations();
          break;
        }

        case 'LCN Super Admin': {
          this._setLCNAdminNavigations();
          break;
        }

        case 'RO': {
          this._setOfficialNavigations();
          break;
        }

        case 'Oloc': {
          this._seOlocNavigations();
          break;
        }

        case 'TM':
        case 'CM':
        case 'CM & TM': {
          this._setTradeNavigations();
          break;
        }
      }
    }
  }

  /**
   * set navigation items for official role
   */
  private _setOfficialNavigations(): void {
    // get my task count when user is official
    this._getMyTaskCount();

    if (this.router.url.indexOf('application-review') === -1) {
      this.navigations = [
        {
          icon: 'dashboard',
          label: 'Main Dashboard',
          route: ['/main/dashboard'],
        },
        {
          icon: 'task',
          label: 'My Tasks',
          route: ['/main/my-task'],
          notifications: () => this._myTasks,
        },
        {
          icon: 'protection',
          label: 'Admin Request',
          route: ['/main/admin-request'],
        },
      ];
    } else {
      this.navigations = [
        {
          icon: 'details',
          label: 'Basic Details',
          route: ['/main/application-review/basic-details'],
        },
        {
          icon: 'suitcase',
          label: 'Experience Details',
          route: ['/main/application-review/experience-details'],
        },
        {
          icon: 'documents',
          label: 'Documents',
          route: ['/main/application-review/documents'],
        },
        {
          icon: 'people',
          label: 'Director Summary',
          route: ['/main/application-review/director-summary'],
        },
        {
          icon: 'declarations',
          label: 'Declarations & Fees',
          route: ['/main/application-review/declarations-and-fees'],
        },
        {
          icon: 'background-check',
          label: 'Background Check',
          route: ['/main/application-review/background-check'],
        },
        {
          icon: 'list',
          label: 'Review Queue',
          route: ['/main/application-review/review-queue'],
        },
        {
          icon: 'signature',
          label: 'Prior Approval',
          route: ['/main/application-review/prior-approval'],
        },
        {
          icon: 'stacked-windows',
          label: 'Post Impl.',
          route: ['/main/application-review/post-implementation'],
        },
        {
          icon: 'save',
          label: 'Save',
          route: ['/main/application-review/save'],
        },
      ];
    }
  }

  /**
   * set member navigations
   */
  private _setMemberNavigations(): void {
    this.navigations = [
      {
        icon: 'guard',
        label: 'Compliance',
        route: ['/main/dashboard'],
      },
      {
        icon: 'trade',
        label: 'Trade',
        route: ['/main/trade'],
      },
      {
        icon: 'member',
        label: 'Membership',
        route: ['/main/membership'],
      },
      {
        icon: 'member',
        label: 'Download Sample Files',
        route: ['/main/download-sample-files'],
      },
    ];
  }

  /**
   * set navigation items for tester role
   */
  private _setTesterNavigations(): void {
    this.navigations = [
      {
        icon: 'dashboard',
        label: 'Dashboard',
        route: ['/main/dashboard'],
      },
      {
        icon: 'refresh',
        label: 'Margin',
        route: ['/main/margin'],
      },
      {
        icon: 'exit',
        label: 'Collateral',
        route: ['/main/collateral'],
      },
      {
        icon: 'list',
        label: 'Requests',
        route: ['/main/requests'],
      },
      {
        icon: 'add-circle',
        label: 'Addition',
        route: ['/main/addition'],
      },
      {
        icon: 'refresh',
        label: 'Transfer',
        route: ['/main/transfer'],
      },
      {
        icon: 'exit',
        label: 'Release',
        route: ['/main/release'],
      },
      {
        icon: 'settings',
        label: 'Custom Setting',
        route: ['/main/custom-setting'],
      },
    ];
  }

  /**
   * set navigation items for member admin role
   */
  private _setMemberAdminNavigations(): void {
    if (this.router.url.indexOf('main/trade') !== -1) {
      return this._setTradeNavigations();
    }

    this.navigations = [
      {
        icon: 'home',
        label: 'Home',
        route: ['/main/home'],
      },
      {
        icon: 'users',
        label: 'User Management',
        route: ['/main/user-management'],
      },
      {
        icon: 'monitor',
        label: 'Session Management',
        route: ['/main/session-management'],
      },
      {
        icon: 'power',
        label: 'Logout',
        onClick: () => this.router.navigate(['/landing']),
      },
    ];
  }

  /**
   * set navigation items for lcn admin role
   */
  private _setLCNAdminNavigations(): void {
    if (this.router.url.indexOf('main/trade') !== -1) {
      return this._setTradeNavigations();
    }

    this.navigations = [
      {
        icon: 'home',
        label: 'Home',
        route: ['/main/home'],
      },
      {
        icon: 'users',
        label: 'User Management',
        route: ['/main/user-management'],
      },
      {
        icon: 'monitor',
        label: 'Session Management',
        route: ['/main/session-management'],
      },
      {
        icon: 'line-chart',
        label: 'Simulate User',
        route: ['/main/simulate-user'],
      },
      {
        icon: 'power',
        label: 'Logout',
        onClick: () => this.router.navigate(['/landing']),
      },
    ];
  }

  /**
   * set navigation items for otr role
   */
  private _setTradeNavigations(): void {
    this.navigations = [
      {
        icon: this._user.role.indexOf('LCN') === -1 ? 'add-circle' : 'dashboard',
        label: 'Dashboard',
        route: ['/main/trade/dashboard'],
      },
      {
        icon: 'edit',
        label: 'Modify',
        route: ['/main/trade/order-modification/otr-allocation'],
      },
      {
        icon: 'stacked-bar-chart',
        label: 'Trade Status',
        route: ['/main/trade/trade-status'],
      },
      {
        icon: 'list',
        label: 'Settlement Status',
        route: ['/main/trade/settlement-status'],
      },
      {
        icon: 'settings',
        label: 'Settings',
        route: ['/main/trade/settings'],
      },
    ];
  }
  /**
   * set navigation items for oloc role
   */
  private _seOlocNavigations(): void {
    // get my task count when user is oloc
    this._getMyTaskCount();

    this.navigations = [
      {
        icon: 'dashboard',
        label: 'Main Dashboard',
        route: ['/main/oloc-dashboard'],
      },
      {
        icon: 'task',
        label: 'My Tasks',
        route: ['/main/my-task'],
        notifications: () => this._myTasks,
      },
    ];
  }

  /**
   * get my task count for notification
   */
  private _getMyTaskCount(): void {
    const sub = this.taskService.getMyTaskCount().subscribe({
      next: (res) => (this._myTasks = res),
    });

    this.subscriptionService.store('_getMyTaskCount', sub);
  }
}
