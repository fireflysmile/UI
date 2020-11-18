import {Component, Inject, OnInit} from '@angular/core';
import {TS_MODAL_DATA, TS_MODAL_REF} from '../modal/models/ts-modal-options';
import {TsModalRef} from '../modal/models/ts-modal-ref';
import {OrderItem} from '../../models/order-item';

export interface PcModificationConfirmModalData {
  items: OrderItem[];
  code: string;
}

@Component({
  selector: 'app-pc-modification-confirm-modal',
  templateUrl: './pc-modification-confirm-modal.component.html',
  styleUrls: ['./pc-modification-confirm-modal.component.scss']
})
export class PcModificationConfirmModalComponent implements OnInit {

  constructor(
    @Inject(TS_MODAL_REF) public tsModalRef: TsModalRef<PcModificationConfirmModalComponent>,
    @Inject(TS_MODAL_DATA) public data: PcModificationConfirmModalData,
  ) { }

  ngOnInit(): void {
  }

}
