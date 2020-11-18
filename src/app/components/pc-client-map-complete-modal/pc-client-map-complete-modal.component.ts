import {Component, Inject, OnInit} from '@angular/core';
import {TS_MODAL_DATA, TS_MODAL_REF} from '../modal/models/ts-modal-options';
import {TsModalRef} from '../modal/models/ts-modal-ref';
import {FileUploadResponse} from '../../models/file-upload-response';

export interface PcClientMapCompleteModalData {
  response: FileUploadResponse;
}

@Component({
  selector: 'app-pc-client-map-complete-modal',
  templateUrl: './pc-client-map-complete-modal.component.html',
  styleUrls: ['./pc-client-map-complete-modal.component.scss']
})
export class PcClientMapCompleteModalComponent implements OnInit {

  constructor(
    @Inject(TS_MODAL_REF) public tsModalRef: TsModalRef<PcClientMapCompleteModalComponent>,
    @Inject(TS_MODAL_DATA) public data: PcClientMapCompleteModalData,
  ) { }

  ngOnInit(): void {
  }

}
