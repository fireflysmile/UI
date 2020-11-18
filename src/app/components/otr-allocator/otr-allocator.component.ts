import {ChangeDetectorRef, Component, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {SubscriptionService} from '../../services/subscription/subscription.service';
import {OrderAllocationDetail} from '../../models/order-allocation-detail';
import {OrderAllocation} from '../../models/order-allocation';
import {sum} from '../../utils/other.utils';
import {OtrAllocationItemComponent} from './otr-allocation-item/otr-allocation-item.component';
import {LookupService} from '../../services/api/lookup.service';
import {OrderService} from '../../services/api/order.service';
import {OrderItem} from '../../models/order-item';

@Component({
  selector: 'app-otr-allocator',
  templateUrl: './otr-allocator.component.html',
  styleUrls: ['./otr-allocator.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class OtrAllocatorComponent implements OnInit {
  // set otr allocation item
  @Input() set data(data: OrderItem) {
    this._data = data;
    this._getAllocationDetail();
  }
  // allocation items
  @ViewChildren(OtrAllocationItemComponent) otrAllocationItems: QueryList<OtrAllocationItemComponent>;
  // allocation detail
  detail: OrderAllocationDetail;
  // total pc codes
  codes: string[] = [];
  // data
  private _data: OrderItem;

  constructor(
    private orderService: OrderService,
    private lookupService: LookupService,
    private changeDetectorRef: ChangeDetectorRef,
    private subscriptionService: SubscriptionService,
  ) { }

  ngOnInit(): void {
    this._getAvailablePCCodes();
  }

  /**
   * check confirmable
   */
  get confirmable(): boolean {
    return !this.totalQtyExceeded
      && !this.totalValueExceeded
      && this._allEntriesValid();
  }

  // total quantity exceeded state
  get totalQtyExceeded(): boolean {
    return this.detail && this.detail.totalQty < this.totalAllocatedQty;
  }

  // total value exceeded state
  get totalValueExceeded(): boolean {
    return this.detail && this.detail.totalValue < this.totalAllocatedValue;
  }

  /**
   * return remaining qty
   */
  get remainingQty(): number {
    return ((this.detail && this.detail.totalQty) || 0) - this.totalAllocatedQty;
  }

  /**
   * return remaining value
   */
  get remainingValue(): number {
    return ((this.detail && this.detail.totalValue) || 0) - this.totalAllocatedValue;
  }

  /**
   * return total allocated quantity
   */
  get totalAllocatedQty(): number {
    return this.detail ? this.detail.allocations
      .map(item => this._getNumericValue(item.allocatedQty))
      .reduce(sum) : 0;
  }

  /**
   * return total allocated value
   */
  get totalAllocatedValue(): number {
    return this.detail ? this.detail.allocations
      .map(item => this._getNumericValue(item.allocatedValue))
      .reduce(sum) : 0;
  }

  /**
   * return true when value fully used, but qty is not
   */
  get onlyQtyNotFullyAllocated(): boolean {
    return (this.detail?.totalValue || 0) === this.totalAllocatedValue
      && (this.detail?.totalQty || 0) > this.totalAllocatedQty;
  }

  /**
   * return true when qty fully used, but value is not
   */
  get onlyValueNotFullyAllocated(): boolean {
    return (this.detail?.totalValue || 0) > this.totalAllocatedValue
      && (this.detail?.totalQty || 0) === this.totalAllocatedQty;
  }

  /**
   * allocated pc code map
   */
  get allocatedPCCodeMap(): {[k: string]: boolean} {
    const map = {};

    this.detail.allocations.forEach(item => map[item.pcCode] = true);

    return map;
  }

  /**
   * return unconfirmed allocations
   */
  get unConfirmedAllocations(): OrderAllocation[] {
    return this.detail?.allocations.filter(item => !item.confirmed);
  }

  /**
   * return unconfirmed allocation items
   */
  get unConfirmedAllocationItems(): OtrAllocationItemComponent[] {
    return this.otrAllocationItems.toArray().filter(item => !item.data.confirmed);
  }

  /**
   * get allocation detail
   */
  private _getAllocationDetail(): void {
    if (this._data) {
      const sub = this.orderService
        .getOrderAllocationDetail(this._data)
        .subscribe({
          next: res => {
            this.detail = res;
            this._setInitialAllocation();
            this.changeDetectorRef.detectChanges();
          },
        });

      this.subscriptionService.store('_getAllocationDetail', sub);
    }
  }

  /**
   * get available pc codes
   */
  private _getAvailablePCCodes(): void {
    const sub = this.lookupService
      .getAvailablePCCodes()
      .subscribe({
        next: res => this.codes = res,
      });

    this.subscriptionService.store('_getAvailablePCCodes', sub);
  }

  /**
   * add an allocation when allocations array is empty
   */
  private _setInitialAllocation(): void {
    if (this.detail.allocations.length === 0) {
      this.addNewAllocation();
    }
  }

  /**
   * add new allocation
   */
  addNewAllocation(): void {
    this.detail.allocations.push({
      pcCode: '',
      allocatedQty: '',
      allocatedValue: '',
      contactNoteNumber: '',
    });
  }

  /**
   * remove allocation
   * @param allocation allocation to remove
   */
  removeAllocation(allocation: OrderAllocation): void {
    this.detail.allocations = this.detail.allocations.filter(item => item !== allocation);
    this.changeDetectorRef.detectChanges();
  }

  /**
   * get numeric value only
   * @param value value
   */
  private _getNumericValue = (value: string): number => {
    return parseFloat(value.replace(',', '')) || 0;
  }

  /**
   * return true when all entries are valid
   */
  private _allEntriesValid(): boolean {
    const allocations = this.unConfirmedAllocationItems;

    return allocations.length > 0
      && allocations
        .filter(item => !item.data.confirmed)
        .every(item => item.valid);
  }

  /**
   * clear allocations
   */
  clearAllocations(): void {
    this.unConfirmedAllocations.forEach(item => {
      item.allocatedQty = '';
      item.allocatedValue = '';
    });

    this.unConfirmedAllocationItems.forEach(item => item.clearErrors());
  }

  /**
   * clear entries
   */
  clearEntries(): void {
    this.detail.allocations = this.detail.allocations.filter(item => item.confirmed);
    this._setInitialAllocation();
    this.changeDetectorRef.detectChanges();
  }
}
