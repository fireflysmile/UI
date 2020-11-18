import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-user-card',
  templateUrl: './icon-user-card.component.html',
  styleUrls: ['./icon-user-card.component.scss']
})
export class IconUserCardComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
