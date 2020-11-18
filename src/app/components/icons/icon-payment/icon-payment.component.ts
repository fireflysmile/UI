import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-payment',
  templateUrl: './icon-payment.component.html',
  styleUrls: ['./icon-payment.component.scss']
})
export class IconPaymentComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
