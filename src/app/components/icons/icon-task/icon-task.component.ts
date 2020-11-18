import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-task',
  templateUrl: './icon-task.component.html',
  styleUrls: ['./icon-task.component.scss']
})
export class IconTaskComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
