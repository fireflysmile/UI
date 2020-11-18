import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiBaseService } from './api-base.service';
import { AdminRequestItem } from '../../models/admin-request-item';


@Injectable({
  providedIn: 'root'
})
export class AdminRequestService extends ApiBaseService {

  constructor(
    private http: HttpClient,
  ) {
    super('/adminRequest');
  }

  /**
   * get admin requests
   * @param start start date
   * @param end end date
   */
  getAdminRequests(start: Date, end: Date): Observable<AdminRequestItem[]> {
    return this.http.get<AdminRequestItem[]>(this.endpoint('/admin-requests.json'))
      .pipe(map(res => {
        return res.filter(item => {
          const over = start ? new Date(item.applicationStartedOn).valueOf() >= start.valueOf() : true;
          const under = end ? new Date(item.applicationStartedOn).valueOf() <= end.valueOf() : true;

          return over && under;
        });
      }));
  }
}
