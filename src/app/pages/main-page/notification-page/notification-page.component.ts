import { Component, OnInit } from '@angular/core';
import {NotificationService} from '../../../services/api/notification.service';
import {SubscriptionService} from '../../../services/subscription/subscription.service';
import {NotificationItem} from '../../../models/notification-item';

@Component({
  selector: 'app-notification-page',
  templateUrl: './notification-page.component.html',
  styleUrls: ['./notification-page.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class NotificationPageComponent implements OnInit {
  // notifications
  notifications: NotificationItem[] = [];

  constructor(
    private notificationService: NotificationService,
    private subscriptionService: SubscriptionService,
  ) { }

  ngOnInit(): void {
    this._getNotifications();
  }

  /**
   * get notifications
   */
  private _getNotifications(): void {
    const sub = this.notificationService
      .getNotifications()
      .subscribe({
        next: res => this.notifications = res,
      });

    this.subscriptionService.store('_getNotifications', sub);
  }
}
