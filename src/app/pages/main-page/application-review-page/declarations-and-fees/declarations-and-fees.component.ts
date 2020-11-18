import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

import { ApplicationReviewSectionBaseComponent } from '../application-review-section-base/application-review-section-base.component';

@Component({
  selector: 'app-declarations-and-fees',
  templateUrl: './declarations-and-fees.component.html',
  styleUrls: [
    '../application-review-section-base/application-review-section-base.component.scss',
    './declarations-and-fees.component.scss'
  ]
})
export class DeclarationsAndFeesComponent extends ApplicationReviewSectionBaseComponent implements OnInit {

  public data: string[]; // list of person ids who have declarations
  public memberUndertakingAgreement: string;
  public processingFeesAgreements: string[];

  ngOnInit() {
    this._setUpDeclarationsData();

    this.memberUndertakingAgreement = environment.memberUndertakingAgreement;
    this.processingFeesAgreements = environment.processingFeesAgreements;
  }

  private _setUpDeclarationsData() {
    this.data = [];
    // compile the list of all personnel in application that have declarations
    if (this.application) {
      [...this.application.applicants, ...this.application.postFactos].forEach(person => {
        if (person.declarations && person.declarations.length) {
          this.data.push(person.id);
        }
      });
    }
  }

}
