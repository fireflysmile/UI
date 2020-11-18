import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-back',
  templateUrl: './icon-back.component.html',
  styleUrls: ['./icon-back.component.scss']
})
export class IconBackComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
