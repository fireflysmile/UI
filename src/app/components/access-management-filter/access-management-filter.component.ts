import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AppService} from '../../services/components/app.service';
import {environment} from '../../../environments/environment';
import {SubscriptionService} from '../../services/subscription/subscription.service';
import {isValidString} from '../../utils/validation.util';

const {
  segmentConfig,
} = environment;

export interface AccessManagementFilterValue {
  userId: string;
  memberId: string;
  segment: string;
}

@Component({
  selector: 'app-access-management-filter',
  templateUrl: './access-management-filter.component.html',
  styleUrls: ['./access-management-filter.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class AccessManagementFilterComponent implements OnInit {
  // filter
  @Output() filter: EventEmitter<AccessManagementFilterValue> = new EventEmitter<AccessManagementFilterValue>();
  // filter groups
  group: FormGroup = new FormGroup({
    userId: new FormControl(''),
    memberId: new FormControl(''),
    segment: new FormControl(''),
  });
  // segment options
  segmentOptions = Object.keys(segmentConfig).map(key => segmentConfig[key]);
  // valid state
  valid = false;
  // is LCN admin
  private _isLCNAdmin = false;

  constructor(
    public appService: AppService,
    private subscriptionService: SubscriptionService,
  ) { }

  ngOnInit(): void {
    this._subscribeValueChanges();
    this._subscribeIsLCNAdmin();
  }

  /**
   * subscribe form value changes
   */
  private _subscribeValueChanges(): void {
    this.group.valueChanges.subscribe((value: AccessManagementFilterValue) => this._setValidState(value));
  }

  /**
   * set valid state
   * @param value value
   */
  private _setValidState(value: AccessManagementFilterValue): void {
    if (this._isLCNAdmin) {
      this.valid = isValidString(value.segment) || isValidString(value.userId) || isValidString(value.memberId);
    } else {
      this.valid = isValidString(value.segment) || isValidString(value.userId);
    }
  }

  /**
   * subscribe isLCNAdmin state
   */
  private _subscribeIsLCNAdmin(): void {
    const sub = this.appService
      .isLCNAdmin$
      .subscribe(res => this._isLCNAdmin = res);

    this.subscriptionService.store('_subscribeIsLCNAdmin', sub);
  }

  /**
   * reset filter
   */
  resetFilter(): void {
    this.group.patchValue({
      userId: '',
      memberId: '',
      segment: '',
    } as AccessManagementFilterValue);

    this.valid = false;
  }
}
