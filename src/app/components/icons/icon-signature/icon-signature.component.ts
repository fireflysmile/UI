import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-signature',
  templateUrl: './icon-signature.component.html',
  styleUrls: ['./icon-signature.component.scss']
})
export class IconSignatureComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
