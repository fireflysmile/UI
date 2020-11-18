import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {OrderModificationOverviewBaseComponent} from '../order-modification-overview-base/order-modification-overview-base.component';
import {TableFilterOptionItem} from '../../models/table-column';
import {DatePipe} from '@angular/common';
import {SubscriptionService} from '../../services/subscription/subscription.service';
import {OrderAllocationStatus} from '../../models/order-allocation-status';
import {OrderAllocationSummaryData} from '../../models/order-allocation-summary-data';
import {DivisionCardData} from '../division-card/division-card.component';
import {OrderService} from '../../services/api/order.service';
import {WaterfallBar} from '../icons/waterfall-bar-chart/waterfall-bar-chart.component';

@Component({
  selector: 'app-otr-overview',
  templateUrl: './otr-overview.component.html',
  styleUrls: [
    '../order-modification-overview-base/order-modification-overview-base.component.scss',
    './otr-overview.component.scss',
  ],
  providers: [
    SubscriptionService,
  ],
})
export class OtrOverviewComponent extends OrderModificationOverviewBaseComponent implements OnInit {
  // emit when bar data selected
  @Output() dataSelect: EventEmitter<WaterfallBar> = new EventEmitter<WaterfallBar>();
  // marginable
  marginable = '';
  // marginable options
  marginableOptions: TableFilterOptionItem[] = [
    {
      label: 'All',
      value: '',
    },
    {
      label: 'Marginable',
      value: 'marginable',
    },
    {
      label: 'Non-marginable',
      value: 'non-marginable',
    },
  ];
  // day
  day: number;
  // day options
  dayOptions: TableFilterOptionItem[] = [];
  // exchange filter
  exchange = '';
  // summary data
  allocationSummary: OrderAllocationSummaryData;
  // status data for chart
  otrAllocationStatus: OrderAllocationStatus;
  // institutional
  institutional: DivisionCardData;
  // non institutional
  nonInstitutional: DivisionCardData;
  // today
  private readonly _today = new Date();
  // tomorrow
  private readonly _tomorrow = new Date(this._today.getFullYear(), this._today.getMonth(), this._today.getDate() + 1);
  // day after tomorrow
  private readonly _dayAfterTomorrow = new Date(this._today.getFullYear(), this._today.getMonth(), this._today.getDate() + 2);
  // date pipe
  private readonly _datePipe: DatePipe = new DatePipe('en-US');

  constructor(
    private orderService: OrderService,
    private subscriptionService: SubscriptionService,
  ) {
    super();

    this.day = this._tomorrow.valueOf();
    this.dayOptions = [
      {
        label: `N1231233 - ${this._datePipe.transform(this._tomorrow, 'MMM dd')}`,
        subLabel: 'Tomorrow',
        value: this._tomorrow.valueOf(),
      },
      {
        label: `N1231234 - ${this._datePipe.transform(this._dayAfterTomorrow, 'MMM dd')}`,
        subLabel: 'Day after Tomorrow',
        value: this._dayAfterTomorrow.valueOf(),
      },
    ];
  }

  ngOnInit(): void {
    this.getData();
  }

  /**
   * get data
   */
  getData(): void {
    this._getOrderAllocationSummary();
    this._getOrderAllocationStatus();
  }

  /**
   * get allocation summary data
   */
  private _getOrderAllocationSummary(): void {
    const sub = this.orderService
      .getOrderAllocationSummary()
      .subscribe({
        next: res => {
          this.allocationSummary = res;
          this._createInstitutionalData();
        },
      });

    this.subscriptionService.store('_getOrderAllocationSummary', sub);
  }

  /**
   * get order allocation status for chart
   */
  private _getOrderAllocationStatus(): void {
    const sub = this.orderService
      .getOrderAllocationStatus()
      .subscribe({
        next: res => this.otrAllocationStatus = res,
      });

    this.subscriptionService.store('_getOrderAllocationStatus', sub);
  }

  /**
   * create institutional data
   */
  private _createInstitutionalData(): void {
    if (this.allocationSummary) {
      this.institutional = {
        icon: 'radar',
        label: 'Institutional',
        children: [
          {
            label: 'Pending',
            value: this.allocationSummary.institutional.pending,
          },
          {
            label: 'Modified',
            value: this.allocationSummary.institutional.modified,
          },
        ]
      };

      this.nonInstitutional = {
        icon: 'radar',
        label: 'Non Institutional',
        children: [
          {
            label: 'Pending',
            value: this.allocationSummary.nonInstitutional.pending,
          },
          {
            label: 'Modified',
            value: this.allocationSummary.nonInstitutional.modified,
          },
        ]
      };
    }
  }
}
