import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-reload',
  templateUrl: './icon-reload.component.html',
  styleUrls: ['./icon-reload.component.scss']
})
export class IconReloadComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
