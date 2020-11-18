import {Component, Inject, OnInit} from '@angular/core';
import {TS_MODAL_DATA, TS_MODAL_REF} from '../modal/models/ts-modal-options';
import {TsModalRef} from '../modal/models/ts-modal-ref';
import {FileUploadResponse} from '../../models/file-upload-response';

export interface PcDownloadErrorModalData {
  response: FileUploadResponse;
}

@Component({
  selector: 'app-pc-download-error-modal',
  templateUrl: './pc-download-error-modal.component.html',
  styleUrls: ['./pc-download-error-modal.component.scss']
})
export class PcDownloadErrorModalComponent implements OnInit {

  constructor(
    @Inject(TS_MODAL_REF) public tsModalRef: TsModalRef<PcDownloadErrorModalComponent>,
    @Inject(TS_MODAL_DATA) public data: PcDownloadErrorModalData,
  ) { }

  ngOnInit(): void {
  }

}
