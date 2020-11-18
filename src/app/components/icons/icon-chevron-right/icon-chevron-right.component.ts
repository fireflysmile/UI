import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-chevron-right',
  templateUrl: './icon-chevron-right.component.html',
  styleUrls: ['./icon-chevron-right.component.scss']
})
export class IconChevronRightComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
