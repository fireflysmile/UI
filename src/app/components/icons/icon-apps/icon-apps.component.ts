import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-apps',
  templateUrl: './icon-apps.component.html',
  styleUrls: ['./icon-apps.component.scss']
})
export class IconAppsComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
