import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import {TableColumn, TableFilterOptionItem} from '../../models/table-column';
import {ModalService} from '../modal/modal.service';
import {
  OtrAllocationModalComponent,
  OtrAllocationModalData
} from '../otr-allocation-modal/otr-allocation-modal.component';
import {SubscriptionService} from '../../services/subscription/subscription.service';
import {TablePageBaseComponent} from '../../pages/main-page/table-page-base/table-page-base.component';
import {FileUploadModalComponent, FileUploadModalData} from '../file-upload-modal/file-upload-modal.component';
import {OrderItem} from '../../models/order-item';
import {OrderService} from '../../services/api/order.service';
import {TsModalRef} from '../modal/models/ts-modal-ref';
import {
  UploadPendingModalComponent,
  UploadPendingModalData
} from '../upload-pending-modal/upload-pending-modal.component';
import {finalize} from 'rxjs/operators';
import {MessageService} from '../message/message.service';
import {FileUploadResponse} from '../../models/file-upload-response';
import {
  OtrUploadErrorModalComponent,
  OtrUploadErrorModalData
} from '../otr-upload-error-modal/otr-upload-error-modal.component';
import {
  OtrDownloadErrorModalComponent,
  OtrDownloadErrorModalData
} from '../otr-download-error-modal/otr-download-error-modal.component';
import {DatePipe, DOCUMENT} from '@angular/common';
import {downloadCSV} from '../../utils/other.utils';
import {createCSVString} from '../../utils/format.util';
import {environment} from '../../../environments/environment';

const {
  otrAllocationUploaderConfig,
} = environment;

@Component({
  selector: 'app-otr-overview-table',
  templateUrl: './otr-overview-table.component.html',
  styleUrls: ['./otr-overview-table.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class OtrOverviewTableComponent extends TablePageBaseComponent<OrderItem> implements OnInit {
  // date
  date: Date = new Date();
  // toggle value
  toggle = '';
  // toggle options
  toggleOptions: TableFilterOptionItem[] = [
    {
      label: 'All',
      value: '',
    },
    {
      label: 'Institutional',
      value: 'Institutional',
    },
    {
      label: 'Non-institutional',
      value: 'Non Institutional',
    },
  ];
  // date pipe
  private _datePipe: DatePipe = new DatePipe('en-US');
  // pending modal ref
  private _pendingModalRef: TsModalRef<UploadPendingModalComponent>;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private modalService: ModalService,
    private orderService: OrderService,
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
    this.getOtrAllocationData();
  }

  /**
   * get otr allocation data
   */
  getOtrAllocationData(): void {
    const sub = this.orderService
      .getOrderForAllocation()
      .subscribe({
        next: res => {
          this._originalData = res;
          this._setColumnFilters();
          this.createDisplayableData();
        },
      });

    this.subscriptionService.store('getOtrAllocationData', sub);
  }

  /**
   * open allocation modal
   */
  openAllocationModal(): void {
    this.modalService.open(OtrAllocationModalComponent, {
      data: {
        order: this.selectedRows[0],
      } as OtrAllocationModalData,
    });
  }

  /**
   * open file upload modal
   */
  openFileUploadModal(): void {
    this.modalService.open(FileUploadModalComponent, {
      data: {
        accepts: otrAllocationUploaderConfig.accepts,
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
        content: `Uploading file for OTR allocation.`,
      } as UploadPendingModalData,
      suppressCloseOnClickOutside: true,
      onClose: () => {
        this.subscriptionService.unSubscribe('_uploadFile');
        this._pendingModalRef = null;
      },
    });

    const sub = this.orderService
      .uploadOTRFile(uploaded)
      .pipe(finalize(() => this._pendingModalRef.close()))
      .subscribe({
        next: res => {
          if (res.errors > 0) {
            this._openUploadErrorModal(res);
          } else {
            this.messageService.open('success', `Request submitted for allocation of ${res.total} records`);
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
    this.modalService.open(OtrUploadErrorModalComponent, {
      data: {
        response,
      } as OtrUploadErrorModalData,
      onClose: res => {
        if (res) {
          this._openDownloadErrorFileModal(response);
        }
      },
    });
  }

  /**
   * download error file modal
   * @param response order response
   */
  private _openDownloadErrorFileModal(response: FileUploadResponse): void {
    this.modalService.open(OtrDownloadErrorModalComponent, {
      data: {
        response,
      } as OtrDownloadErrorModalData,
      onClose: res => {
        if (res) {
          // this should download errors for users
          // it need to be changed when integrating
          downloadCSV(this.document, this.renderer, 'errors.csv', '');
        }

        const {total, errors} = response;
        const submitted = total - errors;

        this.messageService.open(
          'success',
          `Request submitted for allocation of ${submitted} records.\nError file download to the selected location.`
        );
      },
    });
  }

  /**
   * download otr data
   */
  downloadOTR(): void {
    const now = new Date();
    const filename = `otr_${this._datePipe.transform(now, 'yyyyMMddhhmmss')}.csv`;

    downloadCSV(this.document, this.renderer, filename, createCSVString(this.columns, this._originalData));
  }
}
