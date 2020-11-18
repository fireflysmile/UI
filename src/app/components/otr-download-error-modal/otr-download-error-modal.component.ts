import {Component, Inject, OnInit} from '@angular/core';
import {TS_MODAL_DATA, TS_MODAL_REF} from '../modal/models/ts-modal-options';
import {TsModalRef} from '../modal/models/ts-modal-ref';
import {FileUploadResponse} from '../../models/file-upload-response';

export interface OtrDownloadErrorModalData {
  response: FileUploadResponse;
}

@Component({
  selector: 'app-otr-download-error-modal',
  templateUrl: './otr-download-error-modal.component.html',
  styleUrls: ['./otr-download-error-modal.component.scss']
})
export class OtrDownloadErrorModalComponent implements OnInit {

  constructor(
    @Inject(TS_MODAL_REF) public tsModalRef: TsModalRef<OtrDownloadErrorModalComponent>,
    @Inject(TS_MODAL_DATA) public data: OtrDownloadErrorModalData,
  ) { }

  ngOnInit(): void {
  }

}
