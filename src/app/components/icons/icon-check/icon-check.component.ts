import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-check',
  templateUrl: './icon-check.component.html',
  styleUrls: ['./icon-check.component.scss']
})
export class IconCheckComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
