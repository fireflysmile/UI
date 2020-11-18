import {Component, Inject, OnInit} from '@angular/core';
import {TS_MODAL_DATA, TS_MODAL_REF} from '../modal/models/ts-modal-options';
import {TsModalRef} from '../modal/models/ts-modal-ref';

export interface FileUploadModalData {
  // accepts
  accepts: string[];
}

@Component({
  selector: 'app-file-upload-modal',
  templateUrl: './file-upload-modal.component.html',
  styleUrls: ['./file-upload-modal.component.scss']
})
export class FileUploadModalComponent implements OnInit {
  // uploaded file
  uploaded: File;
  // error message
  error: string;

  constructor(
    @Inject(TS_MODAL_REF) public tsModalRef: TsModalRef<FileUploadModalComponent>,
    @Inject(TS_MODAL_DATA) public data: FileUploadModalData,
  ) { }

  ngOnInit(): void {
  }

  /**
   * check and return true when uploaded file has valid type
   */
  get isValidType(): boolean {
    return this.data.accepts.findIndex(item => {
      if (item.startsWith('.')) {
        return (this.uploaded?.name || '').endsWith(item);
      } else {
        return this.uploaded?.type === item;
      }
    }) !== -1;
  }

  /**
   * handle file change
   * @param event file change event
   */
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.uploaded = input.files[0];
    input.value = null;

    this._checkUploadedFile();
  }

  /**
   * check uploaded file
   */
  private _checkUploadedFile(): void {
    if (!this.isValidType) {
      this.error = 'Invalid file format';
    } else {
      this.error = null;
    }
  }
}
