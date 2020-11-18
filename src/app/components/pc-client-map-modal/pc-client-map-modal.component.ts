import {Component, Inject, OnInit, QueryList, ViewChildren} from '@angular/core';
import {OrderService} from '../../services/api/order.service';
import {SubscriptionService} from '../../services/subscription/subscription.service';
import {PcClientMapItem} from '../../models/pc-client-map-item';
import {PcClientMapItemComponent} from './pc-client-map-item/pc-client-map-item.component';
import {cloneDeep, isEqual} from 'lodash-es';
import {MessageService} from '../message/message.service';
import {TS_MODAL_REF} from '../modal/models/ts-modal-options';
import {TsModalRef} from '../modal/models/ts-modal-ref';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-pc-client-map-modal',
  templateUrl: './pc-client-map-modal.component.html',
  styleUrls: ['./pc-client-map-modal.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class PcClientMapModalComponent implements OnInit {
  // client map item refs
  @ViewChildren(PcClientMapItemComponent) pcClientMapItemRefs: QueryList<PcClientMapItemComponent>;
  // client map data
  clientMaps: PcClientMapItem[] = [];
  // loading state
  loading = false;
  // original client maps
  private _originalClientMaps: PcClientMapItem[] = [];

  constructor(
    @Inject(TS_MODAL_REF) public tsModalRef: TsModalRef<PcClientMapModalComponent>,
    private orderService: OrderService,
    private messageService: MessageService,
    private subscriptionService: SubscriptionService,
  ) { }

  ngOnInit(): void {
    this._getClientMap();
  }

  get submittable(): boolean {
    return this.pcClientMapItemRefs?.toArray().every(item => item.valid) && !isEqual(this.clientMaps, this._originalClientMaps);
  }

  /**
   * create used client codes map without current client item
   * @param data current client item
   */
  getUsedClientCodes(data: PcClientMapItem): {[k: string]: boolean} {
    const map = {};

    this.clientMaps.filter(item => item !== data).forEach(item => {
      if (item.clientCode) {
        map[item.clientCode] = true;
      }
    });

    return map;
  }

  /**
   * create used pc codes map without current client item
   * @param data current client item
   */
  getUsedPcCodes(data: PcClientMapItem): {[k: string]: boolean} {
    const map = {};

    this.clientMaps.filter(item => item !== data).forEach(item => {
      map[item.pcCode] = true;
    });

    return map;
  }

  /**
   * get client map data
   */
  private _getClientMap(): void {
    const sub = this.orderService
      .getClientMap()
      .subscribe({
        next: res => {
          this._originalClientMaps = res;
          this.clientMaps = cloneDeep(this._originalClientMaps);
        },
      });

    this.subscriptionService.store('_getClientMap', sub);
  }

  /**
   * add client map
   */
  addClientMap(): void {
    this.clientMaps.push({
      clientCode: '',
      pcCode: '',
    });
  }

  /**
   * check validation for items
   */
  checkValidationForItems(): void {
    this.pcClientMapItemRefs.forEach(item => {
      item.checkDuplicatedClientCode(this.getUsedClientCodes(item.data));
    });
  }

  /**
   * call endpoint to update client map
   */
  updateClientMap(): void {
    this.loading = true;

    const sub = this.orderService
      .updateClientMap(this.clientMaps)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.messageService.open('success', 'Client code PC code map created successfully');
          this.tsModalRef.close();
        }
      });

    this.subscriptionService.store('updateClientMap', sub);
  }

  /**
   * clear mapping
   */
  clearMapping(): void {
    this.clientMaps = [];
    this.addClientMap();
  }
}
