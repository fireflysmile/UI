import { Component, OnInit } from '@angular/core';

import { AppService } from 'src/app/services/components/app.service';
import { TradeService } from 'src/app/services/api/trade.service';
import { TradeItem } from 'src/app/models/trade-item';
import { ClearingMemberInfo } from 'src/app/models/clearing-member-info';
import { CapsuleToggleOption } from 'src/app/components/capsule-toggle/capsule-toggle.component';

@Component({
  selector: 'app-trade-dashboard-page',
  templateUrl: './trade-dashboard-page.component.html',
  styleUrls: ['./trade-dashboard-page.component.scss']
})
export class TradeDashboardPageComponent implements OnInit {

  public trades: TradeItem[];
  public clearingMembers: ClearingMemberInfo[];
  public loading = true;
  public expanded: 'overall' | 'pc';

  public userType: 'lcn' | 'cm' | 'tm';
  public showViewModeToggle: boolean;

  public viewModeOptions: CapsuleToggleOption[] = [
    { label: 'CM Mode', value: 'cm' },
    { label: 'TM Mode', value: 'tm' }
  ];
  public viewMode: 'cm' | 'tm';

  // display the table after a slight delay as it affects intiial rendering performance
  public tableDisplayDelayComplete: boolean;

  constructor(private appService: AppService, private tradeService: TradeService) { }

  ngOnInit(): void {
    this.appService.userInfo$.subscribe(user => {
      if (user.role.indexOf('LCN') !== -1) {
        this._setUserType('lcn');

      } else if (user.role === 'CM & TM') {
        // set the user type to cm initially
        this.viewMode = 'cm';
        this.showViewModeToggle = true;
        this._setUserType('cm');

      } else if (user.role === 'CM') {
        this._setUserType('cm');

      } else if (user.role === 'TM') {
        this._setUserType('tm');
      }
    });
  }

  private _setUserType(type: 'cm' | 'tm' | 'lcn') {
    this.loading = true;
    this.tableDisplayDelayComplete = false;

    switch (type) {
      case 'lcn':
        // get all trades
        this.userType = 'lcn';
        this._getClearingMembers();
        this._getTrades();
        break;
      case 'cm':
        // get user info first, and then fetch trades based on user's TM and PC codes under them
        this.userType = 'cm';
        this._getClearingMemberInfo();
        break;
      case 'tm':
        // get user info first, and then fetch trades based on user's TM code
        this.userType = 'tm';
        this._getTradingMemberInfo();
        break;
    }
  }

  /**
   * get trades
   * fetch all the trades that can be viewed by the user
   */
  private _getTrades(tmCodes?: string[], pcCodes?: string[]) {
    this.tradeService.getTrades(tmCodes, pcCodes).subscribe(res => {
      this.trades = res;
      this.loading = false;
      setTimeout(() => {
        this.tableDisplayDelayComplete = true;
      }, 1200);
    });
  }

  /**
   * get clearing members
   */
  private _getClearingMembers() {
    this.tradeService.getClearingMembers().subscribe(res => {
      this.clearingMembers = res;
    });
  }

  /**
   * get clearing member info (for the current logged in user)
   * then fetch the trades that can be viewed by the user
   */
  private _getClearingMemberInfo() {
    this.tradeService.getClearingMemberInfo().subscribe(res => {
      this.clearingMembers = [res];
      this._getTrades(res.tmCodes, res.pcCodes);
    });
  }

  /**
   * get trading member info (for the current logged in user)
   * then fetch the trades that can be viewed by the user
   */
  private _getTradingMemberInfo() {
    this.tradeService.getTradingMemberCode().subscribe(tmCode => {
      this._getTrades([tmCode]);
    });
  }

  /**
   * on view mode changed
   * ONLY FOR "CM & TM" type user (user has both roles)
   * set the userType based on selected view mode
   */
  public onViewModeChanged(mode: 'cm' | 'tm') {
    this._setUserType(mode);
    this.viewMode = mode;
  }

}
