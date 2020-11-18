import {Component, Inject, OnInit} from '@angular/core';
import {TS_MODAL_DATA, TS_MODAL_REF} from '../modal/models/ts-modal-options';
import {TsModalRef} from '../modal/models/ts-modal-ref';
import {FileUploadResponse} from '../../models/file-upload-response';

export interface RuleUploadErrorModalData {
  response: FileUploadResponse;
}

@Component({
  selector: 'app-rule-upload-error-modal',
  templateUrl: './rule-upload-error-modal.component.html',
  styleUrls: ['./rule-upload-error-modal.component.scss']
})
export class RuleUploadErrorModalComponent implements OnInit {

  constructor(
    @Inject(TS_MODAL_REF) public tsModalRef: TsModalRef<RuleUploadErrorModalComponent>,
    @Inject(TS_MODAL_DATA) public data: RuleUploadErrorModalData,
  ) { }

  ngOnInit(): void {
  }

}
