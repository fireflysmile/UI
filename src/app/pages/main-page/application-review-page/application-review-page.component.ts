import { Component, OnInit } from '@angular/core';

import { ApplicationService } from 'src/app/services/api/application.service';
import { ApplicationDetails } from 'src/app/models/application-details';
import { ApplicationReviewCacheService } from 'src/app/services/components/application-review-cache.service';

@Component({
  selector: 'app-application-review-page',
  templateUrl: './application-review-page.component.html',
  styleUrls: ['./application-review-page.component.scss']
})
export class ApplicationReviewPageComponent implements OnInit {

  public application: ApplicationDetails;
  public fields = [
    { label: 'Application ID', property: 'id' },
    { label: 'Member Code', property: 'memberCode' },
    { label: 'Member Name', property: 'memberName' },
    { label: 'Contact Person Name', property: 'contactPersonName' },
    { label: 'Contact Person no.', property: 'contactPersonNumber' },
    { label: 'Application Date', property: 'date', displayType: 'date' },
    { label: 'Compliance Officer', property: 'complianceOfficerName' },
    { label: 'Compliance Officer no.', property: 'complianceOfficerNumber' }
  ];

  constructor(
    private applicationReviewService: ApplicationService,
    private cacheService: ApplicationReviewCacheService
  ) { }

  ngOnInit() {
    this._getApplication();
  }

  private _getApplication() {
    this.applicationReviewService.getApplicationById('').subscribe(application => {
      this.application = application;
    });
    this.applicationReviewService.getOriginalApplicationById('').subscribe(original => {
      this.cacheService.originalApplication = original;
    });

    this.applicationReviewService.assignMaker().subscribe();
    this.applicationReviewService.startReview().subscribe();
  }

}
