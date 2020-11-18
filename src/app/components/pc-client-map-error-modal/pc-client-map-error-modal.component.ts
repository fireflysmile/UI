import {Component, Inject, OnInit} from '@angular/core';
import {TS_MODAL_DATA, TS_MODAL_REF} from '../modal/models/ts-modal-options';
import {TsModalRef} from '../modal/models/ts-modal-ref';
import {FileUploadResponse} from '../../models/file-upload-response';

export interface PcClientMapErrorModalData {
  response: FileUploadResponse;
}

@Component({
  selector: 'app-pc-client-map-error-modal',
  templateUrl: './pc-client-map-error-modal.component.html',
  styleUrls: ['./pc-client-map-error-modal.component.scss']
})
export class PcClientMapErrorModalComponent implements OnInit {

  constructor(
    @Inject(TS_MODAL_REF) public tsModalRef: TsModalRef<PcClientMapErrorModalComponent>,
    @Inject(TS_MODAL_DATA) public data: PcClientMapErrorModalData,
  ) { }

  ngOnInit(): void {
  }

}
