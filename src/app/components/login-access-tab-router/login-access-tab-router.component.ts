import { Component, OnInit } from '@angular/core';
import {TabRouterItem} from '../tab-router/tab-router.component';

@Component({
  selector: 'app-login-access-tab-router',
  templateUrl: './login-access-tab-router.component.html',
  styleUrls: ['./login-access-tab-router.component.scss']
})
export class LoginAccessTabRouterComponent implements OnInit {
  // routes
  routes: TabRouterItem[] = [];
  // root path
  private readonly _rootPath = '/main/user-management/login-access';

  constructor() {
    this.routes = [
      {
        label: 'Access Management',
        route: [this._rootPath, 'access-management'],
      },
      {
        label: '2-Factor Authentication',
        route: [this._rootPath, '2-factor-authentication'],
      },
    ];
  }

  ngOnInit() {
  }

}
