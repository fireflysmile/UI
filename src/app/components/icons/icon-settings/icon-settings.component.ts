import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-settings',
  templateUrl: './icon-settings.component.html',
  styleUrls: ['./icon-settings.component.scss']
})
export class IconSettingsComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
