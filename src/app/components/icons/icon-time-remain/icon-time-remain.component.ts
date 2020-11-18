import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-time-remain',
  templateUrl: './icon-time-remain.component.html',
  styleUrls: ['./icon-time-remain.component.scss']
})
export class IconTimeRemainComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
