import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-cloud-upload',
  templateUrl: './icon-cloud-upload.component.html',
  styleUrls: ['./icon-cloud-upload.component.scss']
})
export class IconCloudUploadComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
