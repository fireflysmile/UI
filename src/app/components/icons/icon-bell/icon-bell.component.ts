import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-bell',
  templateUrl: './icon-bell.component.html',
  styleUrls: ['./icon-bell.component.scss']
})
export class IconBellComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
