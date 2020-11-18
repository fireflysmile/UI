import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

import * as Patterns from 'src/app/utils/pattern.util';
import { ApplicationReviewSectionBaseComponent } from '../application-review-section-base/application-review-section-base.component';

import { ApplicationPersonnel } from 'src/app/models/application-personnel';

@Component({
  selector: 'app-basic-details',
  templateUrl: './basic-details.component.html',
  styleUrls: [
    '../application-review-section-base/application-review-section-base.component.scss',
    './basic-details.component.scss'
  ]
})
export class BasicDetailsComponent extends ApplicationReviewSectionBaseComponent implements OnInit {

  private _commonColumns = [
    { label: 'Type of Request', property: 'requestType' },
    {
      label: 'Educational Qualification', property: 'educationalQualification',
      displayType: 'select', options: environment.educationalQualificationOptions, editable: true
    },
    { label: 'Age', property: 'age' },
    { label: 'PAN', property: 'pan' },
    { label: 'DIN', property: 'din' },
    { label: 'Mobile No.', property: 'mobileNo', editable: true, displayType: 'number', maxLength: 10, pattern: Patterns.mobile },
    { label: 'Email ID', property: 'emailId', editable: true, pattern: Patterns.email },
    { label: 'Address', property: 'address', displayType: 'text', editable: true }
  ];

  public applicantTableColumns = [
    { label: 'Applicant Name', property: 'name' },
    ...this._commonColumns
  ];
  public postFactoTableColumns = [
    { label: 'Director Name (Post-Facto)', property: 'name' },
    ...this._commonColumns
  ];

  ngOnInit() {
  }

  /**
   * reset person's details back to original application state
   */
  public reset(person: ApplicationPersonnel) {
    const originalPerson = this.getPerson(person.id, this.originalApplication).person;
    this._commonColumns.filter(column => column.editable).forEach(column => {
      person[column.property] = originalPerson[column.property];
    });
  }

  public canSave(): boolean {
    return super.canSave();
  }

  public save() {
    if (!this.canSave()) { return; }

    const personnel = [...this.application.applicants, ...this.application.postFactos];
    this.applicationService.updateBasicDetails(personnel).subscribe(() => {
      [...this.application.applicants, ...this.application.postFactos].forEach(person => {
        const originalPerson = this.getPerson(person.id, this.originalApplication).person;
        const editedColumns = this._commonColumns
          .filter(column => column.editable)
          .filter(column => person[column.property] !== originalPerson[column.property])
          .map(column => column.label)
          .join(', ');

        if (!editedColumns) {
          this.removeAnyEditsFromReview('Basic Details', person.id).subscribe();
        } else {
          this.updateEditInReview('Basic Details', person.id, editedColumns);
        }
      });
    });
  }

}
