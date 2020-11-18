import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-declarations',
  templateUrl: './icon-declarations.component.html',
  styleUrls: ['./icon-declarations.component.scss']
})
export class IconDeclarationsComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
