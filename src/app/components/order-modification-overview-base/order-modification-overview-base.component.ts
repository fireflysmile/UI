import {Component, HostBinding, OnInit} from '@angular/core';
import {TableFilterOptionItem} from '../../models/table-column';

@Component({
  selector: 'app-order-modification-overview-base',
  template: '',
})
export class OrderModificationOverviewBaseComponent implements OnInit {
  // set base class
  @HostBinding('class.cm-order-modification-overview') baseClass = true;
  // filter type
  type = 'value';
  // filter type options
  typeOptions: TableFilterOptionItem[] = [
    {
      label: 'By Value',
      value: 'value',
    },
    {
      label: 'By Number of Trades',
      value: 'trades',
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
