import { Component } from '@angular/core';
import { ApplicationReviewSectionBaseComponent } from '../../application-review-section-base/application-review-section-base.component';

import { ApplicationPersonnel } from 'src/app/models/application-personnel';

@Component({
  selector: 'app-proposed-changes-card',
  templateUrl: './proposed-changes-card.component.html',
  styleUrls: [
    '../../application-review-section-base/application-review-section-base.component.scss',
    './proposed-changes-card.component.scss'
  ]
})
export class ProposedChangesCardComponent extends ApplicationReviewSectionBaseComponent {

  public columns = [
    { label: 'Name', property: 'name' },
    { label: 'Type of Request', property: 'requestType' },
    { label: 'Proposed Date of Change', property: 'proposedDateOfChange', displayType: 'date', editable: true },
    { label: '', property: '' }
  ];

  public reset(person: ApplicationPersonnel) {
    const originalPerson = this.getPerson(person.id, this.originalApplication).person;
    this.columns.filter(column => column.editable).forEach(column => {
      person[column.property] = originalPerson[column.property];
    });
  }

  public canSave(): boolean {
    return super.canSave();
  }

  public save() {
    if (!this.canSave()) { return; }

    const personnel = this.application.applicants;
    this.applicationService.updateProposedChanges(personnel).subscribe(() => {
      this.application.applicants.forEach(person => {
        const originalPerson = this.getPerson(person.id, this.originalApplication).person;
        const editedColumns = this.columns
          .filter(column => column.editable)
          .filter(column => person[column.property] !== originalPerson[column.property])
          .map(column => column.label)
          .join(', ');

        if (!editedColumns) {
          this.removeAnyEditsFromReview('Proposed Date of Change', person.id);
        } else {
          this.updateEditInReview('Proposed Date of Change', person.id, null);
        }
      });
    });
  }

}
