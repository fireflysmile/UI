import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { ApplicationDetails } from 'src/app/models/application-details';

@Component({
  selector: 'app-grant-approval',
  templateUrl: './grant-approval.component.html',
  styleUrls: ['./grant-approval.component.scss']
})
export class GrantApprovalComponent implements OnInit {

  public approvalType: 'full' | 'partial' = 'full';
  public directors: { id: string; name: string; selected?: boolean; }[];

  get selectedDirectorsCount(): number {
    return this.directors.filter(d => d.selected).length;
  }

  @Input() application: ApplicationDetails;
  @Output() close = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    this.directors = this.application.applicants
      .map(person => ({ id: person.id, name: person.name }));
  }

}
