import {Component, Inject, OnInit} from '@angular/core';
import {TS_MODAL_DATA, TS_MODAL_REF} from '../modal/models/ts-modal-options';
import {TsModalRef} from '../modal/models/ts-modal-ref';

export interface UploadPendingModalData {
  content: string;
}

@Component({
  selector: 'app-upload-pending-modal',
  templateUrl: './upload-pending-modal.component.html',
  styleUrls: ['./upload-pending-modal.component.scss']
})
export class UploadPendingModalComponent implements OnInit {

  constructor(
    @Inject(TS_MODAL_REF) public tsModalRef: TsModalRef<UploadPendingModalComponent>,
    @Inject(TS_MODAL_DATA) public data: UploadPendingModalData,
  ) { }

  ngOnInit(): void {
  }

}
