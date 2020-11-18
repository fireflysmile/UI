import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-member',
  templateUrl: './icon-member.component.html',
  styleUrls: ['./icon-member.component.scss']
})
export class IconMemberComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
