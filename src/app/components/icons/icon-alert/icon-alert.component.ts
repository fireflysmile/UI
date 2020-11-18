import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-alert',
  templateUrl: './icon-alert.component.html',
  styleUrls: ['./icon-alert.component.scss']
})
export class IconAlertComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
