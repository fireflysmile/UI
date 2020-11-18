import {Component, Inject, OnInit} from '@angular/core';
import {TS_MODAL_DATA, TS_MODAL_REF} from '../modal/models/ts-modal-options';
import {TsModalRef} from '../modal/models/ts-modal-ref';

export interface AutoModificationConfirmModalData {
  toggleAll: boolean;
}

@Component({
  selector: 'app-auto-modification-confirm-modal',
  templateUrl: './auto-modification-confirm-modal.component.html',
  styleUrls: ['./auto-modification-confirm-modal.component.scss']
})
export class AutoModificationConfirmModalComponent implements OnInit {

  constructor(
    @Inject(TS_MODAL_REF) public tsModalRef: TsModalRef<AutoModificationConfirmModalComponent>,
    @Inject(TS_MODAL_DATA) public data: AutoModificationConfirmModalData,
  ) { }

  ngOnInit(): void {
  }

}
