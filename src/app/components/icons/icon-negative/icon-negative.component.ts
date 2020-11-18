import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-negative',
  templateUrl: './icon-negative.component.html',
  styleUrls: ['./icon-negative.component.scss']
})
export class IconNegativeComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
