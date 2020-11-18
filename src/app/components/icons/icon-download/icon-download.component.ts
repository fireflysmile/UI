import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-download',
  templateUrl: './icon-download.component.html',
  styleUrls: ['./icon-download.component.scss']
})
export class IconDownloadComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
