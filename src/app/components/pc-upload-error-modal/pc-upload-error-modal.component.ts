import {Component, Inject, OnInit} from '@angular/core';
import {TS_MODAL_DATA, TS_MODAL_REF} from '../modal/models/ts-modal-options';
import {TsModalRef} from '../modal/models/ts-modal-ref';
import {FileUploadResponse} from '../../models/file-upload-response';

export interface PcUploadErrorModalData {
  response: FileUploadResponse;
}

@Component({
  selector: 'app-pc-upload-error-modal',
  templateUrl: './pc-upload-error-modal.component.html',
  styleUrls: ['./pc-upload-error-modal.component.scss']
})
export class PcUploadErrorModalComponent implements OnInit {

  constructor(
    @Inject(TS_MODAL_REF) public tsModalRef: TsModalRef<PcUploadErrorModalComponent>,
    @Inject(TS_MODAL_DATA) public data: PcUploadErrorModalData,
  ) { }

  ngOnInit(): void {
  }

}
