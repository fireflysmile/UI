import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-phone',
  templateUrl: './icon-phone.component.html',
  styleUrls: ['./icon-phone.component.scss']
})
export class IconPhoneComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
