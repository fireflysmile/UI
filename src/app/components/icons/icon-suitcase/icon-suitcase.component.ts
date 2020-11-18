import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-suitcase',
  templateUrl: './icon-suitcase.component.html',
  styleUrls: ['./icon-suitcase.component.scss']
})
export class IconSuitcaseComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
