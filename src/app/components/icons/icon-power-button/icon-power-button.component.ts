import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-power-button',
  templateUrl: './icon-power-button.component.html',
  styleUrls: ['./icon-power-button.component.scss']
})
export class IconPowerButtonComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
