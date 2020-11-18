import { Component, OnInit } from '@angular/core';
import { ApplicationReviewSectionBaseComponent } from '../application-review-section-base/application-review-section-base.component';

import { ApplicationPersonnel } from 'src/app/models/application-personnel';
import { ExperienceItem } from 'src/app/models/experience-item';

@Component({
  selector: 'app-experience-details',
  templateUrl: './experience-details.component.html',
  styleUrls: [
    '../application-review-section-base/application-review-section-base.component.scss',
    './experience-details.component.scss'
  ]
})
export class ExperienceDetailsComponent extends ApplicationReviewSectionBaseComponent implements OnInit {

  public columns = [
    {
      label: 'From', property: 'from', displayType: 'month',
      editable: true, maxProperty: 'to', reviewLabel: 'Date From'
    },
    {
      label: 'To', property: 'to', displayType: 'month',
      editable: true, minProperty: 'from', reviewLabel: 'Date Till'
    },
    { label: 'Total Experience', valueAccessor:  this._getTotalExperience, displayType: 'timePassed' },
    { label: 'Company', property: 'company', editable: true },
    { label: 'Designation', property: 'designation', editable: true },
    { label: 'Profile', property: 'profile', editable: true }
  ];

  public tableData: { id: string, name: string, experiences: ExperienceItem[] }[];

  ngOnInit() {
    this._setUpTableData();
    this.update.asObservable().subscribe(() => this._setUpTableData());
  }

  private _setUpTableData() {
    this.tableData = [];

    // compile the list of all personnel in application that have experiences
    [...this.application.applicants, ...this.application.postFactos].forEach(person => {
      if (person.experiences && person.experiences.length) {
        this.tableData.push({
          id: person.id,
          name: this.personNameAndRequestType(person.id),
          experiences: person.experiences
        });
      }
    });
  }

  /**
   * get total experience
   * value accessor for Lenght of Experience column
   * @param experienceItem - the particular row in table
   */
  private _getTotalExperience(experience: ExperienceItem): Date {
    if (!experience.from || !experience.to) { return null; }
    return new Date(new Date(experience.to).getTime() - new Date(experience.from).getTime());
  }

  public reset(person: ApplicationPersonnel, experience: ExperienceItem) {
    const originalPerson = this.getPerson(person.id, this.originalApplication).person;
    const originalExperience = originalPerson.experiences.find(item => item.id === experience.id);
    this.columns.filter(column => column.editable).forEach(column => {
      experience[column.property] = originalExperience[column.property];
    });
  }

  public canSave(): boolean {
    return super.canSave();
  }

  public save() {
    if (!this.canSave()) { return; }

    const personnel = [...this.application.applicants, ...this.application.postFactos];
    this.applicationService.updateExperienceDetails(personnel).subscribe(() => {
      this.tableData.forEach(person => {
        const originalPerson = this.getPerson(person.id, this.originalApplication).person;
        const editedColumns = this.columns
          .filter(column => column.editable)
          .filter(column => {
            return JSON.stringify(person.experiences.map(e => e[column.property]))
              !== JSON.stringify(originalPerson.experiences.map(e => e[column.property]));
          })
          .map(column => column.reviewLabel || column.label)
          .join(', ');

        if (!editedColumns) {
          this.removeAnyEditsFromReview('Experience Details', person.id).subscribe();
        } else {
          this.updateEditInReview('Experience Details', person.id, editedColumns);
        }
      });
    });
  }

}
