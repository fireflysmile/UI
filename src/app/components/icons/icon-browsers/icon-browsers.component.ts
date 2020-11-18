import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-browsers',
  templateUrl: './icon-browsers.component.html',
  styleUrls: ['./icon-browsers.component.scss']
})
export class IconBrowsersComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
