import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-radio-unchecked',
  templateUrl: './icon-radio-unchecked.component.html',
  styleUrls: ['./icon-radio-unchecked.component.scss']
})
export class IconRadioUncheckedComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
