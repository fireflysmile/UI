import { Component, OnInit } from '@angular/core';
import {OrderModificationBaseComponent} from '../order-modification-base/order-modification-base.component';

@Component({
  selector: 'app-pc-modification-page',
  templateUrl: './pc-modification-page.component.html',
  styleUrls: [
    '../order-modification-base/order-modification-base.component.scss',
    './pc-modification-page.component.scss',
  ]
})
export class PcModificationPageComponent extends OrderModificationBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
