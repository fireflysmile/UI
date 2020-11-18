import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {PcClientMapItem} from '../../../models/pc-client-map-item';
import {NgModel} from '@angular/forms';
import {LookupService} from '../../../services/api/lookup.service';
import {SubscriptionService} from '../../../services/subscription/subscription.service';
import {SearchSelectComponent} from '../../search-select/search-select.component';

@Component({
  selector: 'app-pc-client-map-item',
  templateUrl: './pc-client-map-item.component.html',
  styleUrls: ['./pc-client-map-item.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class PcClientMapItemComponent implements OnInit {
  // data
  @Input() data: PcClientMapItem;
  // the map for already used pc codes
  @Input() usedPcCodes: {[k: string]: boolean} = {};
  // emit to check validation for client codes
  @Output() checkValidation: EventEmitter<void> = new EventEmitter<void>();
  // client code
  @ViewChild('clientCode') clientCode: NgModel;
  // search select
  @ViewChild(SearchSelectComponent) searchSelectRef: SearchSelectComponent;
  // available pc codes for select
  codes: string[] = [];

  constructor(
    private lookupService: LookupService,
    private subscriptionService: SubscriptionService,
  ) { }

  ngOnInit(): void {
  }

  get valid(): boolean {
    return this.data.clientCode && this.data.pcCode && this.clientCode.valid;
  }

  /**
   * get available pc codes
   * filter by search string and remove used codes
   * @param search entered search string
   */
  getAvailablePCCodes(search: string): void {
    this.searchSelectRef.opened = false;

    const sub = this.lookupService
      .getAvailablePCCodes()
      .subscribe({
        next: res => {
          this.codes = res
            .filter(item => !this.usedPcCodes[item])
            .filter(item => item.toLowerCase().indexOf(search || '') !== -1);

          this.searchSelectRef.openOptions();
        },
      });

    this.subscriptionService.store('_getAvailablePCCodes', sub);
  }

  /**
   * check whether the client code field duplicated or not
   * @param usedClientCodes used client codes map
   */
  checkDuplicatedClientCode(usedClientCodes: {[k: string]: boolean}): void {
    if (Object.keys(usedClientCodes).some(key => this.clientCode.value === key)) {
      this.clientCode.control.setErrors({duplicated: true});
    } else {
      this.clientCode.control.setErrors(null);
    }
  }
}
