import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-refresh',
  templateUrl: './icon-refresh.component.html',
  styleUrls: ['./icon-refresh.component.scss']
})
export class IconRefreshComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
