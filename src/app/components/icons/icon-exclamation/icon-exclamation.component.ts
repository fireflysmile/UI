import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-exclamation',
  templateUrl: './icon-exclamation.component.html',
  styleUrls: ['./icon-exclamation.component.scss']
})
export class IconExclamationComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
