import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {OrderModificationOverviewBaseComponent} from '../order-modification-overview-base/order-modification-overview-base.component';
import {environment} from '../../../environments/environment';
import {TableFilterOptionItem} from '../../models/table-column';
import {SubscriptionService} from '../../services/subscription/subscription.service';
import {RequestStatusBarData} from '../request-status-bar/request-status-bar.component';
import {OrderService} from '../../services/api/order.service';
import {DivisionCardData} from '../division-card/division-card.component';
import {OrderModificationSummary} from '../../models/order-modification-summary';
import {OrderModificationStatus} from '../../models/order-modification-status';
import {WaterfallBar} from '../icons/waterfall-bar-chart/waterfall-bar-chart.component';

const {
  segmentConfig,
} = environment;

@Component({
  selector: 'app-pc-overview',
  templateUrl: './pc-overview.component.html',
  styleUrls: [
    '../order-modification-overview-base/order-modification-overview-base.component.scss',
    './pc-overview.component.scss'
  ],
  providers: [
    SubscriptionService,
  ],
})
export class PcOverviewComponent extends OrderModificationOverviewBaseComponent implements OnInit {
  // emit when data selected
  @Output() dataSelect: EventEmitter<WaterfallBar> = new EventEmitter<WaterfallBar>();
  // segment filter
  segment = '';
  // segment options
  segmentOptions: TableFilterOptionItem[] = [
    {
      label: 'All',
      value: '',
    },
    ...Object.keys(segmentConfig).map(key => segmentConfig[key]),
  ];
  // order modification statuses
  orderModificationStatuses: RequestStatusBarData[] = [];
  // status
  statuses: OrderModificationStatus;
  // cash market
  cashMarket: DivisionCardData;
  // future and options
  futureAndOptions: DivisionCardData;
  // currency derivatives
  currencyDerivatives: DivisionCardData;
  // summary
  private _summary: OrderModificationSummary;

  constructor(
    private orderService: OrderService,
    private subscriptionService: SubscriptionService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.getData();
  }

  /**
   * get data
   */
  getData(): void {
    this._getModificationStatuses();
    this.getModificationSummary();
  }

  /**
   * get modification statuses
   */
  private _getModificationStatuses(): void {
    const sub = this.orderService
      .getOrderModificationStatuses()
      .subscribe({
        next: res => this.statuses = res,
      });

    this.subscriptionService.store('_getModificationStatuses', sub);
  }

  /**
   * get modification summary
   * @param withAutoModificationStatus set true to get auto modification summary
   */
  getModificationSummary(withAutoModificationStatus = false): void {
    const sub = this.orderService
      .getOrderModificationSummary(withAutoModificationStatus)
      .subscribe({
        next: res => {
          this._summary = res;
          this._createStatusBarData();
          this._createDivisionData();
        },
      });

    this.subscriptionService.store('getModificationSummary', sub);
  }

  /**
   * create status bar chart
   */
  private _createStatusBarData(): void {
    this.orderModificationStatuses = [
      {
        label: 'Successful',
        subLabel: 'INR 2 CR',
        value: this._summary.successful,
        color: '#12BE34',
      },
      {
        label: 'Modification under process',
        subLabel: 'INR 2 CR',
        value: this._summary.modificationUnderProcess,
        color: '#362D7E',
      },
      {
        label: 'Auto-modification under process',
        subLabel: 'INR 2 CR',
        value: this._summary.autoModificationUnderProcess,
        color: '#EEAE2B',
      },
      {
        label: 'Unsuccessful',
        subLabel: 'INR 2 CR',
        value: this._summary.unsuccessful,
        color: '#8B8A8A',
      },
    ];
  }

  /**
   * create division data
   */
  private _createDivisionData(): void {
    this.cashMarket = {
      icon: 'radar',
      label: 'Cash Market',
      children: [
        {
          label: 'Pending',
          value: this._summary.cashMarkets.pending,
        },
        {
          label: 'Modified',
          value: this._summary.cashMarkets.modified,
        },
      ]
    };

    this.futureAndOptions = {
      icon: 'radar',
      label: 'Future & Options',
      children: [
        {
          label: 'Pending',
          value: this._summary.futureAndOptions.pending,
        },
        {
          label: 'Modified',
          value: this._summary.futureAndOptions.modified,
        },
      ]
    };

    this.currencyDerivatives = {
      icon: 'radar',
      label: 'Currency Derivatives',
      children: [
        {
          label: 'Pending',
          value: this._summary.currencyDerivatives.pending,
        },
        {
          label: 'Modified',
          value: this._summary.currencyDerivatives.modified,
        },
      ]
    };
  }
}
