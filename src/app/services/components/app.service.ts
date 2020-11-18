import { Injectable } from '@angular/core';
import { UserInfoItem } from '../../models/user-info-item';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  // user info subject
  private readonly _userInfo$: BehaviorSubject<
    UserInfoItem
  > = new BehaviorSubject<UserInfoItem>(null);

  constructor() {
    // don't use "Router.url" here as it get its value only after the AuthGuard is finished.
    // this is temporary anyway, only for DEMO
    // (this will not be there in final codebase, so no need to do unit-test for this)
    /* istanbul ignore if */
    if (window.location.href.indexOf('status-tracker') !== -1) {
      this._userInfo$.next({ role: 'Member' });
    }
  }

  /**
   * set current user info
   * @param user user info
   */
  set userInfo(user: UserInfoItem) {
    this._userInfo$.next(user);
  }

  /**
   * return current user info
   */
  get userInfo$(): Observable<UserInfoItem> {
    return this._userInfo$.asObservable();
  }

  /**
   * return true when user is HO
   */
  get isHO$(): Observable<boolean> {
    return this.userInfo$.pipe(map((user) => user && user.role === 'HO'));
  }

  /**
   * return true when user is RO or HO
   */
  get isOfficial$(): Observable<boolean> {
    return this.userInfo$.pipe(
      map((user) => user && (user.role === 'RO' || user.role === 'HO'))
    );
  }

  /**
   * return true when user is Member Admin
   */
  get isMemberAdmin$(): Observable<boolean> {
    return this.userInfo$.pipe(
      map((user) => user && user.role === 'Member Admin')
    );
  }

  /**
   * return true when user is LCN Admin or LCN Super admin
   */
  get isLCNAdmin$(): Observable<boolean> {
    return this.userInfo$.pipe(
      map(
        (user) =>
          user && (user.role === 'LCN Admin' || user.role === 'LCN Super Admin')
      )
    );
  }

  /**
   * return ture when user is enabled
   */
  get isEnabled$(): Observable<boolean> {
    return this.userInfo$.pipe(map((user) => user && user.enabled));
  }

  /**
   * return ture when user is disabled
   */
  get isDisabled$(): Observable<boolean> {
    return this.userInfo$.pipe(map((user) => !user || !user.enabled));
  }

  /**
   * return true when user is oloc
   */
  get isOloc$(): Observable<boolean> {
    return this.userInfo$.pipe(map((user) => user && user.role === 'Oloc'));
  }
}
