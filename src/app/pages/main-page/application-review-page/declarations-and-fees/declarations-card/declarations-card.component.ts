import { Component, OnInit, Input } from '@angular/core';
import { ApplicationReviewSectionBaseComponent } from '../../application-review-section-base/application-review-section-base.component';

import { DeclarationItem } from 'src/app/models/declaration-item';

@Component({
  selector: 'app-declarations-card',
  templateUrl: './declarations-card.component.html',
  styleUrls: [
    '../../application-review-section-base/application-review-section-base.component.scss',
    './declarations-card.component.scss'
  ]
})
export class DeclarationsCardComponent extends ApplicationReviewSectionBaseComponent implements OnInit {

  @Input() personId: string;
  public declarations: DeclarationItem[];
  public name: string;

  public declarationQuestionsMap: { [key: string]: string };

  ngOnInit() {
    this._setUpDeclarationQuestionsMap();
    this._setUpData();
    this.subscriptions.push(this.update.asObservable().subscribe(() => this._setUpData()));
  }

  /**
   * set up declarations questions map
   * just a simple map of question id to question text
   */
  private _setUpDeclarationQuestionsMap() {
    this.declarationQuestionsMap = {};
    this.application.declarationQuestions.forEach(question => {
      this.declarationQuestionsMap[question.id] = question.question;
    });
  }

  /**
   * set up data
   */
  private _setUpData() {
    const person = this.getPerson(this.personId, this.application).person;
    if (person) {
      this.name = this.personNameAndRequestType(this.personId);
      this.declarations = person.declarations;
    }
  }

  public questionEllipsis(questionId: string): string {
    return `"${this.declarationQuestionsMap[questionId].slice(0, 75)}..."`;
  }

  /**
   * reset declaration responses back to the original application state
   */
  public reset(declaration: DeclarationItem) {
    const originalPerson = this.getPerson(this.personId, this.originalApplication).person;
    if (originalPerson) {
      const originalDeclaration = originalPerson.declarations.find(dec => dec.questionId === declaration.questionId);
      declaration.response = originalDeclaration.response;
    }
  }

  public canSave(): boolean {
    return super.canSave();
  }

  public save() {
    if (!this.canSave()) { return; }

    this.applicationService.updateDeclarations(this.getPerson(this.personId, this.application).person).subscribe(() => {
      const originalPerson = this.getPerson(this.personId, this.originalApplication).person;
      const editedPerson = this.getPerson(this.personId, this.application).person;

      if (originalPerson && editedPerson) {
        this.application.declarationQuestions.forEach(question => {
          const editedResponse = editedPerson.declarations.find(d => d.questionId === question.id).response;
          const originalResponse = originalPerson.declarations.find(d => d.questionId === question.id).response;

          if (originalResponse === editedResponse) {
            this.removeAnyEditsFromReview('Declaration', this.personId, this.questionEllipsis(question.id));
          } else {
            this.updateEditInReview('Declaration', this.personId, null, this.questionEllipsis(question.id));
          }
        });
      }
    });
  }

}
