import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiBaseService } from './api-base.service';
import { ApplicationRequestItem } from '../../models/application-request-item';


@Injectable({
  providedIn: 'root'
})
export class ApplicationRequestService extends ApiBaseService {

  constructor(
    private http: HttpClient,
  ) {
    super('/applicationRequest');
  }

  /**
   * get application requests
   * @param start start date
   * @param end end date
   */
  getApplicationRequests(start: Date, end: Date): Observable<ApplicationRequestItem[]> {
    return this.http.get<ApplicationRequestItem[]>(this.endpoint('/application-requests.json'))
      .pipe(map(res => {
        return res.filter(item => {
          const over = start ? new Date(item.applicationReceivedOn).valueOf() >= start.valueOf() : true;
          const under = end ? new Date(item.applicationReceivedOn).valueOf() <= end.valueOf() : true;

          return over && under;
        });
      }));
  }
}
