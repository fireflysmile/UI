import { Component, OnInit, Input } from '@angular/core';

import { ApplicationDetails } from 'src/app/models/application-details';

@Component({
  selector: 'app-dir-table',
  templateUrl: './dir-table.component.html',
  styleUrls: [
    '../../application-review-section-base/application-review-section-base.component.scss',
    './dir-table.component.scss'
  ]
})
export class DirTableComponent implements OnInit {

  @Input() application: ApplicationDetails;

  constructor() { }

  ngOnInit() {
  }

}
