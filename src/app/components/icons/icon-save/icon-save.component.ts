import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-save',
  templateUrl: './icon-save.component.html',
  styleUrls: ['./icon-save.component.scss']
})
export class IconSaveComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
