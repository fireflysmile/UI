import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-exit',
  templateUrl: './icon-exit.component.html',
  styleUrls: ['./icon-exit.component.scss']
})
export class IconExitComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
