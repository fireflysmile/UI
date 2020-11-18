import {Component, Inject, OnInit} from '@angular/core';
import {TS_MODAL_DATA, TS_MODAL_REF} from '../modal/models/ts-modal-options';
import {TsModalRef} from '../modal/models/ts-modal-ref';
import {FileUploadResponse} from '../../models/file-upload-response';

export interface RuleUploadCompleteModalData {
  response: FileUploadResponse;
}

@Component({
  selector: 'app-rule-upload-complete-modal',
  templateUrl: './rule-upload-complete-modal.component.html',
  styleUrls: ['./rule-upload-complete-modal.component.scss']
})
export class RuleUploadCompleteModalComponent implements OnInit {

  constructor(
    @Inject(TS_MODAL_REF) public tsModalRef: TsModalRef<RuleUploadCompleteModalComponent>,
    @Inject(TS_MODAL_DATA) public data: RuleUploadCompleteModalData,
  ) { }

  ngOnInit(): void {
  }

}
