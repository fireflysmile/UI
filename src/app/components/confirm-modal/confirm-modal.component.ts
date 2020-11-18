import {Component, Inject, OnInit} from '@angular/core';
import {TS_MODAL_DATA, TS_MODAL_REF} from '../modal/models/ts-modal-options';
import {TsModalRef} from '../modal/models/ts-modal-ref';

export interface ConfirmModalData {
  title?: string;
  content: string;
}

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  constructor(
    @Inject(TS_MODAL_DATA) public data: ConfirmModalData,
    @Inject(TS_MODAL_REF) public tsModalRef: TsModalRef<ConfirmModalComponent>,
  ) { }

  ngOnInit() {
  }

}
