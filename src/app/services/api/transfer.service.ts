import { Injectable } from '@angular/core';
import {ApiBaseService} from './api-base.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TransferItem} from '../../models/transfer-item';
import {randomNumber, randomPick} from '../../utils/random.util';

@Injectable({
  providedIn: 'root'
})
export class TransferService extends ApiBaseService {

  constructor(
    private http: HttpClient,
  ) {
    super('/transfer');
  }

  /**
   * get transfers
   */
  getTransfers(): Observable<TransferItem[]> {
    return this.http.get<TransferItem[]>(this.endpoint('/transfers.json'));
  }
}
