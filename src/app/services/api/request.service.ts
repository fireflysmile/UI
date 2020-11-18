import { Injectable } from '@angular/core';
import {ApiBaseService} from './api-base.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RequestItem} from '../../models/request-item';

@Injectable({
  providedIn: 'root'
})
export class RequestService extends ApiBaseService {

  constructor(
    private http: HttpClient,
  ) {
    super('/request');
  }

  /**
   * get requests
   */
  getRequests(): Observable<RequestItem[]> {
    return this.http.get<RequestItem[]>(this.endpoint('/requests.json'));
  }
}
