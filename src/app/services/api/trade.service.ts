import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { randomNumber, randomGaussianNumber, randomPick, randomDate } from '../../utils/random.util';
import { ApiBaseService } from './api-base.service';
import { Observable } from 'rxjs';
import { TradeItem } from 'src/app/models/trade-item';
import { ClearingMemberInfo } from 'src/app/models/clearing-member-info';

@Injectable({
  providedIn: 'root'
})
export class TradeService extends ApiBaseService {

  private _datePipe: DatePipe = new DatePipe('en-US');

  constructor() {
    super('/trade');
  }

  /**
   * get trades
   */
  getTrades(tmCodes?: string[], pcCodes?: string[]): Observable<TradeItem[]> {
    const trades = [];

    for (let i = 0; i < 2000; i++) {
      const trade: TradeItem = {
        tmCode: `TM${randomGaussianNumber(1, 48)}`,
        tmName: '',
        pcCode: Math.random() > 0.5 ? `PC${randomGaussianNumber(1, 48)}` : null,
        pcName: '',
        ecCode: `EC${randomGaussianNumber(1, 48)}`,
        ecName: '',
        buySell: randomPick(['Buy', 'Sell']),
        securityType: `Security ${randomNumber(1, 5)}`,
        symbol: `Symbol ${randomNumber(1, 30)}`,
        price: randomNumber(100, 300),
        qty: randomNumber(20, 50),
        value: 0,
        exchange: `Exchange ${randomNumber(1, 3)}`,
        orderNumber: `ON${randomNumber(1000, 10000)}`,
        tradeNumber: `EN${i + 5782}`,
        time: this._datePipe.transform(randomDate(new Date(new Date().getTime() - 24 * 60 * 60 * 1000)), 'HH:mm'),
        status: randomPick(['Confirmed', 'Autoconfirmed', 'Pending', 'Rejected']),
        isOTR: false,
        marginable: Math.random() > 0.5,
        segment: Math.random() < 0.85 ? 'MC' : randomPick(['FO', 'CD', 'CO', 'SLB'])
      };

      trade.value = trade.price * trade.qty;
      trade.isOTR = trade.pcCode ? Math.random() < 0.2 : false;

      trade.tmName = trade.tmCode.replace('TM', 'Lorem TM Name ');
      trade.pcName = trade.pcCode ? trade.pcCode.replace('PC', 'Ipsum PC Name ') : '';
      trade.ecName = trade.ecCode.replace('EC', 'Dolor Client Name ');

      let userCanSee = true;
      if (tmCodes && pcCodes) {
        userCanSee = tmCodes.indexOf(trade.tmCode) !== -1 || pcCodes.indexOf(trade.pcCode) !== -1;
      } else if (tmCodes) {
        userCanSee = tmCodes.indexOf(trade.tmCode) !== -1;
      }

      if (userCanSee) {
        trades.push(trade);
      }
    }
    return this.getFakeResponse(trades);
  }

  getClearingMemberInfo(): Observable<ClearingMemberInfo> {
    const data = {
      code: `CM1`,
      name: 'Amet CM Name 1',
      tmCodes: [1, 2, 3, 4, 5, 6, 7, 8].map(j => `TM${((j - 1) * 6)}`),
      pcCodes: [1, 2, 3, 4, 5, 6, 7, 8].map(j => `PC${((j - 1) * 6)}`),
    };
    return this.getFakeResponse(data);
  }

  getTradingMemberCode(): Observable<string> {
    return this.getFakeResponse('TM24');
  }

  getClearingMembers(): Observable<ClearingMemberInfo[]> {
    const clearingMembers = [];
    for (let i = 0; i < 6; i++) {
      const member: ClearingMemberInfo = {
        code: `CM${i + 1}`,
        name: '',
        tmCodes: [1, 2, 3, 4, 5, 6, 7, 8].map(j => `TM${((j - 1) * 6) + i}`),
        pcCodes: [1, 2, 3, 4, 5, 6, 7, 8].map(j => `PC${((j - 1) * 6) + i}`)
      };
      member.name = member.code.replace('CM', 'Amet CM Name ');
      clearingMembers.push(member);
    }
    return this.getFakeResponse(clearingMembers);
  }

}
