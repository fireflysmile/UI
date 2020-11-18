import { Component, OnInit } from '@angular/core';
import {OrderModificationBaseComponent} from '../order-modification-base/order-modification-base.component';
import {truncateDate} from '../../../../utils/date.util';

@Component({
  selector: 'app-otr-allocation-page',
  templateUrl: './otr-allocation-page.component.html',
  styleUrls: [
    '../order-modification-base/order-modification-base.component.scss',
    './otr-allocation-page.component.scss',
  ]
})
export class OtrAllocationPageComponent extends OrderModificationBaseComponent implements OnInit {
  // allocated time
  allocatedTime: Date = new Date();
  // true when allocated time is today
  isToday = false;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this._checkAllocatedTime();
  }

  /**
   * set `true` to isToday when allocated time is today
   */
  private _checkAllocatedTime(): void {
    this.isToday = truncateDate(this.allocatedTime, 'date').valueOf() === truncateDate(new Date(), 'date').valueOf();
  }
}
