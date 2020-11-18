import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {OtrRequestSummaryData} from './otr-request-summary-item/otr-request-summary-item.component';
import {OrderAllocationSummaryData} from '../../models/order-allocation-summary-data';
import {randomPick} from '../../utils/random.util';
import {MINUTE_MILLS} from '../../utils/date.util';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-otr-request-summary',
  templateUrl: './otr-request-summary.component.html',
  styleUrls: ['./otr-request-summary.component.scss']
})
export class OtrRequestSummaryComponent implements OnInit, OnDestroy {
  // set summary data
  @Input() set summary(summary: OrderAllocationSummaryData) {
    this._summary = summary;
    this._createDisplayingData();
  }
  // total counts
  total = 0;
  // allocation under progress
  allocationUnderProgress: OtrRequestSummaryData = {
    icon: 'reload',
    label: 'Allocation Under Process',
    value: 0,
  };
  // unsuccessful
  unsuccessful: OtrRequestSummaryData = {
    icon: 'negative',
    label: 'Unsuccessful',
    value: 0,
  };
  // rejected
  rejected: OtrRequestSummaryData = {
    icon: 'exclamation',
    label: 'Rejected',
    value: 0,
  };
  // successful
  successful: OtrRequestSummaryData = {
    icon: 'reload',
    label: 'Successful',
    value: 0,
    children: [
      {
        icon: 'modify',
        label: 'Modified',
        value: 0,
      },
      {
        icon: 'warning',
        label: 'Potential FPI Violation',
        value: 0,
      },
    ]
  };
  // set true to show timer
  showTimer = false;
  // remaining time
  remainingTime$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  randomPickStartTimer = randomPick([true, false]);
  // start time
  private _startTime = 0;
  // interval
  private _interval;
  // summary data
  private _summary: OrderAllocationSummaryData;

  constructor() { }

  ngOnInit(): void {
    // start timer randomly
    if (this.randomPickStartTimer) {
      this._startTimer();
    }
  }

  ngOnDestroy(): void {
    clearInterval(this._interval);
  }

  get remainingTime(): number {
    const remaining = 60 - Math.floor((Date.now() - this._startTime) / MINUTE_MILLS);

    if (remaining <= 0) {
      this.showTimer = false;
      clearInterval(this._interval);
    }

    return remaining;
  }

  /**
   * start timer
   */
  private _startTimer(): void {
    this._startTime = Date.now();
    this.showTimer = true;

    this._interval = setInterval(() => this.remainingTime$.next(this.remainingTime), 1000);
  }

  /**
   * create displaying data
   */
  private _createDisplayingData(): void {
    if (this._summary) {
      // total count
      this.total = this._summary.successful.modified
        + this._summary.successful.potentialFPIViolation
        + this._summary.allocationUnderProcess
        + this._summary.unsuccessful
        + this._summary.rejected;

      // under progress
      this.allocationUnderProgress.value = this._summary.allocationUnderProcess;

      // unsuccessful
      this.unsuccessful.value = this._summary.unsuccessful;

      // rejected
      this.rejected.value = this._summary.rejected;

      // successful
      this.successful = {
        icon: 'reload',
        label: 'Successful',
        value: this._summary.successful.modified + this._summary.successful.potentialFPIViolation,
        children: [
          {
            icon: 'modify',
            label: 'Modified',
            value: this._summary.successful.modified,
          },
          {
            icon: 'warning',
            label: 'Potential FPI Violation',
            value: this._summary.successful.potentialFPIViolation,
          },
        ]
      };
    }
  }
}
