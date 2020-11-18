import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-check-circle',
  templateUrl: './icon-check-circle.component.html',
  styleUrls: ['./icon-check-circle.component.scss']
})
export class IconCheckCircleComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
