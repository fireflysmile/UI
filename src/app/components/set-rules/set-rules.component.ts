import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import {LookupService} from '../../services/api/lookup.service';
import {SubscriptionService} from '../../services/subscription/subscription.service';
import {ModalService} from '../modal/modal.service';
import {FileUploadModalComponent, FileUploadModalData} from '../file-upload-modal/file-upload-modal.component';
import {environment} from '../../../environments/environment';
import {TsModalRef} from '../modal/models/ts-modal-ref';
import {
  UploadPendingModalComponent,
  UploadPendingModalData
} from '../upload-pending-modal/upload-pending-modal.component';
import {RuleService} from '../../services/api/rule.service';
import {finalize} from 'rxjs/operators';
import {FileUploadResponse} from '../../models/file-upload-response';
import {MessageService} from '../message/message.service';
import {
  RuleUploadErrorModalComponent,
  RuleUploadErrorModalData
} from '../rule-upload-error-modal/rule-upload-error-modal.component';
import {
  RuleUploadCompleteModalComponent,
  RuleUploadCompleteModalData
} from '../rule-upload-complete-modal/rule-upload-complete-modal.component';
import {downloadCSV} from '../../utils/other.utils';
import {getTimestamp} from '../../utils/date.util';
import {DOCUMENT} from '@angular/common';

const {
  pcRuleUploaderConfig,
} = environment;

@Component({
  selector: 'app-set-rules',
  templateUrl: './set-rules.component.html',
  styleUrls: ['./set-rules.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class SetRulesComponent implements OnInit {
  // selected code
  code: string;
  // available pc codes
  codes: string[] = [];
  // pending modal
  private _pendingModal: TsModalRef<UploadPendingModalComponent>;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private ruleService: RuleService,
    private modalService: ModalService,
    private lookupService: LookupService,
    private messageService: MessageService,
    private subscriptionService: SubscriptionService,
  ) { }

  ngOnInit(): void {
    this._getAvailablePcCodes();
  }

  /**
   * get available pc codes
   */
  private _getAvailablePcCodes(): void {
    const sub = this.lookupService
      .getAvailablePCCodes()
      .subscribe({
        next: res => this.codes = res,
      });

    this.subscriptionService.store('_getAvailablePcCodes', sub);
  }

  /**
   * open file upload modal
   */
  openFileUploadModal(): void {
    this.modalService.open(FileUploadModalComponent, {
      data: {
        accepts: pcRuleUploaderConfig.accepts,
      } as FileUploadModalData,
      onClose: res => {
        if (res) {
          this._uploadFile(res);
        }
      }
    });
  }

  /**
   * upload file
   * @param file file to upload
   */
  private _uploadFile(file: File): void {
    this._openPendingModal();

    const sub = this.ruleService
      .uploadRule(file)
      .pipe(finalize(() => this._closePendingModal()))
      .subscribe({
        next: res => {
          if (res.errors > 0) {
            this._openErrorModal(res);
          } else {
            this._onUploadCompleted(res);
          }
        },
      });

    this.subscriptionService.store('_uploadFile', sub);
  }

  /**
   * open pending modal
   */
  private _openPendingModal(): void {
    this._pendingModal = this.modalService.open(UploadPendingModalComponent, {
      data: {
        content: 'Uploading file to set rules for auto approval',
      } as UploadPendingModalData,
      suppressCloseOnClickOutside: true,
      onClose: () => {
        this.subscriptionService.unSubscribe('_uploadFile');
      }
    });
  }

  /**
   * close pending modal
   */
  private _closePendingModal(): void {
    if (this._pendingModal) {
      this._pendingModal.close();
    }

    this._pendingModal = null;
  }

  /**
   * open error modal
   * @param response response
   */
  private _openErrorModal(response: FileUploadResponse): void {
    this.modalService.open(RuleUploadErrorModalComponent, {
      data: {
        response,
      } as RuleUploadErrorModalData,
      onClose: res => {
        if (res) {
          this._openCompleteModal(response);
        }
      }
    });
  }

  /**
   * open complete modal
   * @param response response
   */
  private _openCompleteModal(response: FileUploadResponse): void {
    this.modalService.open(RuleUploadCompleteModalComponent, {
      data: {
        response,
      } as RuleUploadCompleteModalData,
      onClose: res => {
        if (res) {
          this._downloadErrorFile('');
        }

        this._onUploadCompleted(response);
      },
    });
  }

  /**
   * download error file
   * @param content file content
   */
  private _downloadErrorFile(content: string): void {
    const filename = `pc-rule-errors_${getTimestamp()}.csv`;

    downloadCSV(this.document, this.renderer, filename, content);
  }

  /**
   * show success message when completed
   * @param response response
   */
  private _onUploadCompleted(response: FileUploadResponse): void {
    this.messageService.open('success', `Rules successfully modified for ${response.total - response.errors} PC codes`);
  }
}
