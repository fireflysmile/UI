import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-email',
  templateUrl: './icon-email.component.html',
  styleUrls: ['./icon-email.component.scss']
})
export class IconEmailComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
