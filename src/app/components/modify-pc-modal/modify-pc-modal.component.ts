import {Component, Inject, OnInit} from '@angular/core';
import {TS_MODAL_DATA, TS_MODAL_REF} from '../modal/models/ts-modal-options';
import {TsModalRef} from '../modal/models/ts-modal-ref';
import {LookupService} from '../../services/api/lookup.service';
import {SubscriptionService} from '../../services/subscription/subscription.service';
import {MessageService} from '../message/message.service';
import {ModalService} from '../modal/modal.service';
import {
  PcModificationConfirmModalComponent,
  PcModificationConfirmModalData
} from '../pc-modification-confirm-modal/pc-modification-confirm-modal.component';
import {finalize} from 'rxjs/operators';
import {OrderService} from '../../services/api/order.service';
import {OrderItem} from '../../models/order-item';

export interface ModifyPcModalData {
  // selected items
  selected: OrderItem[];
}

@Component({
  selector: 'app-modify-pc-modal',
  templateUrl: './modify-pc-modal.component.html',
  styleUrls: ['./modify-pc-modal.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class ModifyPcModalComponent implements OnInit {
  // first 3 items
  firstThreeItems: OrderItem[] = [];
  // new pc code
  pcCode = '';
  // selectable codes
  codes: string[] = [];
  // loading state
  loading = false;

  constructor(
    @Inject(TS_MODAL_REF) public tsModalRef: TsModalRef<ModifyPcModalComponent>,
    @Inject(TS_MODAL_DATA) public data: ModifyPcModalData,
    private orderService: OrderService,
    private modalService: ModalService,
    private lookupService: LookupService,
    private messageService: MessageService,
    private subscriptionService: SubscriptionService,
  ) { }

  ngOnInit(): void {
    this._setFirstThreeItems();
    this._getAvailablePCCodes();
  }

  /**
   * set first 3 items
   */
  private _setFirstThreeItems(): void {
    this.firstThreeItems = this.data.selected.slice(0, 3);
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
   * open confirm modal
   */
  openConfirmModal(): void {
    this.modalService.open(PcModificationConfirmModalComponent, {
      data: {
        items: this.data.selected,
        code: this.pcCode,
      } as PcModificationConfirmModalData,
      onClose: res => {
        if (res) {
          this._modifyPCCodes();
        }
      }
    });
  }

  /**
   * modify pc codes
   */
  private _modifyPCCodes(): void {
    const code = this.pcCode;
    const items = this.data.selected;

    this.loading = true;

    const sub = this.orderService
      .modifyPcCodes(items, code)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.messageService.open('success', `${items.length} orders modified to PC Code ${code}`);
          this.tsModalRef.close();
        }
      });

    this.subscriptionService.store('_modifyPCCodes', sub);
  }
}
