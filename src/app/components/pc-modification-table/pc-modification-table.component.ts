import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import {TablePageBaseComponent} from '../../pages/main-page/table-page-base/table-page-base.component';
import {TableColumn, TableFilterOptionItem} from '../../models/table-column';
import {SubscriptionService} from '../../services/subscription/subscription.service';
import {environment} from '../../../environments/environment';
import {ModalService} from '../modal/modal.service';
import {ModifyPcModalComponent, ModifyPcModalData} from '../modify-pc-modal/modify-pc-modal.component';
import {FileUploadModalComponent, FileUploadModalData} from '../file-upload-modal/file-upload-modal.component';
import {AppService} from '../../services/components/app.service';
import {OrderService} from '../../services/api/order.service';
import {OrderItem} from '../../models/order-item';
import {
  UploadPendingModalComponent,
  UploadPendingModalData
} from '../upload-pending-modal/upload-pending-modal.component';
import {finalize} from 'rxjs/operators';
import {TsModalRef} from '../modal/models/ts-modal-ref';
import {MessageService} from '../message/message.service';
import {FileUploadResponse} from '../../models/file-upload-response';
import {
  PcUploadErrorModalComponent,
  PcUploadErrorModalData
} from '../pc-upload-error-modal/pc-upload-error-modal.component';
import {
  PcDownloadErrorModalComponent,
  PcDownloadErrorModalData
} from '../pc-download-error-modal/pc-download-error-modal.component';
import {downloadCSV} from '../../utils/other.utils';
import {DatePipe, DOCUMENT} from '@angular/common';
import {createCSVString} from '../../utils/format.util';

const {
  segmentConfig,
  pcModificationUploaderConfig,
} = environment;

@Component({
  selector: 'app-pc-modification-table',
  templateUrl: './pc-modification-table.component.html',
  styleUrls: ['./pc-modification-table.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class PcModificationTableComponent extends TablePageBaseComponent<OrderItem> implements OnInit {
  // segment
  segment = '';
  // segment options
  segmentOptions: TableFilterOptionItem[] = [
    {
      label: 'All',
      value: '',
    },
    ...Object.keys(segmentConfig).map(key => segmentConfig[key]),
  ];
  // date pipe
  private _datePipe: DatePipe = new DatePipe('en-US');
  // pending modal ref
  private _pendingModalRef: TsModalRef<UploadPendingModalComponent>;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public appService: AppService,
    private renderer: Renderer2,
    private orderService: OrderService,
    private modalService: ModalService,
    private messageService: MessageService,
    private subscriptionService: SubscriptionService,
  ) {
    super([
      new TableColumn<OrderItem>('TM', 'tm'),
      new TableColumn<OrderItem>('PC Code', 'pcCode'),
      new TableColumn<OrderItem>('Buy/Sell', 'buySell'),
      new TableColumn<OrderItem>('Security Type', 'securityType'),
      new TableColumn<OrderItem>('Symbol', 'symbol'),
      new TableColumn<OrderItem>('Trade Price Range', 'tradePriceRange'),
      new TableColumn<OrderItem>('Trade Qty Range', 'tradeQtyRange'),
      new TableColumn<OrderItem>('Trade Value Range', 'tradeValueRange'),
      new TableColumn<OrderItem>('Exchange', 'exchange'),
      new TableColumn<OrderItem>('Order Num', 'orderNo'),
      new TableColumn<OrderItem>('Trade Num', 'tradeNo'),
      new TableColumn<OrderItem>('Range of Trade Time', 'rangeOfTradeTime'),
      new TableColumn<OrderItem>('Status', 'status', {
        displayType: 'allocation-status',
      }),
    ], []);
  }

  ngOnInit(): void {
    this.getModificationData();
  }

  /**
   * get modification data
   */
  getModificationData(): void {
    const sub = this.orderService
      .getOrderForModification()
      .subscribe({
        next: res => {
          this._originalData = res;
          this._setColumnFilters();
          this.createDisplayableData();
        },
      });

    this.subscriptionService.store('_getModificationData', sub);
  }

  /**
   * open modify pc code modal
   */
  openModifyPcCodeModal(): void {
    this.modalService.open(ModifyPcModalComponent, {
      data: {
        selected: this.selectedRows,
      } as ModifyPcModalData,
    });
  }

  /**
   * open file upload modal
   */
  openFileUploadModal(): void {
    this.modalService.open(FileUploadModalComponent, {
      data: {
        accepts: pcModificationUploaderConfig.accepts,
      } as FileUploadModalData,
      onClose: res => {
        if (res) {
          this._uploadFile(res);
        }
      },
    });
  }


  /**
   * upload file
   * @param uploaded uploaded file
   */
  private _uploadFile(uploaded: File): void {
    this._pendingModalRef = this.modalService.open(UploadPendingModalComponent, {
      data: {
        content: `Uploading file for PC code modification.`,
      } as UploadPendingModalData,
      suppressCloseOnClickOutside: true,
      onClose: () => {
        this.subscriptionService.unSubscribe('_uploadFile');
        this._pendingModalRef = null;
      },
    });

    const sub = this.orderService
      .uploadPCCodeFile(uploaded)
      .pipe(finalize(() => this._pendingModalRef.close()))
      .subscribe({
        next: res => {
          if (res.errors > 0) {
            this._openUploadErrorModal(res);
          } else {
            this.messageService.open('success', `Request submitted for modification of ${res.total} records`);
          }
        },
      });

    this.subscriptionService.store('_uploadFile', sub);
  }

  /**
   * open upload error modal
   * @param response upload response
   */
  private _openUploadErrorModal(response: FileUploadResponse): void {
    this.modalService.open(PcUploadErrorModalComponent, {
      data: {
        response,
      } as PcUploadErrorModalData,
      onClose: res => {
        switch (res) {
          // show error file
          case 'error': {
            this._openDownloadErrorModal(response);
            break;
          }

          // process valid records
          case 'process': {
            this._openDownloadErrorModal(response, true);
            break;
          }
        }
      }
    });
  }

  /**
   * open download error modal
   * @param response response
   * @param closeWithSuccessMessage close modal with success message
   */
  private _openDownloadErrorModal(response: FileUploadResponse, closeWithSuccessMessage = false): void {
    this.modalService.open(PcDownloadErrorModalComponent, {
      data: {
        response,
      } as PcDownloadErrorModalData,
      onClose: res => {
        if (res) {
          // this should download errors for users
          // it need to be changed when integrating
          downloadCSV(this.document, this.renderer, 'errors.csv', '');

          if (closeWithSuccessMessage) {
            this.messageService.open(
              'success',
              `Request submitted for modification of ${response.total - response.errors} records`
            );
          }
        }
      },
    });
  }

  /**
   * download orders
   */
  downloadOrders(): void {
    const now = new Date();
    const filename = `orders_${this._datePipe.transform(now, 'yyyyMMddhhmmss')}.csv`;

    downloadCSV(this.document, this.renderer, filename, createCSVString(this.columns, this._originalData));
  }
}
