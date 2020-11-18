import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-warning',
  templateUrl: './icon-warning.component.html',
  styleUrls: ['./icon-warning.component.scss']
})
export class IconWarningComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
