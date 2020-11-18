import {Component, Inject, OnInit} from '@angular/core';
import {TS_MODAL_DATA, TS_MODAL_REF} from '../modal/models/ts-modal-options';
import {TsModalRef} from '../modal/models/ts-modal-ref';

export interface AlertModalData {
  title: string;
  content: string;
}

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent implements OnInit {

  constructor(
    @Inject(TS_MODAL_REF) public tsModalRef: TsModalRef<AlertModalComponent>,
    @Inject(TS_MODAL_DATA) public data: AlertModalData,
  ) { }

  ngOnInit() {
  }

}
