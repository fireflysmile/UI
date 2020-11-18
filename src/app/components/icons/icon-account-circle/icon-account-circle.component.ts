import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-account-circle',
  templateUrl: './icon-account-circle.component.html',
  styleUrls: ['./icon-account-circle.component.scss']
})
export class IconAccountCircleComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
