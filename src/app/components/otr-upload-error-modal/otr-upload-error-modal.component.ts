import {Component, Inject, OnInit} from '@angular/core';
import {TS_MODAL_DATA, TS_MODAL_REF} from '../modal/models/ts-modal-options';
import {TsModalRef} from '../modal/models/ts-modal-ref';
import {FileUploadResponse} from '../../models/file-upload-response';

export interface OtrUploadErrorModalData {
  response: FileUploadResponse;
}

@Component({
  selector: 'app-otr-upload-error-modal',
  templateUrl: './otr-upload-error-modal.component.html',
  styleUrls: ['./otr-upload-error-modal.component.scss']
})
export class OtrUploadErrorModalComponent implements OnInit {

  constructor(
    @Inject(TS_MODAL_REF) public tsModalRef: TsModalRef<OtrUploadErrorModalComponent>,
    @Inject(TS_MODAL_DATA) public data: OtrUploadErrorModalData,
  ) { }

  ngOnInit(): void {
  }

}
