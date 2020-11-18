import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-add-square',
  templateUrl: './icon-add-square.component.html',
  styleUrls: ['./icon-add-square.component.scss']
})
export class IconAddSquareComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
