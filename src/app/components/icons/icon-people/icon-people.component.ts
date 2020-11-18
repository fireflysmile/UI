import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-people',
  templateUrl: './icon-people.component.html',
  styleUrls: ['./icon-people.component.scss']
})
export class IconPeopleComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
