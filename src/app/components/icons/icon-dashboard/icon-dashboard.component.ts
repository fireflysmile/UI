import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-dashboard',
  templateUrl: './icon-dashboard.component.html',
  styleUrls: ['./icon-dashboard.component.scss']
})
export class IconDashboardComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
