import { Component } from '@angular/core';
import { ApplicationReviewSectionBaseComponent } from '../../application-review-section-base/application-review-section-base.component';

import { ApplicationPersonnel } from 'src/app/models/application-personnel';

@Component({
  selector: 'app-post-facto-changes-card',
  templateUrl: './post-facto-changes-card.component.html',
  styleUrls: [
    '../../application-review-section-base/application-review-section-base.component.scss',
    './post-facto-changes-card.component.scss'
  ]
})
export class PostFactoChangesCardComponent extends ApplicationReviewSectionBaseComponent {

  public columns = [
    { label: 'Name', property: 'name' },
    { label: 'Type of Request', property: 'requestType' },
    { label: 'Proposed Date of Change', property: 'proposedDateOfChange', displayType: 'date', editable: true },
    { label: 'Post-Facto Clarification', property: 'postFactoClarification' }
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

    const personnel = this.application.postFactos;
    this.applicationService.updateProposedChanges(personnel).subscribe(() => {
      this.application.postFactos.forEach(person => {
        const originalPerson = this.getPerson(person.id, this.originalApplication).person;
        const editedColumns = this.columns
          .filter(column => column.editable)
          .filter(column => person[column.property] !== originalPerson[column.property])
          .map(column => column.label)
          .join(', ');

        if (!editedColumns) {
          this.removeAnyEditsFromReview('Post-Facto Date of Change', person.id);
        } else {
          this.updateEditInReview('Post-Facto Date of Change', person.id, null);
        }
      });
    });
  }

}
