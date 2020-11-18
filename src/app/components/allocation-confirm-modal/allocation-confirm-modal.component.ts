import {Component, Inject, OnInit} from '@angular/core';
import {TS_MODAL_DATA, TS_MODAL_REF} from '../modal/models/ts-modal-options';
import {TsModalRef} from '../modal/models/ts-modal-ref';
import {QuantityPipe} from '../../pipes/quantity-pipe/quantity.pipe';

export interface AllocationConfirmModalData {
  unallocatedQty: number;
  unallocatedValue: number;
}

@Component({
  selector: 'app-allocation-confirm-modal',
  templateUrl: './allocation-confirm-modal.component.html',
  styleUrls: ['./allocation-confirm-modal.component.scss']
})
export class AllocationConfirmModalComponent implements OnInit {
  // unallocated text
  unallocatedText: string;
  // quantity pipe
  private _quantityPipe: QuantityPipe = new QuantityPipe();

  constructor(
    @Inject(TS_MODAL_REF) public tsModalRef: TsModalRef<AllocationConfirmModalComponent>,
    @Inject(TS_MODAL_DATA) public data: AllocationConfirmModalData,
  ) { }

  ngOnInit(): void {
    this._setUnallocatedText();
  }

  /**
   * set unallocated text
   */
  private _setUnallocatedText(): void {
    const quantity = this.data.unallocatedQty > 0
      ? `quantity ${this._quantityPipe.transform(this.data.unallocatedQty.toFixed(2), 2)}` : '';
    const value = this.data.unallocatedValue > 0
      ? `value ${this._quantityPipe.transform(this.data.unallocatedValue.toFixed(2), 2)}` : '';

    this.unallocatedText = [quantity, value]
      .filter(item => item)
      .join(' and ');
  }
}
