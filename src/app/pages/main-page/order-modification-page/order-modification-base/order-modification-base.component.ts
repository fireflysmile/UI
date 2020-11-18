import { Component, OnInit } from '@angular/core';
import {ViewToggleItem} from '../../../../components/view-toggle/view-toggle.component';

@Component({
  selector: 'app-order-modification-base',
  template: '',
})
export class OrderModificationBaseComponent implements OnInit {
  // routes
  routes: ViewToggleItem[] = [];
  // root path
  private readonly _rootPath = '/main/trade/order-modification';

  constructor() {
    this.routes = [
      {
        label: 'OTR Allocation',
        route: [this._rootPath, 'otr-allocation'],
      },
      {
        label: 'PC Modification',
        route: [this._rootPath, 'pc-modification'],
      },
    ];
  }

  ngOnInit() {
  }

}
