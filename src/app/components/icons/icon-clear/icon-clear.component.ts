import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-clear',
  templateUrl: './icon-clear.component.html',
  styleUrls: ['./icon-clear.component.scss']
})
export class IconClearComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
