import { Component, OnInit } from '@angular/core';
import { ApplicationReviewSectionBaseComponent } from '../application-review-section-base/application-review-section-base.component';

import { DocumentItem } from 'src/app/models/document-item';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent extends ApplicationReviewSectionBaseComponent implements OnInit {

  public data: { personId: string, name: string, documents: DocumentItem[] }[];

  ngOnInit() {
    this._setUpDocumentData();
  }

  /**
   * set up data
   * just a convenient data transformation for UI
   */
  private _setUpDocumentData() {
    this.data = [];
    // compile the list of all personnel in application that have documents
    [...this.application.applicants, ...this.application.postFactos].forEach(person => {
      if (person.documents && person.documents.length) {
        this.data.push({
          personId: person.id,
          name: this.personNameAndRequestType(person.id),
          documents: person.documents
        });
      }
    });
  }

}
