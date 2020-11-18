import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-guard',
  templateUrl: './icon-guard.component.html',
  styleUrls: ['./icon-guard.component.scss']
})
export class IconGuardComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
