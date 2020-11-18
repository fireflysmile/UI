import {Component, EventEmitter, Inject, OnInit, Output, Renderer2} from '@angular/core';
import {ModalService} from '../modal/modal.service';
import {PcClientMapModalComponent} from '../pc-client-map-modal/pc-client-map-modal.component';
import {FileUploadModalComponent, FileUploadModalData} from '../file-upload-modal/file-upload-modal.component';
import {environment} from '../../../environments/environment';
import {
  UploadPendingModalComponent,
  UploadPendingModalData
} from '../upload-pending-modal/upload-pending-modal.component';
import {TsModalRef} from '../modal/models/ts-modal-ref';
import {OrderService} from '../../services/api/order.service';
import {SubscriptionService} from '../../services/subscription/subscription.service';
import {finalize} from 'rxjs/operators';
import {MessageService} from '../message/message.service';
import {
  PcClientMapErrorModalComponent,
  PcClientMapErrorModalData
} from '../pc-client-map-error-modal/pc-client-map-error-modal.component';
import {FileUploadResponse} from '../../models/file-upload-response';
import {
  PcClientMapCompleteModalComponent,
  PcClientMapCompleteModalData
} from '../pc-client-map-complete-modal/pc-client-map-complete-modal.component';
import {downloadCSV} from '../../utils/other.utils';
import {DOCUMENT} from '@angular/common';
import {getTimestamp} from '../../utils/date.util';
import {
  AutoModificationConfirmModalComponent,
  AutoModificationConfirmModalData
} from '../auto-modification-confirm-modal/auto-modification-confirm-modal.component';

const {
  pcClientMapUploaderConfig,
} = environment;

@Component({
  selector: 'app-pc-modification-footer',
  templateUrl: './pc-modification-footer.component.html',
  styleUrls: ['./pc-modification-footer.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class PcModificationFooterComponent implements OnInit {
  // emit when one of the auto modification status for all and ucc has changed
  @Output() autoModificationChange: EventEmitter<boolean> = new EventEmitter();
  // verified state
  verified = false;
  // status for whether automize UCC or not
  uccAutoModification = false;
  // status for whether automize all trades or not
  allAutoModification = false;
  // pending modal
  private _pendingModal: TsModalRef<UploadPendingModalComponent>;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private modalService: ModalService,
    private orderService: OrderService,
    private messageService: MessageService,
    private subscriptionService: SubscriptionService,
  ) { }

  ngOnInit(): void {
  }

  /**
   * open client map modal
   */
  openPcClientMapModal(): void {
    this.modalService.open(PcClientMapModalComponent, {
    });
  }

  /**
   * open pc client map uploader
   */
  openPcClientMapUploader(): void {
    this.modalService.open(FileUploadModalComponent, {
      data: {
        accepts: pcClientMapUploaderConfig.accepts,
      } as FileUploadModalData,
      onClose: res => {
        if (res) {
          this._uploadPcClientMap(res);
        }
      },
    });
  }

  /**
   * upload pc client map
   * @param file file to upload
   */
  private _uploadPcClientMap(file: File): void {
    this._openUploadPendingModal();

    const sub = this.orderService
      .uploadPcClientMap(file)
      .pipe(finalize(() => this._closeUploadPendingModal()))
      .subscribe({
        next: res => {
          if (res.errors === 0) {
            this._onSuccessfullyUploaded();
          } else {
            this._openErrorModal(res);
          }
        }
      });

    this.subscriptionService.store('_uploadPcClientMap', sub);
  }

  /**
   * open upload pending modal
   */
  private _openUploadPendingModal(): void {
    this._pendingModal = this.modalService.open(UploadPendingModalComponent, {
      data: {
        content: 'Uploading file for Client-PC code mapping',
      } as UploadPendingModalData,
      suppressCloseOnClickOutside: true,
      onClose: () => {
        this.subscriptionService.unSubscribe('_uploadPcClientMap');
      }
    });
  }

  /**
   * close upload pending modal
   */
  private _closeUploadPendingModal(): void {
    if (this._pendingModal) {
      this._pendingModal.close();
    }
  }

  /**
   * show success message with setting verified state to true
   */
  private _onSuccessfullyUploaded(): void {
    this.verified = true;
    this.messageService.open('success', 'New Client code-PC code map has been uploaded successfully');
  }

  /**
   * open the modal which contains error rows info
   * @param response response
   */
  private _openErrorModal(response: FileUploadResponse): void {
    this.modalService.open(PcClientMapErrorModalComponent, {
      data: {
        response,
      } as PcClientMapErrorModalData,
      onClose: res => {
        if (res) {
          this._openCompleteModal(response);
        }
      },
    });
  }

  /**
   * open the modal which shows error reasons
   * @param response response
   */
  private _openCompleteModal(response: FileUploadResponse): void {
    this.modalService.open(PcClientMapCompleteModalComponent, {
      data: {
        response,
      } as PcClientMapCompleteModalData,
      onClose: res => {
        if (res) {
          this._downloadErrorFile('');
        }

        this._onSuccessfullyUploaded();
      },
    });
  }

  /**
   * download error file
   * @param content content
   */
  private _downloadErrorFile(content: string): void {
    const filename = `pc-client-errors_${getTimestamp()}.csv`;

    downloadCSV(this.document, this.renderer, filename, content);
  }

  /**
   * handle ucc auto modification status change
   * @param state updated state
   */
  onUccAutoModificationChange(state: boolean): void {
    if (state) {
      this.uccAutoModification = true;

      this.modalService.open(AutoModificationConfirmModalComponent, {
        onClose: res => {
          if (res) {
            this.messageService.open('success', 'Auto modification is now active for sedart coming for\nClient Code modification');
          } else {
            this.uccAutoModification = false;
          }

          this.autoModificationChange.emit(this.uccAutoModification);
        },
      });
    } else {
      this.messageService.open('success', 'Auto modification has been stopped for Client Code modified sedart');
      this.uccAutoModification = false;
    }
  }

  /**
   * handle all auto modification status change
   * @param state updated state
   */
  onAllAutoModificationChange(state: boolean): void {
    if (state) {
      this.allAutoModification = true;

      this.modalService.open(AutoModificationConfirmModalComponent, {
        data: {
          toggleAll: true,
        } as AutoModificationConfirmModalData,
        onClose: res => {
          if (res) {
            this.messageService.open('success', 'Auto modification is running for all sedart');
          } else {
            this.allAutoModification = false;
          }

          this.autoModificationChange.emit(this.allAutoModification);
        },
      });
    } else {
      this.messageService.open('success', 'Auto modification stopped for all sedart');
      this.allAutoModification = false;
      this.autoModificationChange.emit(this.allAutoModification);
    }
  }
}
