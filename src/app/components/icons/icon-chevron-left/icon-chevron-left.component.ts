import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-chevron-left',
  templateUrl: './icon-chevron-left.component.html',
  styleUrls: ['./icon-chevron-left.component.scss']
})
export class IconChevronLeftComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
