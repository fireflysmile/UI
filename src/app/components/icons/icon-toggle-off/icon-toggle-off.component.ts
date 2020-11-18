import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-toggle-off',
  templateUrl: './icon-toggle-off.component.html',
  styleUrls: ['./icon-toggle-off.component.scss']
})
export class IconToggleOffComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
