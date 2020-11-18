import { Injectable } from '@angular/core';
import {ApiBaseService} from './api-base.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OrderItem} from '../../models/order-item';
import {OrderAllocationSummaryData} from '../../models/order-allocation-summary-data';
import {OrderAllocationStatus} from '../../models/order-allocation-status';
import {OrderAllocationDetail} from '../../models/order-allocation-detail';
import {OrderModificationSummary} from '../../models/order-modification-summary';
import {map} from 'rxjs/operators';
import {FileUploadResponse} from '../../models/file-upload-response';
import {randomNumber, randomPick} from '../../utils/random.util';
import {OrderModificationStatus} from '../../models/order-modification-status';
import {PcClientMapItem} from '../../models/pc-client-map-item';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends ApiBaseService {

  constructor(
    private http: HttpClient,
  ) {
    super('/order');
  }

  /**
   * get otr summary data
   */
  getOrderAllocationSummary(): Observable<OrderAllocationSummaryData> {
    return this.getFakeResponse<OrderAllocationSummaryData>({
      allocationUnderProcess: randomNumber(80, 100),
      unsuccessful: randomNumber(20, 40),
      rejected: randomNumber(60, 80),
      successful: {
        modified: randomNumber(80, 100),
        potentialFPIViolation: randomNumber(20, 40),
      },
      institutional: {
        pending: randomNumber(8, 12),
        modified: randomNumber(12, 44),
      },
      nonInstitutional: {
        pending: randomNumber(12, 44),
        modified: randomNumber(44, 80),
      },
    });
  }

  /**
   * get order allocation status
   */
  getOrderAllocationStatus(): Observable<OrderAllocationStatus> {
    return this.getFakeResponse<OrderAllocationStatus>({
      unallocated: randomNumber(20, 40),
      allocated: {
        unconfirmed: randomNumber(120, 140),
        rejected: randomNumber(7, 30),
        confirmed: randomNumber(80, 100),
        deConfirmed: randomPick([0, randomNumber(20, 40)]),
      },
    });
  }

  /**
   * get order allocation detail
   * @param order order to get detail
   */
  getOrderAllocationDetail(order: OrderItem): Observable<OrderAllocationDetail> {
    const codes = [];

    for (let i = 0; i < 10; i++) {
      codes.push(`${123456789 + i}`);
    }

    const data: { [k: string]: OrderAllocationDetail } = {
      '35322': {
        totalQty: 980,
        totalValue: 7500000,
        allocations: [],
      },
      '35323': {
        totalQty: 980,
        totalValue: 7500000,
        allocations: [],
      },
      '35324': {
        totalQty: 980,
        totalValue: 7500000,
        allocations: [
          {
            pcCode: codes[0],
            allocatedQty: '200',
            allocatedValue: '500000',
            contactNoteNumber: '12345',
            confirmed: true,
          },
        ],
      },
    };

    return this.getFakeResponse<OrderAllocationDetail>(data[order.otrNo]);
  }

  /**
   * allocate pc codes for orders
   * @param orders orders detail
   */
  allocatePCCodes(orders: OrderAllocationDetail): Observable<void> {
    return this.getFakeResponse(null)
      .pipe(this.attachDelay(400));
  }

  /**
   * get order for allocation
   */
  getOrderForAllocation(): Observable<OrderItem[]> {
    const count = randomNumber(3, 7);
    const data: OrderItem[] = [];

    for (let i = 0; i < count; i++) {
      data.push({
        tm: 'Lorem Ipsum',
        pcCode: 'Lorem Ipsum',
        settlementType: 'A',
        settlementNo: '2020147',
        otrNo: `${35322 + i}`,
        buySell: 'Buy',
        symbol: 'ADANIPORTS',
        series: 'EQ',
        exchange: 'ESN',
        securityType: 'Lorem Ipsum',
        tradePriceRange: 'Lorem Ipsum',
        tradeQtyRange: 'Lorem Ipsum',
        tradeValueRange: 'Lorem Ipsum',
        orderNo: 'Lorem Ipsum',
        tradeNo: 'Lorem Ipsum',
        rangeOfTradeTime: 'Lorem Ipsum',
        status: randomPick([
          'Pending',
          'Confirmed',
          'Rejected',
        ]),
      });
    }

    return this.getFakeResponse<OrderItem[]>(data);
  }

  /**
   * get order modification summary
   * @param withAutoModificationStatus set true to get auto modification process
   */
  getOrderModificationSummary(withAutoModificationStatus: boolean): Observable<OrderModificationSummary> {
    return this.getFakeResponse<OrderModificationSummary>({
      successful: randomNumber(10, 20),
      modificationUnderProcess: randomNumber(10, 20),
      autoModificationUnderProcess: withAutoModificationStatus ? randomNumber(10, 20) : 0,
      unsuccessful: randomNumber(5, 10),
      cashMarkets: {
        pending: randomNumber(5, 20),
        modified: randomNumber(5, 20),
      },
      futureAndOptions: {
        pending: randomNumber(5, 20),
        modified: randomNumber(5, 20),
      },
      currencyDerivatives: {
        pending: randomNumber(5, 20),
        modified: randomNumber(5, 20),
      },
    });
  }

  /**
   * get order modification statuses
   */
  getOrderModificationStatuses(): Observable<OrderModificationStatus> {
    return this.getFakeResponse({
      confirmed: randomNumber(20, 80),
      unconfirmed: {
        modified: randomNumber(20, 80),
        manuallyModified: randomNumber(20, 80),
        unmodified: randomNumber(20, 80),
      },
      nonPcTrades: randomNumber(20, 80),
    });
  }

  /**
   * get modification data
   */
  getOrderForModification(): Observable<OrderItem[]> {
    const count = randomNumber(3, 10);
    const data: OrderItem[] = [];

    for (let i = 0; i < count; i++) {
      data.push({
        tm: 'Lorem Ipsum',
        pcCode: 'Lorem Ipsum',
        settlementType: 'A',
        settlementNo: '2020147',
        otrNo: `${35322 + i}`,
        buySell: 'Buy',
        symbol: 'ADANIPORTS',
        series: 'EQ',
        exchange: 'ESN',
        securityType: 'Lorem Ipsum',
        tradePriceRange: 'Lorem Ipsum',
        tradeQtyRange: 'Lorem Ipsum',
        tradeValueRange: 'Lorem Ipsum',
        orderNo: 'Lorem Ipsum',
        tradeNo: 'Lorem Ipsum',
        rangeOfTradeTime: 'Lorem Ipsum',
        status: randomPick([
          'Pending',
          'Confirmed',
          'Rejected',
        ]),
      });
    }

    return this.getFakeResponse<OrderItem[]>(data).pipe(map(res => {
      return res.map(item => ({
        ...item,
        unselectable: item.status === 'Confirmed',
      }));
    }));
  }

  /**
   * modify pc codes
   * @param items items to modify
   * @param code updated pc code
   */
  modifyPcCodes(items: OrderItem[], code: string): Observable<void> {
    items.forEach(item => item.pcCode = code);

    return this.getFakeResponse(null).pipe(this.attachDelay(400));
  }

  /**
   * upload otr file
   * @param file uploaded file
   */
  uploadOTRFile(file: File): Observable<FileUploadResponse> {
    return this.getFakeResponse({
      total: 100,
      errors: randomPick([0, 10]),
      reasons: [
        'User credentials already exist in the system',
        'Assigned segments are not allowed to the member ID',
        'Assigned functionalities are not permitted for the selected user type',
      ]
    }).pipe(this.attachDelay(2500));
  }

  /**
   * upload pc code file
   * @param file uploaded file
   */
  uploadPCCodeFile(file: File): Observable<FileUploadResponse> {
    return this.getFakeResponse({
      total: 100,
      errors: randomPick([0, 10]),
      reasons: [],
    }).pipe(this.attachDelay(2500));
  }

  /**
   * upload pc client map file
   * @param file file to upload
   */
  uploadPcClientMap(file: File): Observable<FileUploadResponse> {
    return this.getFakeResponse({
      total: 100,
      errors: randomPick([0, 10]),
      reasons: [
        'PC code or Client code is invalid',
        'PC code or client code is inactive',
      ],
    }).pipe(this.attachDelay(2500));
  }

  /**
   * get client map
   */
  getClientMap(): Observable<PcClientMapItem[]> {
    return this.getFakeResponse([
      {
        clientCode: '245729',
        pcCode: 'CITI02029091',
      },
    ]);
  }

  /**
   * update client map
   * @param clientMapItems updated client map items
   */
  updateClientMap(clientMapItems: PcClientMapItem[]): Observable<void> {
    return this.getFakeResponse(null)
      .pipe(this.attachDelay(400));
  }
}
