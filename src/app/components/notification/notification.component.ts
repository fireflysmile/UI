import {Component, ElementRef, OnInit} from '@angular/core';
import {NotificationService} from '../../services/api/notification.service';
import {SubscriptionService} from '../../services/subscription/subscription.service';
import {NotificationItem} from '../../models/notification-item';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class NotificationComponent implements OnInit {
  // opened state
  opened = false;
  // notifications
  notifications: NotificationItem[] = [];

  constructor(
    public elementRef: ElementRef<HTMLElement>,
    private notificationService: NotificationService,
    private subscriptionService: SubscriptionService,
  ) { }

  ngOnInit() {
    this._getRecentNotifications();
  }

  /**
   * get recent 3 notifications
   */
  private _getRecentNotifications(): void {
    const sub = this.notificationService
      .getRecentNotifications()
      .subscribe({
        next: res => this.notifications = res,
      });

    this.subscriptionService.store('_getNotifications', sub);
  }
}
