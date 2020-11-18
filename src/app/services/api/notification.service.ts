import {Injectable, OnDestroy} from '@angular/core';
import {ApiBaseService} from './api-base.service';
import {HttpClient} from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';
import {NotificationItem} from '../../models/notification-item';
import {AppService} from '../components/app.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends ApiBaseService implements OnDestroy {
  // is RO state
  private _isRO = false;
  // is member state
  private _isMember = false;
  // subscription
  private _subscription: Subscription = new Subscription();

  constructor(
    private http: HttpClient,
    private appService: AppService,
  ) {
    super('/notification');
    this._getMemberRoles();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  /**
   * get member roles
   */
  private _getMemberRoles(): void {
    const sub = this.appService.userInfo$
      .subscribe(user => {
        this._isRO = user && user.role === 'RO';
        this._isMember = user && user.role === 'Member';
      });

    this._subscription.add(sub);
  }

  /**
   * get recent notifications
   */
  getRecentNotifications(): Observable<NotificationItem[]> {
    if (this._isMember) {
      return this.http.get<NotificationItem[]>(this.endpoint('/recent-notifications.json'));
    } else if (this._isRO) {
      return this.http.get<NotificationItem[]>(this.endpoint('/recent-ro-notifications.json'));
    } else {
      return this.getFakeResponse([]);
    }
  }

  /**
   * get notifications
   */
  getNotifications(): Observable<NotificationItem[]> {
    if (this._isMember) {
      return this.http.get<NotificationItem[]>(this.endpoint('/notifications.json'));
    } else if (this._isRO) {
      return this.http.get<NotificationItem[]>(this.endpoint('/ro-notifications.json'));
    } else {
      return this.getFakeResponse([]);
    }
  }
}
