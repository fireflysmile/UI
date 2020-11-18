import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-grid',
  templateUrl: './icon-grid.component.html',
  styleUrls: ['./icon-grid.component.scss']
})
export class IconGridComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
