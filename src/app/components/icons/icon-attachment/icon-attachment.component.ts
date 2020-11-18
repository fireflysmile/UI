import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-attachment',
  templateUrl: './icon-attachment.component.html',
  styleUrls: ['./icon-attachment.component.scss']
})
export class IconAttachmentComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
