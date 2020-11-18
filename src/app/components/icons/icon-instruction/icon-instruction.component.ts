import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-instruction',
  templateUrl: './icon-instruction.component.html',
  styleUrls: ['./icon-instruction.component.scss']
})
export class IconInstructionComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
