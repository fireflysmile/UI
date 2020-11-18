import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-pending',
  templateUrl: './icon-pending.component.html',
  styleUrls: ['./icon-pending.component.scss']
})
export class IconPendingComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
