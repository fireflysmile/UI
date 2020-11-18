import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-text-add',
  templateUrl: './icon-text-add.component.html',
  styleUrls: ['./icon-text-add.component.scss']
})
export class IconTextAddComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
