import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-users',
  templateUrl: './icon-users.component.html',
  styleUrls: ['./icon-users.component.scss']
})
export class IconUsersComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
