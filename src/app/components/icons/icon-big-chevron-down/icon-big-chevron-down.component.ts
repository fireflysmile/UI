import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-big-chevron-down',
  templateUrl: './icon-big-chevron-down.component.html',
  styleUrls: ['./icon-big-chevron-down.component.scss']
})
export class IconBigChevronDownComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
