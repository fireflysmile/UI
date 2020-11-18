import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-message',
  templateUrl: './icon-message.component.html',
  styleUrls: ['./icon-message.component.scss']
})
export class IconMessageComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
