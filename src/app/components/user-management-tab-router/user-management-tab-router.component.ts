import { Component, OnInit } from '@angular/core';
import {TabRouterItem} from '../tab-router/tab-router.component';

@Component({
  selector: 'app-user-management-tab-router',
  templateUrl: './user-management-tab-router.component.html',
  styleUrls: ['./user-management-tab-router.component.scss']
})
export class UserManagementTabRouterComponent implements OnInit {
  // routes
  routes: TabRouterItem[] = [];
  // root path
  private readonly _rootPath = '/main/user-management';

  constructor() {
    this.routes = [
      {
        label: 'New User Creation',
        route: [this._rootPath, 'new-user-creation'],
      },
      {
        label: 'Member User Requests',
        route: [this._rootPath, 'member-user-requests'],
      },
      {
        label: 'Login Access',
        route: [this._rootPath, 'login-access'],
      },
      {
        label: 'Functionalities Management',
        route: [this._rootPath, 'functionalities-management'],
      },
      {
        label: 'Bundle Management',
        route: [this._rootPath, 'bundle-management'],
      },
    ];
  }

  ngOnInit() {
  }

}
