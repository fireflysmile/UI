import { Component, OnInit } from '@angular/core';
import { ApplicationReviewSectionBaseComponent } from '../application-review-section-base/application-review-section-base.component';

@Component({
  selector: 'app-director-summary',
  templateUrl: './director-summary.component.html',
  styleUrls: [
    '../application-review-section-base/application-review-section-base.component.scss',
    './director-summary.component.scss'
  ]
})
export class DirectorSummaryComponent extends ApplicationReviewSectionBaseComponent implements OnInit {

  ngOnInit() {
  }

}
