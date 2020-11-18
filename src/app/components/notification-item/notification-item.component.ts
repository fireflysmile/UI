import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {NotificationItem} from '../../models/notification-item';

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss']
})
export class NotificationItemComponent implements OnInit {
  // set notification
  @Input() set notification(notification: NotificationItem) {
    this._notification = notification;
    this._defineNotificationType();
  }
  // error type
  @HostBinding('class.cm-error') isError = false;
  // success type
  @HostBinding('class.cm-success') isSuccess = false;
  // payment type
  @HostBinding('class.cm-payment') isPayment = false;
  // default type
  @HostBinding('class.cm-default') isDefault = false;
  // notification data
  private _notification: NotificationItem;

  constructor() { }

  ngOnInit() {
  }

  /**
   * return notification
   */
  get notification(): NotificationItem {
    return this._notification;
  }

  /**
   * define notification type to set class
   */
  private _defineNotificationType(): void {
    if (this._notification) {
      this.isError = this._notification.type === 'error';
      this.isSuccess = this._notification.type === 'success';
      this.isPayment = this._notification.type === 'payment';
      this.isDefault = !this.isError && !this.isSuccess && !this.isPayment;
    }
  }
}
