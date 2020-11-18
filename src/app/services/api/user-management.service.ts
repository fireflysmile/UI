import { Injectable } from '@angular/core';
import {ApiBaseService} from './api-base.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserAccessInfoItem} from '../../models/user-access-info-item';
import {UserNameData} from '../../components/user-name-editable-field/user-name-editable-field.component';
import {UserEmailIdData} from '../../components/email-id-editable-field/email-id-editable-field.component';
import {UserPhoneNumberData} from '../../components/phone-number-editable-field/phone-number-editable-field.component';
import {AccessManagementFilterValue} from '../../components/access-management-filter/access-management-filter.component';
import {map} from 'rxjs/operators';
import {stringContains} from '../../utils/validation.util';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService extends ApiBaseService {

  constructor(
    private http: HttpClient,
  ) {
    super('/user-management');
  }

  /**
   * get user access information
   * @param filter access management filter
   */
  getUserAccessInfo(filter: AccessManagementFilterValue): Observable<UserAccessInfoItem[]> {
    return this.http
      .get<UserAccessInfoItem[]>(this.endpoint('/user-access-list.json'))
      .pipe(map(res => {
        return res.filter(item => {
          return stringContains(item.userId, filter ? filter.userId : null)
            && stringContains(item.memberId, filter ? filter.memberId : null)
            && stringContains(item.segment, filter ? filter.segment : null);
        });
      }));
  }

  /**
   * reset user password
   */
  resetUserPassword(): Observable<void> {
    return this.getFakeResponse(null)
      .pipe(this.attachDelay(500));
  }

  /**
   * update user credentials
   * @param user user to modify
   * @param data updated data
   */
  updateUserCredentials(user: UserAccessInfoItem, data: UserNameData | UserEmailIdData | UserPhoneNumberData): Observable<void> {
    return this.getFakeResponse(null)
      .pipe(this.attachDelay(400));
  }
}
