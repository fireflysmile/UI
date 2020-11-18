import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {TS_MODAL_DATA, TS_MODAL_REF} from '../modal/models/ts-modal-options';
import {OtrAllocatorComponent} from '../otr-allocator/otr-allocator.component';
import {ModalService} from '../modal/modal.service';
import {
  AllocationConfirmModalComponent,
  AllocationConfirmModalData
} from '../allocation-confirm-modal/allocation-confirm-modal.component';
import {MessageService} from '../message/message.service';
import {SubscriptionService} from '../../services/subscription/subscription.service';
import {cloneDeep} from 'lodash-es';
import {TsModalRef} from '../modal/models/ts-modal-ref';
import {finalize} from 'rxjs/operators';
import {OrderItem} from '../../models/order-item';
import {OrderService} from '../../services/api/order.service';

export interface OtrAllocationModalData {
  order: OrderItem;
}

@Component({
  selector: 'app-otr-allocation-modal',
  templateUrl: './otr-allocation-modal.component.html',
  styleUrls: ['./otr-allocation-modal.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class OtrAllocationModalComponent implements OnInit {
  // allocator
  @ViewChild(OtrAllocatorComponent, {static: false}) allocatorRef: OtrAllocatorComponent;
  // allocation loading state
  loading = false;

  constructor(
    @Inject(TS_MODAL_REF) public tsModalRef: TsModalRef<OtrAllocationModalComponent>,
    @Inject(TS_MODAL_DATA) public data: OtrAllocationModalData,
    private modalService: ModalService,
    private orderService: OrderService,
    private messageService: MessageService,
    private subscriptionService: SubscriptionService,
  ) { }

  ngOnInit(): void {
  }

  /**
   * return true when there are remaining qty or value
   */
  get _hasRemains(): boolean {
    const {
      remainingQty,
      remainingValue,
    } = this.allocatorRef;

    return remainingQty > 0 || remainingValue > 0;
  }

  /**
   * handle confirm
   */
  onConfirm(): void {
    if (this._hasRemains) {
      this._openConfirmModal();
    } else {
      this._allocatePCCodes();
    }
  }

  /**
   * open allocation confirm modal
   */
  private _openConfirmModal(): void {
    const {
      remainingQty,
      remainingValue,
    } = this.allocatorRef;

    this.modalService.open(AllocationConfirmModalComponent, {
      data: {
        unallocatedQty: remainingQty,
        unallocatedValue: remainingValue,
      } as AllocationConfirmModalData,
      onClose: res => {
        if (res) {
          this._allocatePCCodes();
        }
      },
    });
  }

  /**
   * allocate pc codes
   */
  private _allocatePCCodes(): void {
    const allocation = cloneDeep(this.allocatorRef.detail);

    this.loading = true;

    const sub = this.orderService
      .allocatePCCodes(allocation)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.messageService.open('success', 'Allocation completed successfully !');
          this.tsModalRef.close();
        }
      });

    this.subscriptionService.store('_allocatePCCodes', sub);
  }
}
