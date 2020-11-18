import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-radar',
  templateUrl: './icon-radar.component.html',
  styleUrls: ['./icon-radar.component.scss']
})
export class IconRadarComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
