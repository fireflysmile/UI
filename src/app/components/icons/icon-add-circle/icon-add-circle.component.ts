import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-add-circle',
  templateUrl: './icon-add-circle.component.html',
  styleUrls: ['./icon-add-circle.component.scss']
})
export class IconAddCircleComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
