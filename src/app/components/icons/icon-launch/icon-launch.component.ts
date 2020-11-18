import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-launch',
  templateUrl: './icon-launch.component.html',
  styleUrls: ['./icon-launch.component.scss']
})
export class IconLaunchComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
